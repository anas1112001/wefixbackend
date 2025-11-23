import { DataTypes, UUIDV4 } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate } from '../../lib';
import { Branch } from './branch.model';

@Table({
  modelName: 'Zone',
  tableName: 'zones',
  underscored: true,
})
export class Zone extends Model {
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(100),
  })
  public zoneTitle: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(50),
  })
  public zoneNumber: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  public zoneDescription: string | null;

  @ForeignKey(() => Branch)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  public branchId: string;

  @BelongsTo(() => Branch, { foreignKey: 'branchId', as: 'branch' })
  public branch: Branch;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  })
  public isActive: boolean;

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'Zone created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'Zone updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date;
}

