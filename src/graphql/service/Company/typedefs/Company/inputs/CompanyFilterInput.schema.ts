import { Field, InputType } from 'type-graphql';
import { CompanyStatus } from '../enums/Company.enums';

@InputType({ description: 'Input data for filtering companies' })
export class CompanyFilterInput {
  @Field((_type) => CompanyStatus, { nullable: true })
  status?: CompanyStatus;

  @Field({ nullable: true })
  search?: string;

  @Field((_type) => Number, { defaultValue: 1 })
  page?: number;

  @Field((_type) => Number, { defaultValue: 10 })
  limit?: number;
}

