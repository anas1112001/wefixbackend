import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'EstablishedType lookup table' })
export class EstablishedTypeType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  nameArabic?: string | null;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

