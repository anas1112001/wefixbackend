import { Model } from 'sequelize-typescript';

export declare class MainServiceOrm extends Model {
  id: string;
  name: string;
  nameArabic?: string | null;
  code?: string | null;
  description?: string | null;
  orderId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

