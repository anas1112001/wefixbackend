import { Field, ObjectType } from 'type-graphql';
import { Company } from '../../schema/Company.schema';

@ObjectType({ description: 'Response data for company by id' })
export class QueryCompanyResponse {
  @Field((_type) => Company, { nullable: true })
  company?: Company;

  @Field()
  message: string;
}

