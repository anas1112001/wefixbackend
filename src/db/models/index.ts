import { Log } from './log.model'
import { User } from './user.model'
import { Company } from './company.model'
import { Individual } from './individual.model'

export * from './log.model'
export * from './user.model'
export * from './company.model'
export * from './individual.model'



export const MODELS = [Log, User, Company, Individual];

export const setupAssociations = () => {



}