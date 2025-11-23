import { Model } from 'sequelize-typescript';
import { MainService } from '../../../../../db/models/main-service.model';

export declare class SubServiceOrm extends Model {
  id: string;
  name: string;
  nameArabic?: string | null;
  code?: string | null;
  description?: string | null;
  mainServiceId: string;
  mainService?: MainService;
  orderId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

