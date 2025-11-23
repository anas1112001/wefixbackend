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



export const MODELS = [Log, User, Company, Individual, Country, EstablishedType, UserRole, TeamLeader, Lookup, Contract];

export const setupAssociations = () => {
  // Company associations with Lookup
  Company.belongsTo(Lookup, { foreignKey: 'countryLookupId', as: 'countryLookup' });
  Company.belongsTo(Lookup, { foreignKey: 'establishedTypeLookupId', as: 'establishedTypeLookup' });
  
  // Contract associations
  Contract.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  Contract.belongsTo(Lookup, { foreignKey: 'businessModelLookupId', as: 'businessModelLookup' });
  
  // Lookup self-reference for hierarchical relationships
  Lookup.belongsTo(Lookup, { foreignKey: 'parentLookupId', as: 'parent' });
}