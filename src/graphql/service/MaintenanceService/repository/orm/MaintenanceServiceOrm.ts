import { Model } from 'sequelize-typescript';
import { Company } from '../../../../../db/models/company.model';
import { Lookup } from '../../../../../db/models/lookup.model';

export declare class MaintenanceServiceOrm extends Model {
  id: string;
  companyId: string;
  mainServiceId: string;
  subServiceId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  company?: Company;
  mainService?: Lookup;
  subService?: Lookup;
}

