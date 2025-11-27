import { Lookup, LookupCategory } from '../../../../db/models/lookup.model';

export default class UserRoleRepository {
  public async getUserRoles(): Promise<Lookup[]> {
    return Lookup.findAll({
      where: {
        category: LookupCategory.USER_ROLE,
        isActive: true,
      },
      order: [['orderId', 'ASC'], ['name', 'ASC']],
    });
  }

  public async getUserRoleById(id: string): Promise<Lookup | null> {
    return Lookup.findOne({
      where: {
        id,
        category: LookupCategory.USER_ROLE,
        isActive: true,
      },
    });
  }
}

