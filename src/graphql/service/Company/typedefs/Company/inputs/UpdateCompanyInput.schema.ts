import { Field, InputType } from 'type-graphql';
import { CompanyStatus, EstablishedType } from '../../enums/Company.enums';

@InputType({ description: 'Input data for updating a company' })
export class UpdateCompanyInput {
  @Field({ nullable: true })
  title?: string;

  @Field((_type) => CompanyStatus, { nullable: true })
  isActive?: CompanyStatus;

  @Field((_type) => EstablishedType, { nullable: true })
  establishedType?: EstablishedType;

  @Field((_type) => Number, { nullable: true })
  numberOfBranches?: number;

  @Field((_type) => String, { nullable: true })
  logo?: string | null;
}

