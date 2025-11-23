import { Field, InputType } from 'type-graphql';
import { CompanyStatus, EstablishedType } from '../../enums/Company.enums';

@InputType({ description: 'Input data for creating a company' })
export class CreateCompanyInput {
  @Field()
  companyId: string;

  @Field()
  title: string;

  @Field((_type) => CompanyStatus, { defaultValue: CompanyStatus.ACTIVE })
  isActive: CompanyStatus;

  @Field((_type) => EstablishedType)
  establishedType: EstablishedType;

  @Field((_type) => Number, { defaultValue: 0 })
  numberOfBranches: number;

  @Field((_type) => String, { nullable: true })
  logo?: string | null;
}

