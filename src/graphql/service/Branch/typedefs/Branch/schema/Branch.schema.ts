import { Field, ID, ObjectType } from 'type-graphql';
import { Company } from '../../../../Company/typedefs/Company/schema/Company.schema';
import { LookupType } from '../../../../Lookup/typedefs/Lookup/schema/Lookup.schema';

@ObjectType({
  description: 'Branch entity',
})
export class Branch {
  @Field((_type) => ID!)
  public id: string;

  @Field((_type) => String!)
  public branchTitle: string;

  @Field((_type) => String, { nullable: true })
  public branchNameArabic: string | null;

  @Field((_type) => String, { nullable: true })
  public branchNameEnglish: string | null;

  @Field((_type) => String, { nullable: true })
  public branchRepresentativeName: string | null;

  @Field((_type) => String, { nullable: true })
  public representativeMobileNumber: string | null;

  @Field((_type) => String, { nullable: true })
  public representativeEmailAddress: string | null;

  @Field((_type) => Company!)
  public company: Company;

  @Field((_type) => LookupType, { nullable: true })
  public teamLeaderLookup: LookupType | null;

  @Field((_type) => Boolean!)
  public isActive: boolean;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

