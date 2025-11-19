import { Field, ObjectType } from 'type-graphql';

import { AuthTokens } from '../schema/AuthTokens.schema';
import { User } from '../schema/User.schema';

@ObjectType()
export class LoginResponse {
  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field((_type) => AuthTokens, { nullable: true })
  token?: AuthTokens;
}
