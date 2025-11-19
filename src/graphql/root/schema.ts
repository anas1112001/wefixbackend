import { buildSubgraphSchema } from '@apollo/subgraph';
import path from 'path'
import 'reflect-metadata'
import { buildSchema, BuildSchemaOptions, createResolversMap } from 'type-graphql'

import { printSchema } from "graphql";
import { gql } from 'graphql-tag'

import { LogResolver } from '../service/Log/LogResolver'
import { UserResolver } from '../service/User/resolver/UserResolver'


const resolvers: BuildSchemaOptions['resolvers'] = [UserResolver, LogResolver ]

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
