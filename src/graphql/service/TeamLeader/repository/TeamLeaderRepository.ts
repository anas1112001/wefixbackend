import { Lookup, LookupCategory } from '../../../../db/models/lookup.model';
import { TeamLeaderOrm } from './orm/TeamLeaderOrm';

export default class TeamLeaderRepository {
  private teamLeaderOrm: TeamLeaderOrm;

  constructor() {
    this.teamLeaderOrm = new TeamLeaderOrm();
  }

  public async getTeamLeaders(): Promise<Lookup[]> {
    // Get USER_ROLE with code 'TEAMLEADER' instead of TEAM_LEADER category
    return this.teamLeaderOrm.findAll({ where: { category: LookupCategory.USER_ROLE, code: 'TEAMLEADER', isActive: true }, order: [['name', 'ASC']] });
  }

  public async getTeamLeaderById(id: string): Promise<Lookup | null> {
    return this.teamLeaderOrm.findByPk(id);
  }
}

