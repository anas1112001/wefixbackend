import { Field, InputType } from 'type-graphql';

@InputType()
export class ForgotPasswordInput {
  @Field()
  username: string;

  @Field()
  lastFourDigits: string;
}


