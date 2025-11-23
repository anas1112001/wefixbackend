import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import ZoneRepository from '../repository/ZoneRepository';
import { CreateZoneInput } from '../typedefs/Zone/inputs/CreateZoneInput.schema';
import { Zone } from '../typedefs/Zone/schema/Zone.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class ZoneResolver {
  @Query(() => Zone, { nullable: true, description: 'Query a Zone by id' })
  public async getZoneById(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<Zone | null> {
    try {
      const zone = await services.zoneRepository.getZoneById(id);
      return zone as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving zone: ${error.message}`, 'ZONE_QUERY_ERROR');
    }
  }

  @Query(() => [Zone!], { description: 'Query zones by branch id' })
  public async getZonesByBranchId(
    @Arg('branchId') branchId: string,
    @Ctx() { services }: SharedContext
  ): Promise<Zone[]> {
    try {
      const zones = await services.zoneRepository.getZonesByBranchId(branchId);
      return zones as any;
    } catch (error) {
      throw new ApolloError(`Error retrieving zones: ${error.message}`, 'ZONES_QUERY_ERROR');
    }
  }

  @Mutation(() => Zone, { description: 'Create a Zone' })
  public async createZone(
    @Arg('zoneData') zoneData: CreateZoneInput,
    @Ctx() { services }: SharedContext
  ): Promise<Zone> {
    try {
      const zone = await services.zoneRepository.createZone(zoneData);
      return zone as any;
    } catch (error) {
      throw new ApolloError(`Error creating zone: ${error.message}`, 'ZONE_CREATION_ERROR');
    }
  }

  @Mutation(() => Boolean, { description: 'Delete a Zone' })
  public async deleteZone(
    @Arg('id') id: string,
    @Ctx() { services }: SharedContext
  ): Promise<boolean> {
    try {
      const deleted = await services.zoneRepository.deleteZoneById(id);
      if (!deleted) {
        throw new ApolloError('Zone not found', 'ZONE_NOT_FOUND');
      }
      return true;
    } catch (error) {
      throw new ApolloError(`Error deleting zone: ${error.message}`, 'ZONE_DELETION_ERROR');
    }
  }
}

