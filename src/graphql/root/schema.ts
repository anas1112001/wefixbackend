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


const resolvers: BuildSchemaOptions['resolvers'] = [UserResolver, LogResolver, CompanyResolver, IndividualResolver, CountryResolver, EstablishedTypeResolver, UserRoleResolver, TeamLeaderResolver, LookupResolver ]

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
