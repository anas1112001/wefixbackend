import { Field, ID, ObjectType } from 'type-graphql';
import { CompanyStatus } from '../enums/Company.enums';
import { LookupType } from '../../../../Lookup/typedefs/Lookup/schema/Lookup.schema';

@ObjectType({
  description: 'Company entity',
})
export class Company {
  @Field((_type) => ID!)
  public id: string;

  @Field((_type) => String!)
  public companyId: string;

  @Field((_type) => String!)
  public title: string;

  @Field((_type) => String, { nullable: true })
  public companyNameArabic: string | null;

  @Field((_type) => String, { nullable: true })
  public companyNameEnglish: string | null;

  @Field((_type) => LookupType, { nullable: true })
  public countryLookup: LookupType | null;

  @Field((_type) => LookupType, { nullable: true })
  public establishedTypeLookup: LookupType | null;

  @Field((_type) => String, { nullable: true })
  public hoAddress: string | null;

  @Field((_type) => String, { nullable: true })
  public hoLocation: string | null;

  @Field((_type) => CompanyStatus!)
  public isActive: CompanyStatus;

  @Field((_type) => Number!)
  public numberOfBranches: number;

  @Field((_type) => String, { nullable: true })
  public logo: string | null;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

