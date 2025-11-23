import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum LookupCategory {
  BUSINESS_MODEL = 'BusinessModel',
  COUNTRY = 'Country',
  ESTABLISHED_TYPE = 'EstablishedType',
  MANAGED_BY = 'ManagedBy',
  TEAM_LEADER = 'TeamLeader',
  USER_ROLE = 'UserRole',
}

registerEnumType(LookupCategory, {
  description: 'Lookup category types',
  name: 'LookupCategory',
});

