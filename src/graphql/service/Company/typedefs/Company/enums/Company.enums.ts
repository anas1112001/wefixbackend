import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum CompanyStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

registerEnumType(CompanyStatus, {
  description: 'Company status types',
  name: 'CompanyStatus',
});

