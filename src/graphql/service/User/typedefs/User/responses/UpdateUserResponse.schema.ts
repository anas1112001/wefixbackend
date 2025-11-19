import { Field, ObjectType } from 'type-graphql';

import { User } from '../schema/User.schema';

@ObjectType({ description: 'Response data for updating a user' })
export class UpdateUserResponse {
    @Field(_type => User, { nullable: true })
    user?: User;

    @Field({ nullable: false })
    message: string;
}
