import { Lookup, LookupCategory } from '../../../../db/models/lookup.model';

export default class CountryRepository {
  public async getCountries(): Promise<Lookup[]> {
    return Lookup.findAll({
      where: {
        category: LookupCategory.COUNTRY,
        isActive: true,
      },
      order: [['orderId', 'ASC'], ['name', 'ASC']],
    });
  }

  public async getCountryById(id: string): Promise<Lookup | null> {
    return Lookup.findOne({
      where: {
        id,
        category: LookupCategory.COUNTRY,
        isActive: true,
      },
    });
  }
}

