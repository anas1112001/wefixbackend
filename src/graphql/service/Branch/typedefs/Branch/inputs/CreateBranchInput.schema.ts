import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Input data for creating a branch' })
export class CreateBranchInput {
  @Field((_type) => String!)
  branchTitle: string;

  @Field((_type) => String, { nullable: true })
  branchNameArabic?: string | null;

  @Field((_type) => String, { nullable: true })
  branchNameEnglish?: string | null;

  @Field((_type) => String, { nullable: true })
  branchRepresentativeName?: string | null;

  @Field((_type) => String, { nullable: true })
  representativeMobileNumber?: string | null;

  @Field((_type) => String, { nullable: true })
  representativeEmailAddress?: string | null;

  @Field((_type) => String!)
  companyId: string;

  @Field((_type) => String, { nullable: true })
  teamLeaderLookupId?: string | null;

  @Field((_type) => Boolean, { defaultValue: true })
  isActive?: boolean;
}

