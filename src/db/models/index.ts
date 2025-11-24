import { Log } from './log.model'
import { User } from './user.model'
import { Company } from './company.model'
import { Individual } from './individual.model'
import { Country } from './country.model'
import { EstablishedType } from './established-type.model'
import { UserRole } from './user-role.model'
import { TeamLeader } from './team-leader.model'
import { Lookup } from './lookup.model'
import { Contract } from './contract.model'
import { Branch } from './branch.model'
import { Zone } from './zone.model'
import { MaintenanceService } from './maintenance-service.model'
import { MainService } from './main-service.model'
import { SubService } from './sub-service.model'

export * from './log.model'
export * from './user.model'
export * from './company.model'
export * from './individual.model'
export * from './country.model'
export * from './established-type.model'
export * from './user-role.model'
export * from './team-leader.model'
export * from './lookup.model'
export * from './contract.model'
export * from './branch.model'
export * from './zone.model'
export * from './maintenance-service.model'
export * from './main-service.model'
export * from './sub-service.model'



export const MODELS = [Log, User, Company, Individual, Country, EstablishedType, UserRole, TeamLeader, Lookup, Contract, Branch, Zone, MaintenanceService, MainService, SubService];

export const setupAssociations = () => {
  // Company associations with Lookup
  Company.belongsTo(Lookup, { foreignKey: 'countryLookupId', as: 'countryLookup' });
  Company.belongsTo(Lookup, { foreignKey: 'establishedTypeLookupId', as: 'establishedTypeLookup' });
  
  // Contract associations
  Contract.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  Contract.belongsTo(Lookup, { foreignKey: 'businessModelLookupId', as: 'businessModelLookup' });
  Company.hasMany(Contract, { foreignKey: 'companyId', as: 'contracts' });
  
  // Branch associations
  Branch.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  Branch.belongsTo(Lookup, { foreignKey: 'teamLeaderLookupId', as: 'teamLeaderLookup' });
  Company.hasMany(Branch, { foreignKey: 'companyId', as: 'branches' });
  
  // Zone associations
  Zone.belongsTo(Branch, { foreignKey: 'branchId', as: 'branch' });
  Branch.hasMany(Zone, { foreignKey: 'branchId', as: 'zones' });
  
  // MaintenanceService associations
  MaintenanceService.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  MaintenanceService.belongsTo(MainService, { foreignKey: 'mainServiceId', as: 'mainService' });
  MaintenanceService.belongsTo(SubService, { foreignKey: 'subServiceId', as: 'subService' });
  Company.hasMany(MaintenanceService, { foreignKey: 'companyId', as: 'maintenanceServices' });
  
  // SubService associations
  SubService.belongsTo(MainService, { foreignKey: 'mainServiceId', as: 'mainService' });

  // User associations
  User.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  Company.hasMany(User, { foreignKey: 'companyId', as: 'users' });
  
  // Lookup self-reference for hierarchical relationships
  Lookup.belongsTo(Lookup, { foreignKey: 'parentLookupId', as: 'parent' });
}