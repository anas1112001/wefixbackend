import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum CompanyStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum EstablishedType {
  LLC = 'LLC',
  CORPORATION = 'Corporation',
  PARTNERSHIP = 'Partnership',
  SOLE_PROPRIETORSHIP = 'Sole Proprietorship',
}

registerEnumType(CompanyStatus, {
  description: 'Company status types',
  name: 'CompanyStatus',
});

registerEnumType(EstablishedType, {
  description: 'Company established type',
  name: 'EstablishedType',
});

