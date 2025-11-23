import { Model } from 'sequelize-typescript';
import { Branch } from '../../../../../db/models/branch.model';

export declare class ZoneOrm extends Model {
  id: string;
  zoneTitle: string;
  zoneNumber: string | null;
  zoneDescription: string | null;
  branchId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  branch?: Branch;
}
