import { ApolloError } from 'apollo-server-express';
import { Branch } from '../../../../db/models/branch.model';
import { Company } from '../../../../db/models/company.model';
import { Lookup } from '../../../../db/models/lookup.model';
import { CreateBranchInput } from '../typedefs/Branch/inputs/CreateBranchInput.schema';
import { BranchOrm } from './orm/BranchOrm';

class BranchRepository {
  public createBranch: (branchData: CreateBranchInput) => Promise<BranchOrm>;
  public getBranchById: (id: string) => Promise<BranchOrm | null>;
  public getBranchesByCompanyId: (companyId: string) => Promise<BranchOrm[]>;
  public deleteBranchById: (id: string) => Promise<boolean>;

  constructor() {
    this.createBranch = this._createBranch.bind(this);
    this.getBranchById = this._getBranchById.bind(this);
    this.getBranchesByCompanyId = this._getBranchesByCompanyId.bind(this);
    this.deleteBranchById = this._deleteBranchById.bind(this);
  }

  private async _createBranch(branchData: CreateBranchInput): Promise<BranchOrm> {
    try {
      const newBranch = await Branch.create({
        branchTitle: branchData.branchTitle,
        branchNameArabic: branchData.branchNameArabic || null,
        branchNameEnglish: branchData.branchNameEnglish || null,
        branchRepresentativeName: branchData.branchRepresentativeName || null,
        representativeMobileNumber: branchData.representativeMobileNumber || null,
        representativeEmailAddress: branchData.representativeEmailAddress || null,
        companyId: branchData.companyId,
        teamLeaderLookupId: branchData.teamLeaderLookupId || null,
        isActive: branchData.isActive !== undefined ? branchData.isActive : true,
      } as any);
      
      return await this._getBranchById(newBranch.id) || newBranch;
    } catch (error) {
      throw new ApolloError(`Failed to create branch: ${error.message}`, 'BRANCH_CREATION_FAILED');
    }
  }

  private async _getBranchById(id: string): Promise<BranchOrm | null> {
    try {
      const branch = await Branch.findOne({
        include: [
          { model: Company, as: 'company' },
          { model: Lookup, as: 'teamLeaderLookup' },
        ],
        where: { id },
      });
      return branch;
    } catch (error) {
      throw new ApolloError(`Failed to get branch: ${error.message}`, 'BRANCH_RETRIEVAL_FAILED');
    }
  }

  private async _getBranchesByCompanyId(companyId: string): Promise<BranchOrm[]> {
    try {
      const branches = await Branch.findAll({
        include: [
          { model: Company, as: 'company' },
          { model: Lookup, as: 'teamLeaderLookup' },
        ],
        where: { companyId },
        order: [['createdAt', 'DESC']],
      });
      return branches;
    } catch (error) {
      throw new ApolloError(`Failed to get branches: ${error.message}`, 'BRANCHES_RETRIEVAL_FAILED');
    }
  }

  private async _deleteBranchById(id: string): Promise<boolean> {
    try {
      const branch = await Branch.findOne({
        attributes: ['companyId'],
        where: { id },
      });

      if (!branch) {
        return false;
      }

      const deleted = await Branch.destroy({ where: { id } });

      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete branch with ID ${id}: ${error.message}`, 'BRANCH_DELETION_FAILED');
    }
  }
}

export default BranchRepository;

