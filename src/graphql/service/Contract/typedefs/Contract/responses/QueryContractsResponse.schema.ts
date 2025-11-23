import { Field, ObjectType } from 'type-graphql';
import { Contract } from '../schema/Contract.schema';

@ObjectType({ description: 'Response data for contracts list' })
export class QueryContractsResponse {
  @Field((_type) => [Contract!])
  contracts: Contract[];

  @Field((_type) => Number!)
  total: number;

  @Field((_type) => Number!)
  page: number;

  @Field((_type) => Number!)
  limit: number;

  @Field((_type) => Number!)
  totalPages: number;

  @Field()
  message: string;
}

