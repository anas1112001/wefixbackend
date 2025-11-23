import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import CompanyRepository from '../repository/CompanyRepository';
import { CompanyFilterInput } from '../typedefs/Company/inputs/CompanyFilterInput.schema';
import { CreateCompanyInput } from '../typedefs/Company/inputs/CreateCompanyInput.schema';
import { UpdateCompanyInput } from '../typedefs/Company/inputs/UpdateCompanyInput.schema';
import { CreateCompanyResponse } from '../typedefs/Company/responses/CreateCompanyResponse.schema';
import { QueryCompaniesResponse } from '../typedefs/Company/responses/QueryCompaniesResponse.schema';
import { QueryCompanyResponse } from '../typedefs/Company/responses/QueryCompanyResponse.schema';
import { UpdateCompanyResponse } from '../typedefs/Company/responses/UpdateCompanyResponse.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class CompanyResolver {
  @Query(() => QueryCompaniesResponse, { description: 'Query for a list of Companies' })
  public async getCompanies(
    @Arg('filter', { nullable: true }) filter: CompanyFilterInput,
    @Ctx() { services }: SharedContext
  ): Promise<QueryCompaniesResponse> {
    try {
      const result = await services.companyRepository.getCompanies(filter || {});
      return {
        companies: result.companies as any,
        limit: result.limit,
        message: 'Companies retrieved successfully',
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      };
    } catch (error) {
      throw new ApolloError(`Error retrieving companies: ${error.message}`, 'COMPANIES_QUERY_ERROR');
    }
  }

  @Query(() => QueryCompanyResponse, { description: 'Query a Company by id' })
  public async getCompanyById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<QueryCompanyResponse> {
    try {
      const company = await services.companyRepository.getCompanyById(id);
      if (!company) {
        return { company: null, message: 'Company not found' };
      }
      return { company: company as any, message: 'Company retrieved successfully' };
    } catch (error) {
      throw new ApolloError(`Error retrieving company: ${error.message}`, 'COMPANY_QUERY_ERROR');
    }
  }

  @Mutation(() => CreateCompanyResponse, { description: 'Create a Company' })
  public async createCompany(
    @Arg('companyData') companyData: CreateCompanyInput,
    @Ctx() { services }: SharedContext
  ): Promise<CreateCompanyResponse> {
    try {
      const company = await services.companyRepository.createCompany(companyData);
      return { company: company as any, message: 'Company created successfully' };
    } catch (error) {
      throw new ApolloError(`Error creating company: ${error.message}`, 'COMPANY_CREATION_ERROR');
    }
  }

  @Mutation(() => UpdateCompanyResponse, { description: 'Update an existing Company' })
  public async updateCompany(
    @Arg('id') id: string,
    @Arg('updateCompanyData') updateCompanyData: UpdateCompanyInput,
    @Ctx() { services }: SharedContext
  ): Promise<UpdateCompanyResponse> {
    try {
      const company = await services.companyRepository.updateCompanyById(id, updateCompanyData);
      if (!company) {
        return { company: null, message: 'Company not found' };
      }
      return { company: company as any, message: 'Company updated successfully' };
    } catch (error) {
      throw new ApolloError(`Error updating company: ${error.message}`, 'COMPANY_UPDATE_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Delete a Company' })
  public async deleteCompany(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      const deleted = await services.companyRepository.deleteCompanyById(id);
      if (!deleted) {
        throw new ApolloError('Company not found', 'COMPANY_NOT_FOUND');
      }
      return true;
    } catch (error) {
      throw new ApolloError(`Error deleting company: ${error.message}`, 'COMPANY_DELETION_ERROR');
    }
  }
}

