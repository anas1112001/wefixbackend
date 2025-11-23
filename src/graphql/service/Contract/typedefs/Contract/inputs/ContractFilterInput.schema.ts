import { Field, InputType } from 'type-graphql';
import { ContractStatus } from '../enums/Contract.enums';

@InputType({ description: 'Input data for filtering contracts' })
export class ContractFilterInput {
  @Field((_type) => ContractStatus, { nullable: true })
  status?: ContractStatus;

  @Field((_type) => String, { nullable: true })
  businessModel?: string;

  @Field({ nullable: true })
  search?: string;

  @Field((_type) => Number, { defaultValue: 1 })
  page?: number;

  @Field((_type) => Number, { defaultValue: 10 })
  limit?: number;
}

