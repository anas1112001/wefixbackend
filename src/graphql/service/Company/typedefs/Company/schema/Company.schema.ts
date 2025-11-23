import { Field, ID, ObjectType } from 'type-graphql';
import { CompanyStatus } from '../enums/Company.enums';
import { EstablishedTypeType } from '../../../../EstablishedType/typedefs/EstablishedType/schema/EstablishedType.schema';
import { CountryType } from '../../../../Country/typedefs/Country/schema/Country.schema';

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

  @Field((_type) => CountryType, { nullable: true })
  public country: CountryType | null;

  @Field((_type) => EstablishedTypeType, { nullable: true })
  public establishedType: EstablishedTypeType | null;

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

