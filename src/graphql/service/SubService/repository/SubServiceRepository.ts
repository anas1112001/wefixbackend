import { ApolloError } from 'apollo-server-express';
import { Lookup, LookupCategory } from '../../../../db/models/lookup.model';
import { SubServiceOrm } from './orm/SubServiceOrm';

class SubServiceRepository {
  public getAllSubServices: () => Promise<SubServiceOrm[]>;
  public getSubServiceById: (id: string) => Promise<SubServiceOrm | null>;
  public getSubServicesByMainServiceId: (mainServiceId: string) => Promise<SubServiceOrm[]>;
  public getActiveSubServices: () => Promise<SubServiceOrm[]>;
  public getActiveSubServicesByMainServiceId: (mainServiceId: string) => Promise<SubServiceOrm[]>;

  constructor() {
    this.getAllSubServices = this._getAllSubServices.bind(this);
    this.getSubServiceById = this._getSubServiceById.bind(this);
    this.getSubServicesByMainServiceId = this._getSubServicesByMainServiceId.bind(this);
    this.getActiveSubServices = this._getActiveSubServices.bind(this);
    this.getActiveSubServicesByMainServiceId = this._getActiveSubServicesByMainServiceId.bind(this);
  }

  private async _getAllSubServices(): Promise<SubServiceOrm[]> {
    try {
      const services = await Lookup.findAll({
        include: [{ model: Lookup, as: 'parent', required: false }],
        where: { category: LookupCategory.SUB_SERVICE },
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services as any;
    } catch (error) {
      throw new ApolloError(`Failed to get sub services: ${error.message}`, 'SUB_SERVICES_RETRIEVAL_FAILED');
    }
  }

  private async _getSubServiceById(id: string): Promise<SubServiceOrm | null> {
    try {
      const service = await Lookup.findOne({
        include: [{ model: Lookup, as: 'parent', required: false }],
        where: { id, category: LookupCategory.SUB_SERVICE },
      });
      return service as any;
    } catch (error) {
      throw new ApolloError(`Failed to get sub service: ${error.message}`, 'SUB_SERVICE_RETRIEVAL_FAILED');
    }
  }

  private async _getSubServicesByMainServiceId(mainServiceId: string): Promise<SubServiceOrm[]> {
    try {
      const services = await Lookup.findAll({
        include: [{ model: Lookup, as: 'parent', required: false }],
        where: { parentLookupId: mainServiceId, category: LookupCategory.SUB_SERVICE },
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services as any;
    } catch (error) {
      throw new ApolloError(`Failed to get sub services by main service: ${error.message}`, 'SUB_SERVICES_BY_MAIN_SERVICE_RETRIEVAL_FAILED');
    }
  }

  private async _getActiveSubServices(): Promise<SubServiceOrm[]> {
    try {
      const services = await Lookup.findAll({
        include: [{ model: Lookup, as: 'parent', required: false }],
        where: { category: LookupCategory.SUB_SERVICE, isActive: true },
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services as any;
    } catch (error) {
      throw new ApolloError(`Failed to get active sub services: ${error.message}`, 'ACTIVE_SUB_SERVICES_RETRIEVAL_FAILED');
    }
  }

  private async _getActiveSubServicesByMainServiceId(mainServiceId: string): Promise<SubServiceOrm[]> {
    try {
      const services = await Lookup.findAll({
        include: [{ model: Lookup, as: 'parent', required: false }],
        where: { parentLookupId: mainServiceId, category: LookupCategory.SUB_SERVICE, isActive: true },
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services as any;
    } catch (error) {
      throw new ApolloError(`Failed to get active sub services by main service: ${error.message}`, 'ACTIVE_SUB_SERVICES_BY_MAIN_SERVICE_RETRIEVAL_FAILED');
    }
  }
}

export default SubServiceRepository;

