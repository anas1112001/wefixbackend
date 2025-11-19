import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Auth tokens data' })
export class AuthTokens {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field()
    tokenType: string;

    @Field()
    expiresIn: number;
}
