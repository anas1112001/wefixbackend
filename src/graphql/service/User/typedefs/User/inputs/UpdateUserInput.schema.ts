import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Input data for updating a user' })
export class UpdateUserInput {
    @Field()
    userNumber: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

}

