import { Field, ObjectType } from 'type-graphql';
import { Individual } from '../../schema/Individual.schema';

@ObjectType({ description: 'Response data for individuals list' })
export class QueryIndividualsResponse {
  @Field((_type) => [Individual!])
  individuals: Individual[];

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

