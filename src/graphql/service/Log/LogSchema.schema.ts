import { Field, ObjectType } from 'type-graphql'

import { Log } from './typedefs/Log'

@ObjectType({ description: 'Response data for log' })
export class LogResponse {
  @Field((_type) => Log)
  log?: Log
}
