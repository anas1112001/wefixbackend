import { ApolloError } from 'apollo-server-express';
import { Lookup, LookupCategory } from '../../../../db/models/lookup.model';
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
      const services = await Lookup.findAll({
        where: { category: LookupCategory.MAIN_SERVICE },
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services as any;
    } catch (error) {
      throw new ApolloError(`Failed to get main services: ${error.message}`, 'MAIN_SERVICES_RETRIEVAL_FAILED');
    }
  }

  private async _getMainServiceById(id: string): Promise<MainServiceOrm | null> {
    try {
      const service = await Lookup.findOne({
        where: { id, category: LookupCategory.MAIN_SERVICE },
      });
      return service as any;
    } catch (error) {
      throw new ApolloError(`Failed to get main service: ${error.message}`, 'MAIN_SERVICE_RETRIEVAL_FAILED');
    }
  }

  private async _getActiveMainServices(): Promise<MainServiceOrm[]> {
    try {
      const services = await Lookup.findAll({
        where: { category: LookupCategory.MAIN_SERVICE, isActive: true },
        order: [['orderId', 'ASC'], ['name', 'ASC']],
      });
      return services as any;
    } catch (error) {
      throw new ApolloError(`Failed to get active main services: ${error.message}`, 'ACTIVE_MAIN_SERVICES_RETRIEVAL_FAILED');
    }
  }
}

export default MainServiceRepository;

