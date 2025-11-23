import { Country } from '../../../../db/models/country.model';
import { CountryOrm } from './orm/CountryOrm';

export default class CountryRepository {
  private countryOrm: CountryOrm;

  constructor() {
    this.countryOrm = new CountryOrm();
  }

  public async getCountries(): Promise<Country[]> {
    return this.countryOrm.findAll({ where: { isActive: true }, order: [['name', 'ASC']] });
  }

  public async getCountryById(id: string): Promise<Country | null> {
    return this.countryOrm.findByPk(id);
  }
}

