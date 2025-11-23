import { DataTypes, UUIDV4 } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate } from '../../lib';
import { Company } from './company.model';
import { MainService } from './main-service.model';
import { SubService } from './sub-service.model';

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

  @ForeignKey(() => MainService)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  public mainServiceId: string;

  @BelongsTo(() => MainService, { foreignKey: 'mainServiceId', as: 'mainService' })
  public mainService: MainService;

  @ForeignKey(() => SubService)
  @Column({
    allowNull: false,
    type: DataTypes.UUID,
  })
  public subServiceId: string;

  @BelongsTo(() => SubService, { foreignKey: 'subServiceId', as: 'subService' })
  public subService: SubService;

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
}

