import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import SubServiceRepository from '../repository/SubServiceRepository';
import { SubService } from '../typedefs/SubService/schema/SubService.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class SubServiceResolver {
  @Query(() => [SubService], { description: 'Get all sub services' })
  public async getAllSubServices(@Ctx() { services }: SharedContext): Promise<SubService[]> {
    try {
      const result = await services.subServiceRepository.getAllSubServices();
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving sub services: ${error.message}`, 'SUB_SERVICES_QUERY_ERROR');
    }
  }

  @Query(() => [SubService], { description: 'Get all active sub services' })
  public async getActiveSubServices(@Ctx() { services }: SharedContext): Promise<SubService[]> {
    try {
      const result = await services.subServiceRepository.getActiveSubServices();
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving active sub services: ${error.message}`, 'ACTIVE_SUB_SERVICES_QUERY_ERROR');
    }
  }

  @Query(() => [SubService], { description: 'Get sub services by main service id' })
  public async getSubServicesByMainServiceId(
    @Arg('mainServiceId') mainServiceId: string,
    @Ctx() { services }: SharedContext
  ): Promise<SubService[]> {
    try {
      const result = await services.subServiceRepository.getSubServicesByMainServiceId(mainServiceId);
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving sub services by main service: ${error.message}`, 'SUB_SERVICES_BY_MAIN_SERVICE_QUERY_ERROR');
    }
  }

  @Query(() => [SubService], { description: 'Get active sub services by main service id' })
  public async getActiveSubServicesByMainServiceId(
    @Arg('mainServiceId') mainServiceId: string,
    @Ctx() { services }: SharedContext
  ): Promise<SubService[]> {
    try {
      const result = await services.subServiceRepository.getActiveSubServicesByMainServiceId(mainServiceId);
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving active sub services by main service: ${error.message}`, 'ACTIVE_SUB_SERVICES_BY_MAIN_SERVICE_QUERY_ERROR');
    }
  }

  @Query(() => SubService, { nullable: true, description: 'Get a sub service by id' })
  public async getSubServiceById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<SubService | null> {
    try {
      const result = await services.subServiceRepository.getSubServiceById(id);
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving sub service: ${error.message}`, 'SUB_SERVICE_QUERY_ERROR');
    }
  }
}

