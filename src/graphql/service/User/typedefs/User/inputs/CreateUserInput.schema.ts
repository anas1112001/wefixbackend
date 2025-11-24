import { Field, InputType } from 'type-graphql';

import { UserRoles } from '../enums/User.enums';

@InputType()
export class CreateUserInput {
  @Field()
  userNumber: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => UserRoles)
  userRole: UserRoles;

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