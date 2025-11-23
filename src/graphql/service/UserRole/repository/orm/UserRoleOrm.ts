import { UserRole } from '../../../../../db/models/user-role.model';

export class UserRoleOrm {
  public async findAll(options?: any): Promise<UserRole[]> {
    return UserRole.findAll(options);
  }

  public async findByPk(id: string): Promise<UserRole | null> {
    return UserRole.findByPk(id);
  }
}

