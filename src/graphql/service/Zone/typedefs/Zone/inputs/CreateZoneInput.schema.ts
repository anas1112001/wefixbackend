import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Input data for creating a zone' })
export class CreateZoneInput {
  @Field((_type) => String!)
  zoneTitle: string;

  @Field((_type) => String, { nullable: true })
  zoneNumber?: string | null;

  @Field((_type) => String, { nullable: true })
  zoneDescription?: string | null;

  @Field((_type) => String!)
  branchId: string;

  @Field((_type) => Boolean, { defaultValue: true })
  isActive?: boolean;
}

