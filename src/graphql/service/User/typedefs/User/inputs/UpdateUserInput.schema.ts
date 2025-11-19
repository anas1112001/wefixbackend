import { Field, InputType } from 'type-graphql';

import { CompanyRoles, UserRoles } from '../enums/User.enums';

@InputType({ description: 'Input data for updating a user' })
export class UpdateUserInput {
    @Field({ nullable: true })
    userNumber?: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field(() => UserRoles, { nullable: true })
    userRole?: UserRoles;

    @Field(() => CompanyRoles, { nullable: true })
    companyRole?: CompanyRoles;
}

