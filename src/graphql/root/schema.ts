import { buildSubgraphSchema } from '@apollo/subgraph';
import path from 'path'
import 'reflect-metadata'
import { buildSchema, BuildSchemaOptions, createResolversMap } from 'type-graphql'

import { printSchema } from "graphql";
import { gql } from 'graphql-tag'

import { LogResolver } from '../service/Log/LogResolver'
import { UserResolver } from '../service/User/resolver/UserResolver'
import { CompanyResolver } from '../service/Company/resolver/CompanyResolver'
import { IndividualResolver } from '../service/Individual/resolver/IndividualResolver'
import { CountryResolver } from '../service/Country/resolver/CountryResolver'
import { EstablishedTypeResolver } from '../service/EstablishedType/resolver/EstablishedTypeResolver'
import { UserRoleResolver } from '../service/UserRole/resolver/UserRoleResolver'
import { TeamLeaderResolver } from '../service/TeamLeader/resolver/TeamLeaderResolver'
import { LookupResolver } from '../service/Lookup/resolver/LookupResolver'
import { ContractResolver } from '../service/Contract/resolver/ContractResolver'
import { BranchResolver } from '../service/Branch/resolver/BranchResolver'
import { ZoneResolver } from '../service/Zone/resolver/ZoneResolver'
import { MaintenanceServiceResolver } from '../service/MaintenanceService/resolver/MaintenanceServiceResolver'
import { MainServiceResolver } from '../service/MainService/resolver/MainServiceResolver'
import { SubServiceResolver } from '../service/SubService/resolver/SubServiceResolver'


const resolvers: BuildSchemaOptions['resolvers'] = [UserResolver, LogResolver, CompanyResolver, IndividualResolver, CountryResolver, EstablishedTypeResolver, UserRoleResolver, TeamLeaderResolver, LookupResolver, ContractResolver, BranchResolver, ZoneResolver, MaintenanceServiceResolver, MainServiceResolver, SubServiceResolver ]

const options = {
  resolvers,
}

export const generateSchema = async (schemaFile = 'targetSchema.graphql'): Promise<any> => {
  const schema = await buildSchema({
    ...options,
    emitSchemaFile: path.resolve(process.cwd(), schemaFile),
    skipCheck: true,
  })

  const federatedSchema = buildSubgraphSchema({
    resolvers: createResolversMap(schema) as any,
    typeDefs: gql(printSchema(schema)),
  })

  return federatedSchema
}
