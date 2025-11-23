import { Model } from 'sequelize-typescript';
import { IndividualStatus } from '../../../../../db/models/individual.model';

export declare class IndividualOrm extends Model {
  id: string;
  individualId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  isActive: IndividualStatus;
  createdAt: Date;
  updatedAt: Date;
}

