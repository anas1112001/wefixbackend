import { Field, ObjectType } from 'type-graphql';
import { Company } from '../../schema/Company.schema';

@ObjectType({ description: 'Response data for updating a company' })
export class UpdateCompanyResponse {
  @Field((_type) => Company, { nullable: true })
  company?: Company;

  @Field()
  message: string;
}

