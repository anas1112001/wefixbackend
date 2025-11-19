import { Field, ObjectType } from 'type-graphql';

import { AuthTokens } from '../schema/AuthTokens.schema';
import { User } from '../schema/User.schema';

@ObjectType({ description: 'Response data for updating a user' })
export class CreateUserResponse {
    @Field((_type) => User, { nullable: true })
    user?: User;

    @Field({ nullable: false })
    message: string;

    @Field((_type) => AuthTokens, { nullable: true })
    token?: AuthTokens;
}
