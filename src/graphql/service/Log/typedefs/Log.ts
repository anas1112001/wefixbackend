import { Field, ID, ObjectType } from 'type-graphql'

import { Actions } from './logEnums'

import { User } from '../../User/typedefs/User/schema/User.schema'

@ObjectType({ description: 'Schema for Log model' })
export class Log {
  @Field((_type) => ID!)
  public id: string

  @Field((_type) => Actions!)
  public actionType: Actions

  @Field((_type) => String, { nullable: true })
  public description: string | null

  @Field((_type) => Date!)
  public time: Date

  @Field((_type) => User)
  public user: User

  @Field((_type) => Boolean, { defaultValue: false })
  public isArchived: boolean
}
