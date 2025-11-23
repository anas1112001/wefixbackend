import { Lookup } from '../../../../../db/models/lookup.model';

export class LookupOrm {
  public async findAll(options?: any): Promise<Lookup[]> {
    return Lookup.findAll(options);
  }

  public async findByPk(id: string): Promise<Lookup | null> {
    return Lookup.findByPk(id);
  }
}

