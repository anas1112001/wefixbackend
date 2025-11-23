import { ApolloError } from 'apollo-server-express';
import { Ctx, Query, Resolver } from 'type-graphql';
import TeamLeaderRepository from '../repository/TeamLeaderRepository';
import { TeamLeaderType } from '../typedefs/TeamLeader/schema/TeamLeader.schema';
import { SharedContext } from '../../../shared/context/SharedContext';

@Resolver()
export class TeamLeaderResolver {
  @Query(() => [TeamLeaderType], { description: 'Get all active team leaders' })
  public async getTeamLeaders(@Ctx() { services }: SharedContext): Promise<TeamLeaderType[]> {
    try {
      return await services.teamLeaderRepository.getTeamLeaders();
    } catch (error) {
      throw new ApolloError(`Error retrieving team leaders: ${error.message}`, 'TEAM_LEADERS_QUERY_ERROR');
    }
  }
}

