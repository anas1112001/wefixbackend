import { Model } from 'sequelize-typescript';
import { CompanyStatus, EstablishedType } from '../../../../../db/models/company.model';

export declare class CompanyOrm extends Model {
  id: string;
  companyId: string;
  title: string;
  isActive: CompanyStatus;
  establishedType: EstablishedType;
  numberOfBranches: number;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

