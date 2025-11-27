import { ApolloError } from 'apollo-server-express';
import { Op, WhereOptions } from 'sequelize';
import { Company } from '../../../../db/models/company.model';
import { Lookup } from '../../../../db/models/lookup.model';
import { Branch } from '../../../../db/models/branch.model';
import { Zone } from '../../../../db/models/zone.model';
import { Contract } from '../../../../db/models/contract.model';
import { MaintenanceService } from '../../../../db/models/maintenance-service.model';
import { User } from '../../../../db/models/user.model';
import { CompanyStatus } from '../typedefs/Company/enums/Company.enums';
import { CompanyFilterInput } from '../typedefs/Company/inputs/CompanyFilterInput.schema';
import { CreateCompanyInput } from '../typedefs/Company/inputs/CreateCompanyInput.schema';
import { UpdateCompanyInput } from '../typedefs/Company/inputs/UpdateCompanyInput.schema';
import { CompanyOrm } from './orm/CompanyOrm';

class CompanyRepository {
  public createCompany: (companyData: CreateCompanyInput, userId?: string | null) => Promise<CompanyOrm>;
  public deleteCompanyById: (id: string, userId?: string | null) => Promise<boolean>;
  public getCompanyById: (id: string) => Promise<CompanyOrm | null>;
  public getCompanies: (filter: CompanyFilterInput) => Promise<{ companies: CompanyOrm[]; total: number; page: number; limit: number; totalPages: number }>;
  public updateCompanyById: (id: string, updateData: UpdateCompanyInput, userId?: string | null) => Promise<CompanyOrm | null>;

  constructor() {
    this.createCompany = this._createCompany.bind(this);
    this.deleteCompanyById = this._deleteCompanyById.bind(this);
    this.getCompanyById = this._getCompanyById.bind(this);
    this.getCompanies = this._getCompanies.bind(this);
    this.updateCompanyById = this._updateCompanyById.bind(this);
  }

  private async _createCompany(companyData: CreateCompanyInput, userId?: string | null): Promise<CompanyOrm> {
    try {
      // Validate and truncate ticketShortCode if needed (max 10 characters for database)
      let ticketShortCode = companyData.ticketShortCode || null;
      if (ticketShortCode && ticketShortCode.length > 10) {
        ticketShortCode = ticketShortCode.substring(0, 10);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Creating company with createdBy:', userId);
      }
      
      const newCompany = await Company.create({
        companyId: companyData.companyId,
        title: companyData.title,
        companyNameArabic: companyData.companyNameArabic || null,
        companyNameEnglish: companyData.companyNameEnglish || null,
        countryLookupId: companyData.countryLookupId || null,
        hoAddress: companyData.hoAddress || null,
        hoLocation: companyData.hoLocation || null,
        ticketShortCode: ticketShortCode,
        isActive: companyData.isActive || CompanyStatus.ACTIVE,
        logo: companyData.logo || null,
        createdBy: userId || null,
      } as any);

      if (process.env.NODE_ENV === 'development') {
        console.log('Company created with createdBy:', newCompany.createdBy);
      }

      return newCompany;
    } catch (error) {
      throw new ApolloError(`Failed to create company: ${error.message}`, 'COMPANY_CREATION_FAILED');
    }
  }

  private async _getCompanyById(id: string): Promise<CompanyOrm | null> {
    try {
      const company = await Company.findOne({
        include: [
          { model: Lookup, as: 'countryLookup' },
        ],
        where: { 
          id,
          isDeleted: false,
        },
      });
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

      const where: WhereOptions = {
        isDeleted: false, // Exclude soft-deleted companies
      };

      if (filter.status) {
        where.isActive = filter.status;
      }

      if (filter.search) {
        where[Op.or as any] = [
          { title: { [Op.iLike]: `%${filter.search}%` } },
          { companyId: { [Op.iLike]: `%${filter.search}%` } },
        ];
      }

      const { count, rows } = await Company.findAndCountAll({
        include: [
          { model: Lookup, as: 'countryLookup' },
        ],
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

  private async _updateCompanyById(id: string, updateData: UpdateCompanyInput, userId?: string | null): Promise<CompanyOrm | null> {
    try {
      const company = await Company.findOne({ where: { id, isDeleted: false } });
      if (company) {
        // Validate and truncate ticketShortCode if needed (max 10 characters for database)
        const updatePayload: any = {
          ...updateData,
          updatedBy: userId || null,
        };
        
        if (updatePayload.ticketShortCode && updatePayload.ticketShortCode.length > 10) {
          updatePayload.ticketShortCode = updatePayload.ticketShortCode.substring(0, 10);
        }
        
        await company.update(updatePayload);
        return company;
      }
      return null;
    } catch (error) {
      throw new ApolloError(`Failed to update company with ID ${id}: ${error.message}`, 'COMPANY_UPDATE_FAILED');
    }
  }

  private async _deleteCompanyById(id: string, userId?: string | null): Promise<boolean> {
    try {
      const sequelize = Company.sequelize;

      if (!sequelize) {
        throw new ApolloError('Database connection not available', 'SEQUELIZE_NOT_INITIALIZED');
      }

      return await sequelize.transaction(async (transaction) => {
        const company = await Company.findOne({ where: { id }, transaction });

        if (!company) {
          return false;
        }

        // Soft delete: Update the company with deletedBy and deletedAt
        await company.update({
          deletedBy: userId || null,
          deletedAt: new Date(),
          isDeleted: true,
        }, { transaction });

        // Also soft delete related records if they support it
        // For now, we'll keep hard deletes for related records as they may not have soft delete support
        await MaintenanceService.destroy({ where: { companyId: id }, transaction });
        await Contract.destroy({ where: { companyId: id }, transaction });
        await User.destroy({ where: { companyId: id }, transaction });

        const branches = await Branch.findAll({
          attributes: ['id'],
          where: { companyId: id },
          transaction,
        });

        const branchIds = branches.map((branch) => branch.id);

        if (branchIds.length) {
          await Zone.destroy({ where: { branchId: branchIds }, transaction });
        }

        await Branch.destroy({ where: { companyId: id }, transaction });

        return true;
      });
    } catch (error) {
      throw new ApolloError(`Failed to delete company with ID ${id}: ${error.message}`, 'COMPANY_DELETION_FAILED');
    }
  }
}

export default CompanyRepository;

