import { Field, ObjectType } from 'type-graphql'

import { User } from '../schema/User.schema'

@ObjectType({ description: 'Response data for users' })
export class QueryUsersResponse {
  @Field((_type) => [User], { nullable: true })
  users?: User[]

  @Field({ nullable: false })
  message: string;
}
