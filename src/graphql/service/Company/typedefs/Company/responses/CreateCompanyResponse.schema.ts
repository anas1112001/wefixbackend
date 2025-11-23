import { Field, ObjectType } from 'type-graphql';
import { Company } from '../schema/Company.schema';

@ObjectType({ description: 'Response data for creating a company' })
export class CreateCompanyResponse {
  @Field((_type) => Company, { nullable: true })
  company?: Company;

  @Field()
  message: string;
}

