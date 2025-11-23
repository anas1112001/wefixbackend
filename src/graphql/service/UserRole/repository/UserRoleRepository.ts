import { UserRole } from '../../../../db/models/user-role.model';
import { UserRoleOrm } from './orm/UserRoleOrm';

export default class UserRoleRepository {
  private userRoleOrm: UserRoleOrm;

  constructor() {
    this.userRoleOrm = new UserRoleOrm();
  }

  public async getUserRoles(): Promise<UserRole[]> {
    return this.userRoleOrm.findAll({ where: { isActive: true }, order: [['name', 'ASC']] });
  }

  public async getUserRoleById(id: string): Promise<UserRole | null> {
    return this.userRoleOrm.findByPk(id);
  }
}

