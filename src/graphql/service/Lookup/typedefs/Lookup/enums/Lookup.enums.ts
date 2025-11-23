import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum LookupCategory {
  COUNTRY = 'Country',
  ESTABLISHED_TYPE = 'EstablishedType',
  USER_ROLE = 'UserRole',
  TEAM_LEADER = 'TeamLeader',
}

registerEnumType(LookupCategory, {
  description: 'Lookup category types',
  name: 'LookupCategory',
});

