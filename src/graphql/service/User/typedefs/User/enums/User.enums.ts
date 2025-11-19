import 'reflect-metadata';
import { registerEnumType } from 'type-graphql';

export enum UserRoles {
  SUPER_ADMIN = 'Super Admin',
  COMPANY = 'Company',
  INDIVIDUAL = 'Individual',
}

export enum CompanyRoles {
  COMPANY_ADMIN = 'Company Admin',
  TEAM_LEADER = 'Team Leader',
  TECHNICIAN = 'Technician',
  CLIENT = 'Client',
}

registerEnumType(UserRoles, {
  description: 'High level role for access control',
  name: 'UserRoles',
});

registerEnumType(CompanyRoles, {
  description: 'Company specific role scoping',
  name: 'CompanyRoles',
});
