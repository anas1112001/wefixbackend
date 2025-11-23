import { EstablishedType } from '../../../../db/models/established-type.model';
import { EstablishedTypeOrm } from './orm/EstablishedTypeOrm';

export default class EstablishedTypeRepository {
  private establishedTypeOrm: EstablishedTypeOrm;

  constructor() {
    this.establishedTypeOrm = new EstablishedTypeOrm();
  }

  public async getEstablishedTypes(): Promise<EstablishedType[]> {
    return this.establishedTypeOrm.findAll({ where: { isActive: true }, order: [['name', 'ASC']] });
  }

  public async getEstablishedTypeById(id: string): Promise<EstablishedType | null> {
    return this.establishedTypeOrm.findByPk(id);
  }
}

