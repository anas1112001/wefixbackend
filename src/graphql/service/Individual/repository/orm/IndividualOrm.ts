import { Model } from 'sequelize-typescript';
import { IndividualStatus } from '../../typedefs/Individual/enums/Individual.enums';

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

