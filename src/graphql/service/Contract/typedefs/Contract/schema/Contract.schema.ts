import { Field, ID, ObjectType } from 'type-graphql';
import { ContractStatus } from '../enums/Contract.enums';
import { Company } from '../../../../Company/typedefs/Company/schema/Company.schema';
import { LookupType } from '../../../../Lookup/typedefs/Lookup/schema/Lookup.schema';

@ObjectType({
  description: 'Contract entity',
})
export class Contract {
  @Field((_type) => ID!)
  public id: string;

  @Field((_type) => String!)
  public contractReference: string;

  @Field((_type) => String!)
  public contractTitle: string;

  @Field((_type) => Company!)
  public company: Company;

  @Field((_type) => LookupType!)
  public businessModelLookup: LookupType;

  @Field((_type) => Boolean!)
  public isActive: boolean;

  @Field((_type) => Number!)
  public numberOfTeamLeaders: number;

  @Field((_type) => Number!)
  public numberOfBranches: number;

  @Field((_type) => Number!)
  public numberOfPreventiveTickets: number;

  @Field((_type) => Number!)
  public numberOfCorrectiveTickets: number;

  @Field((_type) => Date, { nullable: true })
  public contractStartDate: Date | null;

  @Field((_type) => Date, { nullable: true })
  public contractEndDate: Date | null;

  @Field((_type) => Number, { nullable: true })
  public contractValue: number | null;

  @Field((_type) => String, { nullable: true })
  public contractFiles: string | null;

  @Field((_type) => String, { nullable: true })
  public contractDescription: string | null;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

