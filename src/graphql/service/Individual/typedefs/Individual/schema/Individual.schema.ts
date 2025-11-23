import { Field, ID, ObjectType } from 'type-graphql';
import { IndividualStatus } from '../enums/Individual.enums';

@ObjectType({
  description: 'Individual entity',
})
export class Individual {
  @Field((_type) => ID!)
  public id: string;

  @Field((_type) => String!)
  public individualId: string;

  @Field((_type) => String!)
  public firstName: string;

  @Field((_type) => String!)
  public lastName: string;

  @Field((_type) => String!)
  public fullName: string;

  @Field((_type) => String!)
  public email: string;

  @Field((_type) => String, { nullable: true })
  public phoneNumber: string | null;

  @Field((_type) => IndividualStatus!)
  public isActive: IndividualStatus;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

