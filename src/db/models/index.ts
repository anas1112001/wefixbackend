import { Log } from './log.model'
import { User } from './user.model'
import { Company } from './company.model'
import { Individual } from './individual.model'
import { Country } from './country.model'
import { EstablishedType } from './established-type.model'

export * from './log.model'
export * from './user.model'
export * from './company.model'
export * from './individual.model'
export * from './country.model'
export * from './established-type.model'



export const MODELS = [Log, User, Company, Individual, Country, EstablishedType];

export const setupAssociations = () => {
  // Company associations
  Company.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });
  Company.belongsTo(EstablishedType, { foreignKey: 'establishedTypeId', as: 'establishedType' });
}