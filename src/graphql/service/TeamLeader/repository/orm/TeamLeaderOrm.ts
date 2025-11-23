import { TeamLeader } from '../../../../../db/models/team-leader.model';

export class TeamLeaderOrm {
  public async findAll(options?: any): Promise<TeamLeader[]> {
    return TeamLeader.findAll(options);
  }

  public async findByPk(id: string): Promise<TeamLeader | null> {
    return TeamLeader.findByPk(id);
  }
}

