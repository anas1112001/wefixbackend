import { Lookup, LookupCategory as ModelLookupCategory } from '../../../../db/models/lookup.model';
import { LookupCategory } from '../typedefs/Lookup/enums/Lookup.enums';
import { LookupOrm } from './orm/LookupOrm';

export default class LookupRepository {
  private lookupOrm: LookupOrm;

  constructor() {
    this.lookupOrm = new LookupOrm();
  }

  public async getLookupsByCategory(category: LookupCategory): Promise<Lookup[]> {
    // GraphQL enum value (e.g., LookupCategory.COUNTRY = 'Country') matches model enum value
    // Both enums have the same string values, so we can use it directly
    const modelCategory = category as unknown as ModelLookupCategory;
    
    return this.lookupOrm.findAll({
      where: { category: modelCategory, isActive: true },
      order: [['orderId', 'ASC'], ['name', 'ASC']],
    });
  }

  public async getLookupById(id: string): Promise<Lookup | null> {
    return this.lookupOrm.findByPk(id);
  }

  public async getAllLookups(): Promise<Lookup[]> {
    return this.lookupOrm.findAll({
      where: { isActive: true },
      order: [['category', 'ASC'], ['orderId', 'ASC'], ['name', 'ASC']],
    });
  }
}

