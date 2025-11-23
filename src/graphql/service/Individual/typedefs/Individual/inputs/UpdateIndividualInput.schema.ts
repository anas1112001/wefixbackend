import { Field, InputType } from 'type-graphql';
import { IndividualStatus } from '../enums/Individual.enums';

@InputType({ description: 'Input data for updating an individual' })
export class UpdateIndividualInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field((_type) => String, { nullable: true })
  phoneNumber?: string | null;

  @Field((_type) => IndividualStatus, { nullable: true })
  isActive?: IndividualStatus;
}

