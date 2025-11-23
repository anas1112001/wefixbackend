import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum ContractStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

registerEnumType(ContractStatus, {
  description: 'Contract status types',
  name: 'ContractStatus',
});

