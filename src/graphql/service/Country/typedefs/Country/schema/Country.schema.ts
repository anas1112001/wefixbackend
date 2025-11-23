import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Country lookup table' })
export class CountryType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  code?: string | null;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

