import { DataTypes, UUIDV4 } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate } from '../../lib';
import { MainService } from './main-service.model';

@Table({
  modelName: 'SubService',
  tableName: 'sub_services',
  underscored: true,
})
export class SubService extends Model {
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

  @ForeignKey(() => MainService)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  public mainServiceId: string;

  @BelongsTo(() => MainService, { foreignKey: 'mainServiceId', as: 'mainService' })
  public mainService: MainService;

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
    comment: 'SubService created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'SubService updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date;
}

