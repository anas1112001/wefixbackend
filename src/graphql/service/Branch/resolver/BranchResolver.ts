import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import BranchRepository from '../repository/BranchRepository';
import { CreateBranchInput } from '../typedefs/Branch/inputs/CreateBranchInput.schema';
import { Branch } from '../typedefs/Branch/schema/Branch.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class BranchResolver {
  @Query(() => Branch, { nullable: true, description: 'Query a Branch by id' })
  public async getBranchById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<Branch | null> {
    try {
      const branch = await services.branchRepository.getBranchById(id);
      return branch as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving branch: ${error.message}`, 'BRANCH_QUERY_ERROR');
    }
  }

  @Query(() => [Branch!], { description: 'Query branches by company id' })
  public async getBranchesByCompanyId(
    @Arg('companyId') companyId: string,
    @Ctx() { services }: SharedContext
  ): Promise<Branch[]> {
    try {
      const branches = await services.branchRepository.getBranchesByCompanyId(companyId);
      return branches as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving branches: ${error.message}`, 'BRANCHES_QUERY_ERROR');
    }
  }

  @Mutation(() => Branch, { description: 'Create a Branch' })
  public async createBranch(
    @Arg('branchData') branchData: CreateBranchInput,
    @Ctx() { services }: SharedContext
  ): Promise<Branch> {
    try {
      const branch = await services.branchRepository.createBranch(branchData);
      return branch as any;
    } catch (error) {
      throw new ApolloError(`Error creating branch: ${error.message}`, 'BRANCH_CREATION_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Delete a Branch' })
  public async deleteBranch(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      const deleted = await services.branchRepository.deleteBranchById(id);
      if (!deleted) {
        throw new ApolloError('Branch not found', 'BRANCH_NOT_FOUND');
      }
      return true;
    } catch (error) {
      throw new ApolloError(`Error deleting branch: ${error.message}`, 'BRANCH_DELETION_ERROR');
    }
  }
}

