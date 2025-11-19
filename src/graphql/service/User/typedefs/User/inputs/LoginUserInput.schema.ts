// src/typedefs/User/LoginInput.schema.ts
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  deviceId: string;

  @Field()
  fcmToken: string;
}
