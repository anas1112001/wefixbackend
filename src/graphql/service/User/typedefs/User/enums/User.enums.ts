import "reflect-metadata";
import { registerEnumType } from 'type-graphql'

export enum UserRoles {
  COMPANY = 'Company',
  INDIVIDUAL = 'Individual',
  SUPER_ADMIN = 'Super Admin',
}

export enum CompanyRoles {
  CLIENT = 'Client',
  COMPANY_ADMIN = 'Company Admin',
  TECHNICIAN = 'Technician',
  TEAM_LEADER = 'Team Leader',
}

registerEnumType(UserRoles, {
  description: 'User role types',
  name: 'UserRoles',
})

registerEnumType(CompanyRoles, {
  description: 'Company specific role types',
  name: 'CompanyRoles',
})
