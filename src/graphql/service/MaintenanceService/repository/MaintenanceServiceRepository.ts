import { ApolloError } from 'apollo-server-express';
import { MaintenanceService } from '../../../../db/models/maintenance-service.model';
import { Company } from '../../../../db/models/company.model';
import { MainService } from '../../../../db/models/main-service.model';
import { SubService } from '../../../../db/models/sub-service.model';
import { CreateMaintenanceServiceInput } from '../typedefs/MaintenanceService/inputs/CreateMaintenanceServiceInput.schema';
import { MaintenanceServiceOrm } from './orm/MaintenanceServiceOrm';

class MaintenanceServiceRepository {
  public createMaintenanceService: (serviceData: CreateMaintenanceServiceInput) => Promise<MaintenanceServiceOrm>;
  public getMaintenanceServiceById: (id: string) => Promise<MaintenanceServiceOrm | null>;
  public getMaintenanceServicesByCompanyId: (companyId: string) => Promise<MaintenanceServiceOrm[]>;
  public deleteMaintenanceServiceById: (id: string) => Promise<boolean>;

  constructor() {
    this.createMaintenanceService = this._createMaintenanceService.bind(this);
    this.getMaintenanceServiceById = this._getMaintenanceServiceById.bind(this);
    this.getMaintenanceServicesByCompanyId = this._getMaintenanceServicesByCompanyId.bind(this);
    this.deleteMaintenanceServiceById = this._deleteMaintenanceServiceById.bind(this);
  }

  private async _createMaintenanceService(serviceData: CreateMaintenanceServiceInput): Promise<MaintenanceServiceOrm> {
    try {
      const newService = await MaintenanceService.create({
        companyId: serviceData.companyId,
        mainServiceId: serviceData.mainServiceId,
        subServiceId: serviceData.subServiceId,
        isActive: serviceData.isActive !== undefined ? serviceData.isActive : true,
      } as any);
      
      return await this._getMaintenanceServiceById(newService.id) || newService;
    } catch (error) {
      throw new ApolloError(`Failed to create maintenance service: ${error.message}`, 'MAINTENANCE_SERVICE_CREATION_FAILED');
    }
  }

  private async _getMaintenanceServiceById(id: string): Promise<MaintenanceServiceOrm | null> {
    try {
      const service = await MaintenanceService.findOne({
        include: [
          { model: Company, as: 'company' },
          { model: MainService, as: 'mainService' },
          { model: SubService, as: 'subService' },
        ],
        where: { id },
      });
      return service;
    } catch (error) {
      throw new ApolloError(`Failed to get maintenance service: ${error.message}`, 'MAINTENANCE_SERVICE_RETRIEVAL_FAILED');
    }
  }

  private async _getMaintenanceServicesByCompanyId(companyId: string): Promise<MaintenanceServiceOrm[]> {
    try {
      const services = await MaintenanceService.findAll({
        include: [
          { model: Company, as: 'company' },
          { model: MainService, as: 'mainService' },
          { model: SubService, as: 'subService' },
        ],
        where: { companyId },
        order: [['createdAt', 'DESC']],
      });
      return services;
    } catch (error) {
      throw new ApolloError(`Failed to get maintenance services: ${error.message}`, 'MAINTENANCE_SERVICES_RETRIEVAL_FAILED');
    }
  }

  private async _deleteMaintenanceServiceById(id: string): Promise<boolean> {
    try {
      const deleted = await MaintenanceService.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete maintenance service with ID ${id}: ${error.message}`, 'MAINTENANCE_SERVICE_DELETION_FAILED');
    }
  }
}

export default MaintenanceServiceRepository;

