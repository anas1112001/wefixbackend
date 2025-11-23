import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'TeamLeader lookup table' })
export class TeamLeaderType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  nameArabic?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

