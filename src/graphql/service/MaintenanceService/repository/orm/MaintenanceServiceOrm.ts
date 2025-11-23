import { Model } from 'sequelize-typescript';
import { Company } from '../../../../../db/models/company.model';
import { MainService } from '../../../../../db/models/main-service.model';
import { SubService } from '../../../../../db/models/sub-service.model';

export declare class MaintenanceServiceOrm extends Model {
  id: string;
  companyId: string;
  mainServiceId: string;
  subServiceId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  company?: Company;
  mainService?: MainService;
  subService?: SubService;
}

