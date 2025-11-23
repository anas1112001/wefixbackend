import { Field, ID, ObjectType } from 'type-graphql';
import { Branch } from '../../../../Branch/typedefs/Branch/schema/Branch.schema';

@ObjectType({
  description: 'Zone entity',
})
export class Zone {
  @Field((_type) => ID!)
  public id: string;

  @Field((_type) => String!)
  public zoneTitle: string;

  @Field((_type) => String, { nullable: true })
  public zoneNumber: string | null;

  @Field((_type) => String, { nullable: true })
  public zoneDescription: string | null;

  @Field((_type) => Branch!)
  public branch: Branch;

  @Field((_type) => Boolean!)
  public isActive: boolean;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

