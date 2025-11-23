import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Input data for creating a contract' })
export class CreateContractInput {
  @Field((_type) => String!)
  contractTitle: string;

  @Field((_type) => String!)
  companyId: string;

  @Field((_type) => String!)
  businessModelLookupId: string;

  @Field((_type) => Boolean, { defaultValue: true })
  isActive?: boolean;

  @Field((_type) => Number, { defaultValue: 0 })
  numberOfTeamLeaders?: number;

  @Field((_type) => Number, { defaultValue: 0 })
  numberOfBranches?: number;

  @Field((_type) => Number, { defaultValue: 0 })
  numberOfPreventiveTickets?: number;

  @Field((_type) => Number, { defaultValue: 0 })
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

