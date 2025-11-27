import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  userNumber: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  userRoleId: string;

  @Field()
  email: string;

  @Field()
  deviceId: string;

  @Field()
  fcmToken: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  companyId?: string;
}