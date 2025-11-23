import { Country } from '../../../../../db/models/country.model';

export class CountryOrm {
  public async findAll(options?: any): Promise<Country[]> {
    return Country.findAll(options);
  }

  public async findByPk(id: string): Promise<Country | null> {
    return Country.findByPk(id);
  }
}

