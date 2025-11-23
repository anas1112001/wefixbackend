import { ApolloError } from 'apollo-server-express';
import { Zone } from '../../../../db/models/zone.model';
import { Branch } from '../../../../db/models/branch.model';
import { CreateZoneInput } from '../typedefs/Zone/inputs/CreateZoneInput.schema';
import { ZoneOrm } from './orm/ZoneOrm';

class ZoneRepository {
  public createZone: (zoneData: CreateZoneInput) => Promise<ZoneOrm>;
  public getZoneById: (id: string) => Promise<ZoneOrm | null>;
  public getZonesByBranchId: (branchId: string) => Promise<ZoneOrm[]>;
  public deleteZoneById: (id: string) => Promise<boolean>;

  constructor() {
    this.createZone = this._createZone.bind(this);
    this.getZoneById = this._getZoneById.bind(this);
    this.getZonesByBranchId = this._getZonesByBranchId.bind(this);
    this.deleteZoneById = this._deleteZoneById.bind(this);
  }

  private async _createZone(zoneData: CreateZoneInput): Promise<ZoneOrm> {
    try {
      const newZone = await Zone.create({
        zoneTitle: zoneData.zoneTitle,
        zoneNumber: zoneData.zoneNumber || null,
        zoneDescription: zoneData.zoneDescription || null,
        branchId: zoneData.branchId,
        isActive: zoneData.isActive !== undefined ? zoneData.isActive : true,
      } as any);
      
      return await this._getZoneById(newZone.id) || newZone;
    } catch (error) {
      throw new ApolloError(`Failed to create zone: ${error.message}`, 'ZONE_CREATION_FAILED');
    }
  }

  private async _getZoneById(id: string): Promise<ZoneOrm | null> {
    try {
      const zone = await Zone.findOne({
        include: [
          { model: Branch, as: 'branch' },
        ],
        where: { id },
      });
      return zone;
    } catch (error) {
      throw new ApolloError(`Failed to get zone: ${error.message}`, 'ZONE_RETRIEVAL_FAILED');
    }
  }

  private async _getZonesByBranchId(branchId: string): Promise<ZoneOrm[]> {
    try {
      const zones = await Zone.findAll({
        include: [
          { model: Branch, as: 'branch' },
        ],
        where: { branchId },
        order: [['createdAt', 'DESC']],
      });
      return zones;
    } catch (error) {
      throw new ApolloError(`Failed to get zones: ${error.message}`, 'ZONES_RETRIEVAL_FAILED');
    }
  }

  private async _deleteZoneById(id: string): Promise<boolean> {
    try {
      const deleted = await Zone.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete zone with ID ${id}: ${error.message}`, 'ZONE_DELETION_FAILED');
    }
  }
}

export default ZoneRepository;

