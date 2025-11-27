import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum LookupCategory {
  BUSINESS_MODEL = 'BusinessModel',
  COUNTRY = 'Country',
  ESTABLISHED_TYPE = 'EstablishedType',
  MAIN_SERVICE = 'MainService',
  MANAGED_BY = 'ManagedBy',
  STATE = 'State',
  SUB_SERVICE = 'SubService',
  USER_ROLE = 'UserRole',
}

registerEnumType(LookupCategory, {
  description: 'Lookup category types',
  name: 'LookupCategory',
});

