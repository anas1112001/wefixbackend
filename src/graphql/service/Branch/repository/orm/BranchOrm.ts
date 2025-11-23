import { Model } from 'sequelize-typescript';
import { Company } from '../../../../../db/models/company.model';
import { Lookup } from '../../../../../db/models/lookup.model';

export declare class BranchOrm extends Model {
  id: string;
  branchTitle: string;
  branchNameArabic: string | null;
  branchNameEnglish: string | null;
  branchRepresentativeName: string | null;
  representativeMobileNumber: string | null;
  representativeEmailAddress: string | null;
  companyId: string;
  teamLeaderLookupId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  company?: Company;
  teamLeaderLookup?: Lookup;
}

