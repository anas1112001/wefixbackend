import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Input data for updating a contract' })
export class UpdateContractInput {
  @Field((_type) => String, { nullable: true })
  contractTitle?: string;

  @Field((_type) => String, { nullable: true })
  companyId?: string;

  @Field((_type) => String, { nullable: true })
  businessModelLookupId?: string;

  @Field((_type) => Boolean, { nullable: true })
  isActive?: boolean;

  @Field((_type) => Number, { nullable: true })
  numberOfTeamLeaders?: number;

  @Field((_type) => Number, { nullable: true })
  numberOfBranches?: number;

  @Field((_type) => Number, { nullable: true })
  numberOfPreventiveTickets?: number;

  @Field((_type) => Number, { nullable: true })
  numberOfCorrectiveTickets?: number;

  @Field((_type) => Date, { nullable: true })
  contractStartDate?: Date | null;

  @Field((_type) => Date, { nullable: true })
  contractEndDate?: Date | null;

  @Field((_type) => Number, { nullable: true })
  contractValue?: number | null;

  @Field((_type) => String, { nullable: true })
  contractFiles?: string | null;

  @Field((_type) => String, { nullable: true })
  contractDescription?: string | null;
}

