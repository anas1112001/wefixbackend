import { ApolloError } from 'apollo-server-express';
import { Op, WhereOptions } from 'sequelize';
import { Company } from '../../../../db/models/company.model';
import { Lookup } from '../../../../db/models/lookup.model';
import { Branch } from '../../../../db/models/branch.model';
import { Zone } from '../../../../db/models/zone.model';
import { Contract } from '../../../../db/models/contract.model';
import { MaintenanceService } from '../../../../db/models/maintenance-service.model';
import { User } from '../../../../db/models/user.model';
import { CompanyStatus, EstablishedType } from '../typedefs/Company/enums/Company.enums';
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
      // Get established type from lookup if provided
      let establishedType = EstablishedType.LLC; // Default value

      if (companyData.establishedTypeLookupId) {
        const lookup = await Lookup.findOne({
          where: { id: companyData.establishedTypeLookupId },
        });

        if (lookup) {
          // Map lookup name to EstablishedType enum
          const lookupName = lookup.name;

          if (lookupName === 'LLC') {
            establishedType = EstablishedType.LLC;
          } else if (lookupName === 'Corporation') {
            establishedType = EstablishedType.CORPORATION;
          } else if (lookupName === 'Partnership') {
            establishedType = EstablishedType.PARTNERSHIP;
          } else if (lookupName === 'Sole Proprietorship') {
            establishedType = EstablishedType.SOLE_PROPRIETORSHIP;
          }
        }
      }

      const newCompany = await Company.create({
        companyId: companyData.companyId,
        title: companyData.title,
        companyNameArabic: companyData.companyNameArabic || null,
        companyNameEnglish: companyData.companyNameEnglish || null,
        countryLookupId: companyData.countryLookupId || null,
        establishedTypeLookupId: companyData.establishedTypeLookupId || null,
        establishedType,
        hoAddress: companyData.hoAddress || null,
        hoLocation: companyData.hoLocation || null,
        isActive: companyData.isActive || CompanyStatus.ACTIVE,
        logo: companyData.logo || null,
        numberOfBranches: companyData.numberOfBranches || 0,
      } as any);
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
          { model: Lookup, as: 'establishedTypeLookup' },
        ],
        where: { id },
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

      const where: WhereOptions = {};

      if (filter.status) {
        where.isActive = filter.status;
      }

      if (filter.type) {
        where.establishedTypeLookupId = filter.type;
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
          { model: Lookup, as: 'establishedTypeLookup' },
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
      const sequelize = Company.sequelize;

      if (!sequelize) {
        throw new ApolloError('Database connection not available', 'SEQUELIZE_NOT_INITIALIZED');
      }

      return await sequelize.transaction(async (transaction) => {
        const company = await Company.findOne({ where: { id }, transaction });

        if (!company) {
          return false;
        }

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

        const deleted = await Company.destroy({ where: { id }, transaction });
        return deleted > 0;
      });
    } catch (error) {
      throw new ApolloError(`Failed to delete company with ID ${id}: ${error.message}`, 'COMPANY_DELETION_FAILED');
    }
  }
}

export default CompanyRepository;

