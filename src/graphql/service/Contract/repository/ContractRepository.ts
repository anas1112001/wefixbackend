import { ApolloError } from 'apollo-server-express';
import { Op, WhereOptions } from 'sequelize';
import { Contract } from '../../../../db/models/contract.model';
import { Company } from '../../../../db/models/company.model';
import { Lookup } from '../../../../db/models/lookup.model';
import { ContractStatus } from '../typedefs/Contract/enums/Contract.enums';
import { ContractFilterInput } from '../typedefs/Contract/inputs/ContractFilterInput.schema';
import { CreateContractInput } from '../typedefs/Contract/inputs/CreateContractInput.schema';
import { UpdateContractInput } from '../typedefs/Contract/inputs/UpdateContractInput.schema';
import { ContractOrm } from './orm/ContractOrm';

class ContractRepository {
  public createContract: (contractData: CreateContractInput) => Promise<ContractOrm>;
  public deleteContractById: (id: string) => Promise<boolean>;
  public getContractById: (id: string) => Promise<ContractOrm | null>;
  public getContracts: (filter: ContractFilterInput) => Promise<{ contracts: ContractOrm[]; total: number; page: number; limit: number; totalPages: number }>;
  public updateContractById: (id: string, updateData: UpdateContractInput) => Promise<ContractOrm | null>;

  constructor() {
    this.createContract = this._createContract.bind(this);
    this.deleteContractById = this._deleteContractById.bind(this);
    this.getContractById = this._getContractById.bind(this);
    this.getContracts = this._getContracts.bind(this);
    this.updateContractById = this._updateContractById.bind(this);
  }

  private async _generateContractReference(): Promise<string> {
    try {
      const year = new Date().getFullYear();
      const prefix = `Cont${year}`;
      
      // Get the last contract for this year
      const lastContract = await Contract.findOne({
        where: {
          contractReference: {
            [Op.like]: `%-${prefix}`,
          },
        },
        order: [['createdAt', 'DESC']],
      });

      let sequence = 1;
      if (lastContract) {
        const match = lastContract.contractReference.match(/^(\d+)-/);
        if (match) {
          sequence = parseInt(match[1], 10) + 1;
        }
      }

      const sequenceStr = sequence.toString().padStart(3, '0');
      return `${sequenceStr}-${prefix}`;
    } catch (error) {
      throw new ApolloError(`Failed to generate contract reference: ${error.message}`, 'CONTRACT_REFERENCE_GENERATION_FAILED');
    }
  }

  private async _createContract(contractData: CreateContractInput): Promise<ContractOrm> {
    try {
      const contractReference = await this._generateContractReference();
      
      const newContract = await Contract.create({
        contractReference,
        contractTitle: contractData.contractTitle,
        companyId: contractData.companyId,
        businessModelLookupId: contractData.businessModelLookupId,
        isActive: contractData.isActive !== undefined ? contractData.isActive : true,
        numberOfTeamLeaders: contractData.numberOfTeamLeaders || 0,
        numberOfBranches: contractData.numberOfBranches || 0,
        numberOfPreventiveTickets: contractData.numberOfPreventiveTickets || 0,
        numberOfCorrectiveTickets: contractData.numberOfCorrectiveTickets || 0,
        contractStartDate: contractData.contractStartDate || null,
        contractEndDate: contractData.contractEndDate || null,
        contractValue: contractData.contractValue || null,
        contractFiles: contractData.contractFiles || null,
        contractDescription: contractData.contractDescription || null,
      } as any);
      
      // Reload with associations
      return await this._getContractById(newContract.id) || newContract;
    } catch (error) {
      throw new ApolloError(`Failed to create contract: ${error.message}`, 'CONTRACT_CREATION_FAILED');
    }
  }

  private async _getContractById(id: string): Promise<ContractOrm | null> {
    try {
      const contract = await Contract.findOne({
        include: [
          { model: Company, as: 'company' },
          { model: Lookup, as: 'businessModelLookup' },
        ],
        where: { id },
      });
      return contract;
    } catch (error) {
      throw new ApolloError(`Failed to get contract: ${error.message}`, 'CONTRACT_RETRIEVAL_FAILED');
    }
  }

  private async _getContracts(filter: ContractFilterInput): Promise<{ contracts: ContractOrm[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const page = filter.page || 1;
      const limit = filter.limit || 10;
      const offset = (page - 1) * limit;

      const where: WhereOptions = {};

      if (filter.status) {
        where.isActive = filter.status === ContractStatus.ACTIVE;
      }

      if (filter.businessModel) {
        where.businessModelLookupId = filter.businessModel;
      }

      if (filter.search) {
        where[Op.or as any] = [
          { contractReference: { [Op.iLike]: `%${filter.search}%` } },
          { contractTitle: { [Op.iLike]: `%${filter.search}%` } },
        ];
      }

      const { count, rows } = await Contract.findAndCountAll({
        include: [
          { model: Company, as: 'company' },
          { model: Lookup, as: 'businessModelLookup' },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where,
      });

      const totalPages = Math.ceil(count / limit);

      return {
        contracts: rows,
        limit,
        page,
        total: count,
        totalPages,
      };
    } catch (error) {
      throw new ApolloError(`Failed to get contracts: ${error.message}`, 'CONTRACTS_RETRIEVAL_FAILED');
    }
  }

  private async _updateContractById(id: string, updateData: UpdateContractInput): Promise<ContractOrm | null> {
    try {
      const contract = await Contract.findOne({ where: { id } });
      if (contract) {
        await contract.update(updateData);
        return await this._getContractById(id);
      }
      return null;
    } catch (error) {
      throw new ApolloError(`Failed to update contract with ID ${id}: ${error.message}`, 'CONTRACT_UPDATE_FAILED');
    }
  }

  private async _deleteContractById(id: string): Promise<boolean> {
    try {
      const deleted = await Contract.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete contract with ID ${id}: ${error.message}`, 'CONTRACT_DELETION_FAILED');
    }
  }
}

export default ContractRepository;

