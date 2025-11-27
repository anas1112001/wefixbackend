import { Field, InputType } from 'type-graphql';
import { CompanyStatus } from '../enums/Company.enums';

@InputType({ description: 'Input data for updating a company' })
export class UpdateCompanyInput {
  @Field({ nullable: true })
  title?: string;

  @Field((_type) => String, { nullable: true })
  companyNameArabic?: string | null;

  @Field((_type) => String, { nullable: true })
  companyNameEnglish?: string | null;

  @Field((_type) => String, { nullable: true })
  countryLookupId?: string | null;

  @Field((_type) => String, { nullable: true })
  hoAddress?: string | null;

  @Field((_type) => String, { nullable: true })
  hoLocation?: string | null;

  @Field((_type) => String, { nullable: true })
  ticketShortCode?: string | null;

  @Field((_type) => CompanyStatus, { nullable: true })
  isActive?: CompanyStatus;

  @Field((_type) => String, { nullable: true })
  logo?: string | null;
}

