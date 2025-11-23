import { TeamLeader } from '../../../../db/models/team-leader.model';
import { TeamLeaderOrm } from './orm/TeamLeaderOrm';

export default class TeamLeaderRepository {
  private teamLeaderOrm: TeamLeaderOrm;

  constructor() {
    this.teamLeaderOrm = new TeamLeaderOrm();
  }

  public async getTeamLeaders(): Promise<TeamLeader[]> {
    return this.teamLeaderOrm.findAll({ where: { isActive: true }, order: [['name', 'ASC']] });
  }

  public async getTeamLeaderById(id: string): Promise<TeamLeader | null> {
    return this.teamLeaderOrm.findByPk(id);
  }
}

