import { Field, ObjectType } from 'type-graphql';
import { Contract } from '../schema/Contract.schema';

@ObjectType({ description: 'Response data for creating a contract' })
export class CreateContractResponse {
  @Field((_type) => Contract, { nullable: true })
  contract: Contract | null;

  @Field()
  message: string;
}

