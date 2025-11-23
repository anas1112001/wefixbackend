import { Field, InputType } from 'type-graphql';
import { CompanyStatus } from '../enums/Company.enums';

@InputType({ description: 'Input data for creating a company' })
export class CreateCompanyInput {
  @Field()
  companyId: string;

  @Field()
  title: string;

  @Field((_type) => String, { nullable: true })
  companyNameArabic?: string | null;

  @Field((_type) => String, { nullable: true })
  companyNameEnglish?: string | null;

  @Field((_type) => String, { nullable: true })
  countryId?: string | null;

  @Field((_type) => String, { nullable: true })
  establishedTypeId?: string | null;

  @Field((_type) => String, { nullable: true })
  hoAddress?: string | null;

  @Field((_type) => String, { nullable: true })
  hoLocation?: string | null;

  @Field((_type) => CompanyStatus, { nullable: true })
  isActive?: CompanyStatus;

  @Field((_type) => Number, { defaultValue: 0 })
  numberOfBranches: number;

  @Field((_type) => String, { nullable: true })
  logo?: string | null;
}

