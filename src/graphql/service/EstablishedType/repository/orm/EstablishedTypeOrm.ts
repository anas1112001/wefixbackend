import { EstablishedType } from '../../../../../db/models/established-type.model';

export class EstablishedTypeOrm {
  public async findAll(options?: any): Promise<EstablishedType[]> {
    return EstablishedType.findAll(options);
  }

  public async findByPk(id: string): Promise<EstablishedType | null> {
    return EstablishedType.findByPk(id);
  }
}

