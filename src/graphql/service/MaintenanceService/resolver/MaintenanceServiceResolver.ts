import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import MaintenanceServiceRepository from '../repository/MaintenanceServiceRepository';
import { CreateMaintenanceServiceInput } from '../typedefs/MaintenanceService/inputs/CreateMaintenanceServiceInput.schema';
import { MaintenanceService } from '../typedefs/MaintenanceService/schema/MaintenanceService.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class MaintenanceServiceResolver {
  @Query(() => MaintenanceService, { nullable: true, description: 'Query a MaintenanceService by id' })
  public async getMaintenanceServiceById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<MaintenanceService | null> {
    try {
      const service = await services.maintenanceServiceRepository.getMaintenanceServiceById(id);
      return service as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving maintenance service: ${error.message}`, 'MAINTENANCE_SERVICE_QUERY_ERROR');
    }
  }

  @Query(() => [MaintenanceService!], { description: 'Query maintenance services by company id' })
  public async getMaintenanceServicesByCompanyId(
    @Arg('companyId') companyId: string,
    @Ctx() { services }: SharedContext
  ): Promise<MaintenanceService[]> {
    try {
      const services_list = await services.maintenanceServiceRepository.getMaintenanceServicesByCompanyId(companyId);
      return services_list as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving maintenance services: ${error.message}`, 'MAINTENANCE_SERVICES_QUERY_ERROR');
    }
  }

  @Mutation(() => MaintenanceService, { description: 'Create a MaintenanceService' })
  public async createMaintenanceService(
    @Arg('serviceData') serviceData: CreateMaintenanceServiceInput,
    @Ctx() { services }: SharedContext
  ): Promise<MaintenanceService> {
    try {
      const service = await services.maintenanceServiceRepository.createMaintenanceService(serviceData);
      return service as any;
    } catch (error) {
      throw new ApolloError(`Error creating maintenance service: ${error.message}`, 'MAINTENANCE_SERVICE_CREATION_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Delete a MaintenanceService' })
  public async deleteMaintenanceService(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      const deleted = await services.maintenanceServiceRepository.deleteMaintenanceServiceById(id);
      if (!deleted) {
        throw new ApolloError('Maintenance service not found', 'MAINTENANCE_SERVICE_NOT_FOUND');
      }
      return true;
    } catch (error) {
      throw new ApolloError(`Error deleting maintenance service: ${error.message}`, 'MAINTENANCE_SERVICE_DELETION_ERROR');
    }
  }
}

