import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;
}



