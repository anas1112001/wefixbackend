import { ApolloError } from 'apollo-server-express';
import { Op, WhereOptions } from 'sequelize';
import { Company } from '../../../../db/models/company.model';
import { CompanyFilterInput } from '../typedefs/Company/inputs/CompanyFilterInput.schema';
import { CreateCompanyInput } from '../typedefs/Company/inputs/CreateCompanyInput.schema';
import { UpdateCompanyInput } from '../typedefs/Company/inputs/UpdateCompanyInput.schema';
import { CompanyOrm } from './orm/CompanyOrm';

class CompanyRepository {
  public createCompany: (companyData: CreateCompanyInput) => Promise<CompanyOrm>;
  public deleteCompanyById: (id: string) => Promise<boolean>;
  public getCompanyById: (id: string) => Promise<CompanyOrm | null>;
  public getCompanies: (filter: CompanyFilterInput) => Promise<{ companies: CompanyOrm[]; total: number; page: number; limit: number; totalPages: number }>;
  public updateCompanyById: (id: string, updateData: UpdateCompanyInput) => Promise<CompanyOrm | null>;

  constructor() {
    this.createCompany = this._createCompany.bind(this);
    this.deleteCompanyById = this._deleteCompanyById.bind(this);
    this.getCompanyById = this._getCompanyById.bind(this);
    this.getCompanies = this._getCompanies.bind(this);
    this.updateCompanyById = this._updateCompanyById.bind(this);
  }

  private async _createCompany(companyData: CreateCompanyInput): Promise<CompanyOrm> {
    try {
      const newCompany = await Company.create({
        companyId: companyData.companyId,
        establishedType: companyData.establishedType,
        isActive: companyData.isActive,
        logo: companyData.logo || null,
        numberOfBranches: companyData.numberOfBranches || 0,
        title: companyData.title,
      });
      return newCompany;
    } catch (error) {
      throw new ApolloError(`Failed to create company: ${error.message}`, 'COMPANY_CREATION_FAILED');
    }
  }

  private async _getCompanyById(id: string): Promise<CompanyOrm | null> {
    try {
      const company = await Company.findOne({ where: { id } });
      return company;
    } catch (error) {
      throw new ApolloError(`Failed to get company: ${error.message}`, 'COMPANY_RETRIEVAL_FAILED');
    }
  }

  private async _getCompanies(filter: CompanyFilterInput): Promise<{ companies: CompanyOrm[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const page = filter.page || 1;
      const limit = filter.limit || 10;
      const offset = (page - 1) * limit;

      const where: WhereOptions = {};

      if (filter.status) {
        where.isActive = filter.status;
      }

      if (filter.type) {
        where.establishedType = filter.type;
      }

      if (filter.search) {
        where[Op.or as any] = [
          { title: { [Op.iLike]: `%${filter.search}%` } },
          { companyId: { [Op.iLike]: `%${filter.search}%` } },
        ];
      }

      const { count, rows } = await Company.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where,
      });

      const totalPages = Math.ceil(count / limit);

      return {
        companies: rows,
        limit,
        page,
        total: count,
        totalPages,
      };
    } catch (error) {
      throw new ApolloError(`Failed to get companies: ${error.message}`, 'COMPANIES_RETRIEVAL_FAILED');
    }
  }

  private async _updateCompanyById(id: string, updateData: UpdateCompanyInput): Promise<CompanyOrm | null> {
    try {
      const company = await Company.findOne({ where: { id } });
      if (company) {
        await company.update(updateData);
        return company;
      }
      return null;
    } catch (error) {
      throw new ApolloError(`Failed to update company with ID ${id}: ${error.message}`, 'COMPANY_UPDATE_FAILED');
    }
  }

  private async _deleteCompanyById(id: string): Promise<boolean> {
    try {
      const deleted = await Company.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete company with ID ${id}: ${error.message}`, 'COMPANY_DELETION_FAILED');
    }
  }
}

export default CompanyRepository;

