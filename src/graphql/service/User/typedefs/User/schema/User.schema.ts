import { Field, ID, ObjectType } from 'type-graphql'

import {  UserRoles } from '../enums/User.enums'
import { Company } from '../../../../Company/typedefs/Company/schema/Company.schema'

@ObjectType({
  description: 'Resoponse for the user item',
})
export class User {
  @Field((_type) => ID!)
  public id: string

  @Field((_type) => String!)
  public userNumber: string

  @Field((_type) => String!)
  public firstName: string

  @Field((_type) => String!)
  public lastName: string

  @Field((_type) => String!)
  public fullName: string

  @Field((_type) => String!)
  public email: string

  @Field((_type) => String!)
  public password: string

  @Field((_type) => UserRoles!)
  public userRole: UserRoles

  @Field({ nullable: true })
  public companyId?: string | null

  @Field(() => Company, { nullable: true })
  public company?: Company | null

  @Field((_type) => Date)
  public createdAt?: Date

  @Field((_type) => Date)
  public updatedAt?: Date
}
