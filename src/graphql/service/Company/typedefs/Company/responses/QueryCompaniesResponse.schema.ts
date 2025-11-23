import { Field, ObjectType } from 'type-graphql';
import { Company } from '../schema/Company.schema';

@ObjectType({ description: 'Response data for companies list' })
export class QueryCompaniesResponse {
  @Field((_type) => [Company!])
  companies: Company[];

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

