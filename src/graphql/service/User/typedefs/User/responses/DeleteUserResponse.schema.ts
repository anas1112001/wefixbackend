import { Field, ObjectType } from 'type-graphql';

import { User } from '../schema/User.schema';

@ObjectType({ description: 'Response data for deleting a user' })
export class DeleteUserResponse {
    @Field(_type => User, { nullable: true })
    user?: User;

    @Field({ nullable: false })
    message: string;
}
