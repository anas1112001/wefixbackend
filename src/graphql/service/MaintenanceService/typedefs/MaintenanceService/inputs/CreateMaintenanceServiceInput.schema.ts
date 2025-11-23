import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Input data for creating a maintenance service' })
export class CreateMaintenanceServiceInput {
  @Field((_type) => String!)
  companyId: string;

  @Field((_type) => String!)
  mainServiceId: string;

  @Field((_type) => String!)
  subServiceId: string;

  @Field((_type) => Boolean, { defaultValue: true })
  isActive?: boolean;
}

