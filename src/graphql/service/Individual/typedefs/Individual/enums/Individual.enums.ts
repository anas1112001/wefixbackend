import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum IndividualStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

registerEnumType(IndividualStatus, {
  description: 'Individual status types',
  name: 'IndividualStatus',
});

