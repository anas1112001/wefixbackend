import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import LookupRepository from '../repository/LookupRepository';
import { LookupCategory } from '../typedefs/Lookup/enums/Lookup.enums';
import { LookupType } from '../typedefs/Lookup/schema/Lookup.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class LookupResolver {
  @Query(() => [LookupType], { description: 'Get all lookups by category' })
  public async getLookupsByCategory(
    @Arg('category', () => LookupCategory) category: LookupCategory,
    @Ctx() { services }: SharedContext
  ): Promise<LookupType[]> {
    try {
      return await services.lookupRepository.getLookupsByCategory(category);
    } catch (error) {
      throw new ApolloError(`Error retrieving lookups: ${error.message}`, 'LOOKUPS_QUERY_ERROR');
    }
  }

  @Query(() => LookupType, { nullable: true, description: 'Get lookup by id' })
  public async getLookupById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<LookupType | null> {
    try {
      return await services.lookupRepository.getLookupById(id);
    } catch (error) {
      throw new ApolloError(`Error retrieving lookup: ${error.message}`, 'LOOKUP_QUERY_ERROR');
    }
  }

  @Query(() => [LookupType], { description: 'Get all active lookups' })
  public async getAllLookups(@Ctx() { services }: SharedContext): Promise<LookupType[]> {
    try {
      return await services.lookupRepository.getAllLookups();
    } catch (error) {
      throw new ApolloError(`Error retrieving lookups: ${error.message}`, 'LOOKUPS_QUERY_ERROR');
    }
  }
}

