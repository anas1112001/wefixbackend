import { Field, InputType } from 'type-graphql';

import { CompanyRoles, UserRoles } from '../enums/User.enums';

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

  @Field(() => CompanyRoles, { nullable: true })
  companyRole?: CompanyRoles;

  @Field()
  email: string;

  @Field()
  deviceId: string;

  @Field()
  fcmToken: string;

  @Field()
  password: string;


}