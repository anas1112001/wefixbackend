import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import IndividualRepository from '../repository/IndividualRepository';
import { IndividualFilterInput } from '../typedefs/Individual/inputs/IndividualFilterInput.schema';
import { CreateIndividualInput } from '../typedefs/Individual/inputs/CreateIndividualInput.schema';
import { UpdateIndividualInput } from '../typedefs/Individual/inputs/UpdateIndividualInput.schema';
import { QueryIndividualsResponse } from '../typedefs/Individual/responses/QueryIndividualsResponse.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class IndividualResolver {
  @Query(() => QueryIndividualsResponse, { description: 'Query for a list of Individuals' })
  public async getIndividuals(
    @Arg('filter', { nullable: true }) filter: IndividualFilterInput,
    @Ctx() { services }: SharedContext
  ): Promise<QueryIndividualsResponse> {
    try {
      const result = await services.individualRepository.getIndividuals(filter || {});
      return {
        individuals: result.individuals,
        limit: result.limit,
        message: 'Individuals retrieved successfully',
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      };
    } catch (error) {
      throw new ApolloError(`Error retrieving individuals: ${error.message}`, 'INDIVIDUALS_QUERY_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Create an Individual' })
  public async createIndividual(
    @Arg('individualData') individualData: CreateIndividualInput,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      await services.individualRepository.createIndividual(individualData);
      return true;
    } catch (error) {
      throw new ApolloError(`Error creating individual: ${error.message}`, 'INDIVIDUAL_CREATION_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Update an existing Individual' })
  public async updateIndividual(
    @Arg('id') id: string,
    @Arg('updateIndividualData') updateIndividualData: UpdateIndividualInput,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      const individual = await services.individualRepository.updateIndividualById(id, updateIndividualData);
      if (!individual) {
        throw new ApolloError('Individual not found', 'INDIVIDUAL_NOT_FOUND');
      }
      return true;
    } catch (error) {
      throw new ApolloError(`Error updating individual: ${error.message}`, 'INDIVIDUAL_UPDATE_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Delete an Individual' })
  public async deleteIndividual(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      const deleted = await services.individualRepository.deleteIndividualById(id);
      if (!deleted) {
        throw new ApolloError('Individual not found', 'INDIVIDUAL_NOT_FOUND');
      }
      return true;
    } catch (error) {
      throw new ApolloError(`Error deleting individual: ${error.message}`, 'INDIVIDUAL_DELETION_ERROR');
    }
  }
}

