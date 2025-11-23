import { Model } from 'sequelize-typescript';
import { Company } from '../../../../../db/models/company.model';
import { Lookup } from '../../../../../db/models/lookup.model';

export declare class ContractOrm extends Model {
  id: string;
  contractReference: string;
  contractTitle: string;
  companyId: string;
  businessModelLookupId: string;
  isActive: boolean;
  numberOfTeamLeaders: number;
  numberOfBranches: number;
  numberOfPreventiveTickets: number;
  numberOfCorrectiveTickets: number;
  contractStartDate: Date | null;
  contractEndDate: Date | null;
  contractValue: number | null;
  contractFiles: string | null;
  contractDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  company?: Company;
  businessModelLookup?: Lookup;
}

