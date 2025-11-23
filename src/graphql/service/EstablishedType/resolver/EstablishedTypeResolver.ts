import { ApolloError } from 'apollo-server-express';
import { Ctx, Query, Resolver } from 'type-graphql';
import EstablishedTypeRepository from '../repository/EstablishedTypeRepository';
import { EstablishedTypeType } from '../typedefs/EstablishedType/schema/EstablishedType.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class EstablishedTypeResolver {
  @Query(() => [EstablishedTypeType], { description: 'Get all active established types' })
  public async getEstablishedTypes(@Ctx() { services }: SharedContext): Promise<EstablishedTypeType[]> {
    try {
      return await services.establishedTypeRepository.getEstablishedTypes();
    } catch (error) {
      throw new ApolloError(`Error retrieving established types: ${error.message}`, 'ESTABLISHED_TYPES_QUERY_ERROR');
    }
  }
}

