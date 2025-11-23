import { Model } from 'sequelize-typescript';
import { CompanyStatus } from '../../typedefs/Company/enums/Company.enums';
import { Lookup } from '../../../../../db/models/lookup.model';

export declare class CompanyOrm extends Model {
  id: string;
  companyId: string;
  title: string;
  companyNameArabic: string | null;
  companyNameEnglish: string | null;
  countryLookupId: string | null;
  establishedTypeLookupId: string | null;
  hoAddress: string | null;
  hoLocation: string | null;
  isActive: CompanyStatus;
  numberOfBranches: number;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
  countryLookup?: Lookup;
  establishedTypeLookup?: Lookup;
}

