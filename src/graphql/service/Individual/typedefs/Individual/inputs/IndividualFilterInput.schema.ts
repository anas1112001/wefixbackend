import { Field, InputType } from 'type-graphql';
import { IndividualStatus } from '../enums/Individual.enums';

@InputType({ description: 'Input data for filtering individuals' })
export class IndividualFilterInput {
  @Field((_type) => IndividualStatus, { nullable: true })
  status?: IndividualStatus;

  @Field({ nullable: true })
  search?: string;

  @Field((_type) => Number, { defaultValue: 1 })
  page?: number;

  @Field((_type) => Number, { defaultValue: 10 })
  limit?: number;
}

