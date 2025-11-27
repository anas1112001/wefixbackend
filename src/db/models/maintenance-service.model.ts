import { DataTypes, UUIDV4 } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate } from '../../lib';
import { Company } from './company.model';
import { Lookup } from './lookup.model';
import { User } from './user.model';

@Table({
  modelName: 'MaintenanceService',
  tableName: 'maintenance_services',
  underscored: true,
})
export class MaintenanceService extends Model {
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string;

  @ForeignKey(() => Company)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  public companyId: string;

  @BelongsTo(() => Company, { foreignKey: 'companyId', as: 'company' })
  public company: Company;

  @ForeignKey(() => Lookup)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  public mainServiceId: string;

  @BelongsTo(() => Lookup, { foreignKey: 'mainServiceId', as: 'mainService' })
  public mainService: Lookup;

  @ForeignKey(() => Lookup)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  public subServiceId: string;

  @BelongsTo(() => Lookup, { foreignKey: 'subServiceId', as: 'subService' })
  public subService: Lookup;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  })
  public isActive: boolean;

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'MaintenanceService created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'MaintenanceService updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    comment: 'User who created this record',
    type: DataTypes.UUID,
  })
  public createdBy: string | null;

  @BelongsTo(() => User, { foreignKey: 'createdBy', as: 'creator' })
  public creator?: User | null;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    comment: 'User who last updated this record',
    type: DataTypes.UUID,
  })
  public updatedBy: string | null;

  @BelongsTo(() => User, { foreignKey: 'updatedBy', as: 'updater' })
  public updater?: User | null;

  @Column({
    allowNull: true,
    comment: 'DateTime when record was deleted',
    get: getDate('deletedAt'),
    set: setDate('deletedAt'),
    type: DataTypes.DATE,
  })
  public deletedAt: Date | null;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    comment: 'User who deleted this record',
    type: DataTypes.UUID,
  })
  public deletedBy: string | null;

  @BelongsTo(() => User, { foreignKey: 'deletedBy', as: 'deleter' })
  public deleter?: User | null;

  @Column({
    allowNull: false,
    comment: 'Whether the record is deleted (soft delete)',
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  })
  public isDeleted: boolean;
}

