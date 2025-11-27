import { Model } from 'sequelize-typescript';
import { Lookup } from '../../../../../db/models/lookup.model';

export declare class SubServiceOrm extends Model {
  id: string;
  name: string;
  nameArabic?: string | null;
  code?: string | null;
  description?: string | null;
  parentLookupId?: string | null;
  parent?: Lookup;
  orderId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // For backward compatibility, map parent to mainService
  get mainServiceId(): string | null;
  get mainService(): Lookup | null;
}

