import { Lookup, LookupCategory } from '../../../../db/models/lookup.model';

export default class EstablishedTypeRepository {
  public async getEstablishedTypes(): Promise<Lookup[]> {
    return Lookup.findAll({
      where: {
        category: LookupCategory.ESTABLISHED_TYPE,
        isActive: true,
      },
      order: [['orderId', 'ASC'], ['name', 'ASC']],
    });
  }

  public async getEstablishedTypeById(id: string): Promise<Lookup | null> {
    return Lookup.findOne({
      where: {
        id,
        category: LookupCategory.ESTABLISHED_TYPE,
        isActive: true,
      },
    });
  }
}

