import { Field, ID, ObjectType } from 'type-graphql';
import { Company } from '../../../../Company/typedefs/Company/schema/Company.schema';
import { MainService } from '../../../../MainService/typedefs/MainService/schema/MainService.schema';
import { SubService } from '../../../../SubService/typedefs/SubService/schema/SubService.schema';

@ObjectType({
  description: 'MaintenanceService entity',
})
export class MaintenanceService {
  @Field((_type) => ID!)
  public id: string;

  @Field((_type) => Company!)
  public company: Company;

  @Field((_type) => MainService!)
  public mainService: MainService;

  @Field((_type) => SubService!)
  public subService: SubService;

  @Field((_type) => Boolean!)
  public isActive: boolean;

  @Field((_type) => Date)
  public createdAt?: Date;

  @Field((_type) => Date)
  public updatedAt?: Date;
}

