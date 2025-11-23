import { Model } from 'sequelize-typescript';
import { CompanyStatus } from '../../typedefs/Company/enums/Company.enums';

export declare class CompanyOrm extends Model {
  id: string;
  companyId: string;
  title: string;
  companyNameArabic: string | null;
  companyNameEnglish: string | null;
  countryId: string | null;
  establishedTypeId: string | null;
  hoAddress: string | null;
  hoLocation: string | null;
  isActive: CompanyStatus;
  numberOfBranches: number;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

