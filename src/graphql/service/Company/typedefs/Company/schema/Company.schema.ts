import { Field, ID, ObjectType } from 'type-graphql';
import { CompanyStatus, EstablishedType } from '../../enums/Company.enums';

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

  @Field((_type) => CompanyStatus!)
  public isActive: CompanyStatus;

  @Field((_type) => EstablishedType!)
  public establishedType: EstablishedType;

  @Field((_type) => Number!)
  public numberOfBranches: number;

  @Field((_type) => String, { nullable: true })
  public logo: string | null;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

