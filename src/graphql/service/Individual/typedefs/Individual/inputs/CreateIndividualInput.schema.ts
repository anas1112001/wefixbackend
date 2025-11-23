import { Field, InputType } from 'type-graphql';
import { IndividualStatus } from '../../enums/Individual.enums';

@InputType({ description: 'Input data for creating an individual' })
export class CreateIndividualInput {
  @Field()
  individualId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field((_type) => String, { nullable: true })
  phoneNumber?: string | null;

  @Field((_type) => IndividualStatus, { defaultValue: IndividualStatus.ACTIVE })
  isActive: IndividualStatus;
}

