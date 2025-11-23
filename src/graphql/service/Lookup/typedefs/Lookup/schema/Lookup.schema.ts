import { Field, ObjectType } from 'type-graphql';
import { LookupCategory } from '../enums/Lookup.enums';

@ObjectType({ description: 'Unified Lookup table' })
export class LookupType {
  @Field()
  id: string;

  @Field((_type) => String)
  category: LookupCategory;

  @Field()
  name: string;

  @Field({ nullable: true })
  nameArabic?: string | null;

  @Field({ nullable: true })
  code?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field()
  orderId: number;

  @Field()
  isDefault: boolean;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  parentLookupId?: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

