import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'MainService entity',
})
export class MainService {
  @Field((_type) => ID!)
  public id: string;

  @Field((_type) => String!)
  public name: string;

  @Field((_type) => String, { nullable: true })
  public nameArabic?: string | null;

  @Field((_type) => String, { nullable: true })
  public code?: string | null;

  @Field((_type) => String, { nullable: true })
  public description?: string | null;

  @Field((_type) => Number!)
  public orderId: number;

  @Field((_type) => Boolean!)
  public isActive: boolean;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

