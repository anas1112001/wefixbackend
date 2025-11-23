import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import MainServiceRepository from '../repository/MainServiceRepository';
import { MainService } from '../typedefs/MainService/schema/MainService.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class MainServiceResolver {
  @Query(() => [MainService], { description: 'Get all main services' })
  public async getAllMainServices(@Ctx() { services }: SharedContext): Promise<MainService[]> {
    try {
      const result = await services.mainServiceRepository.getAllMainServices();
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving main services: ${error.message}`, 'MAIN_SERVICES_QUERY_ERROR');
    }
  }

  @Query(() => [MainService], { description: 'Get all active main services' })
  public async getActiveMainServices(@Ctx() { services }: SharedContext): Promise<MainService[]> {
    try {
      const result = await services.mainServiceRepository.getActiveMainServices();
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving active main services: ${error.message}`, 'ACTIVE_MAIN_SERVICES_QUERY_ERROR');
    }
  }

  @Query(() => MainService, { nullable: true, description: 'Get a main service by id' })
  public async getMainServiceById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<MainService | null> {
    try {
      const result = await services.mainServiceRepository.getMainServiceById(id);
      return result as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving main service: ${error.message}`, 'MAIN_SERVICE_QUERY_ERROR');
    }
  }
}

