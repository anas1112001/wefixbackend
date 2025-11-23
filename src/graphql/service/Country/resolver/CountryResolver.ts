import { ApolloError } from 'apollo-server-express';
import { Ctx, Query, Resolver } from 'type-graphql';
import CountryRepository from '../repository/CountryRepository';
import { CountryType } from '../typedefs/Country/schema/Country.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class CountryResolver {
  @Query(() => [CountryType], { description: 'Get all active countries' })
  public async getCountries(@Ctx() { services }: SharedContext): Promise<CountryType[]> {
    try {
      return await services.countryRepository.getCountries();
    } catch (error) {
      throw new ApolloError(`Error retrieving countries: ${error.message}`, 'COUNTRIES_QUERY_ERROR');
    }
  }
}

