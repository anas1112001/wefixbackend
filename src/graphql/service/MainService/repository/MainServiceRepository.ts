import { ApolloError } from 'apollo-server-express';
import { MainService } from '../../../../db/models/main-service.model';
import { MainServiceOrm } from './orm/MainServiceOrm';

class MainServiceRepository {
  public getAllMainServices: () => Promise<MainServiceOrm[]>;
  public getMainServiceById: (id: string) => Promise<MainServiceOrm | null>;
  public getActiveMainServices: () => Promise<MainServiceOrm[]>;

  constructor() {
    this.getAllMainServices = this._getAllMainServices.bind(this);
    this.getMainServiceById = this._getMainServiceById.bind(this);
    this.getActiveMainServices = this._getActiveMainServices.bind(this);
  }

  private async _getAllMainServices(): Promise<MainServiceOrm[]> {
    try {
      const services = await MainService.findAll({
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services;
    } catch (error) {
      throw new ApolloError(`Failed to get main services: ${error.message}`, 'MAIN_SERVICES_RETRIEVAL_FAILED');
    }
  }

  private async _getMainServiceById(id: string): Promise<MainServiceOrm | null> {
    try {
      const service = await MainService.findByPk(id);
      return service;
    } catch (error) {
      throw new ApolloError(`Failed to get main service: ${error.message}`, 'MAIN_SERVICE_RETRIEVAL_FAILED');
    }
  }

  private async _getActiveMainServices(): Promise<MainServiceOrm[]> {
    try {
      const services = await MainService.findAll({
        where: { isActive: true },
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services;
    } catch (error) {
      throw new ApolloError(`Failed to get active main services: ${error.message}`, 'ACTIVE_MAIN_SERVICES_RETRIEVAL_FAILED');
    }
  }
}

export default MainServiceRepository;

