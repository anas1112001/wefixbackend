import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import ContractRepository from '../repository/ContractRepository';
import { ContractFilterInput } from '../typedefs/Contract/inputs/ContractFilterInput.schema';
import { CreateContractInput } from '../typedefs/Contract/inputs/CreateContractInput.schema';
import { UpdateContractInput } from '../typedefs/Contract/inputs/UpdateContractInput.schema';
import { CreateContractResponse } from '../typedefs/Contract/responses/CreateContractResponse.schema';
import { QueryContractsResponse } from '../typedefs/Contract/responses/QueryContractsResponse.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class ContractResolver {
  @Query(() => QueryContractsResponse, { description: 'Query for a list of Contracts' })
  public async getContracts(
    @Arg('filter', { nullable: true }) filter: ContractFilterInput,
    @Ctx() { services }: SharedContext
  ): Promise<QueryContractsResponse> {
    try {
      const result = await services.contractRepository.getContracts(filter || {});
      return {
        contracts: result.contracts as any,
        limit: result.limit,
        message: 'Contracts retrieved successfully',
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      };
    } catch (error) {
      throw new ApolloError(`Error retrieving contracts: ${error.message}`, 'CONTRACTS_QUERY_ERROR');
    }
  }

  @Query(() => CreateContractResponse, { description: 'Query a Contract by id' })
  public async getContractById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<CreateContractResponse> {
    try {
      const contract = await services.contractRepository.getContractById(id);
      if (!contract) {
        return { contract: null, message: 'Contract not found' };
      }
      return { contract: contract as any, message: 'Contract retrieved successfully' };
    } catch (error) {
      throw new ApolloError(`Error retrieving contract: ${error.message}`, 'CONTRACT_QUERY_ERROR');
    }
  }

  @Mutation(() => CreateContractResponse, { description: 'Create a Contract' })
  public async createContract(
    @Arg('contractData') contractData: CreateContractInput,
    @Ctx() { services }: SharedContext
  ): Promise<CreateContractResponse> {
    try {
      const contract = await services.contractRepository.createContract(contractData);
      return { contract: contract as any, message: 'Contract created successfully' };
    } catch (error) {
      throw new ApolloError(`Error creating contract: ${error.message}`, 'CONTRACT_CREATION_ERROR');
    }
  }

  @Mutation(() => CreateContractResponse, { description: 'Update an existing Contract' })
  public async updateContract(
    @Arg('id') id: string,
    @Arg('updateContractData') updateContractData: UpdateContractInput,
    @Ctx() { services }: SharedContext
  ): Promise<CreateContractResponse> {
    try {
      const contract = await services.contractRepository.updateContractById(id, updateContractData);
      if (!contract) {
        return { contract: null, message: 'Contract not found' };
      }
      return { contract: contract as any, message: 'Contract updated successfully' };
    } catch (error) {
      throw new ApolloError(`Error updating contract: ${error.message}`, 'CONTRACT_UPDATE_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Delete a Contract' })
  public async deleteContract(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      const deleted = await services.contractRepository.deleteContractById(id);
      if (!deleted) {
        throw new ApolloError('Contract not found', 'CONTRACT_NOT_FOUND');
      }
      return true;
    } catch (error) {
      throw new ApolloError(`Error deleting contract: ${error.message}`, 'CONTRACT_DELETION_ERROR');
    }
  }
}

