import { DataTypes, UUIDV4 } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate } from '../../lib';

@Table({
  modelName: 'MainService',
  tableName: 'main_services',
  underscored: true,
})
export class MainService extends Model {
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(200),
  })
  public name: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(200),
  })
  public nameArabic: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(50),
  })
  public code: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  public description: string | null;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  })
  public orderId: number;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  })
  public isActive: boolean;

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'MainService created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'MainService updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date;
}

