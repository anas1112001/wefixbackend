import { Log } from './log.model'
import { User } from './user.model'
import { Company } from './company.model'
import { Lookup } from './lookup.model'
import { Contract } from './contract.model'
import { Branch } from './branch.model'
import { Zone } from './zone.model'
import { MaintenanceService } from './maintenance-service.model'

export * from './log.model'
export * from './user.model'
export * from './company.model'
export * from './lookup.model'
export * from './contract.model'
export * from './branch.model'
export * from './zone.model'
export * from './maintenance-service.model'



export const MODELS = [Log, User, Company, Lookup, Contract, Branch, Zone, MaintenanceService];

export const setupAssociations = () => {
  // Company associations with Lookup
  Company.belongsTo(Lookup, { foreignKey: 'countryLookupId', as: 'countryLookup' });
  
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
  MaintenanceService.belongsTo(Lookup, { foreignKey: 'mainServiceId', as: 'mainService' });
  MaintenanceService.belongsTo(Lookup, { foreignKey: 'subServiceId', as: 'subService' });
  Company.hasMany(MaintenanceService, { foreignKey: 'companyId', as: 'maintenanceServices' });

  // User associations
  User.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  User.belongsTo(Lookup, { foreignKey: 'userRoleId', as: 'userRoleLookup' });
  Company.hasMany(User, { foreignKey: 'companyId', as: 'users' });
  
  // Lookup self-reference for hierarchical relationships
  Lookup.belongsTo(Lookup, { foreignKey: 'parentLookupId', as: 'parent' });
}