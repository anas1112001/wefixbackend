import { DataTypes, UUIDV4 } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate } from '../../lib';
import { Company } from './company.model';
import { Lookup } from './lookup.model';

@Table({
  modelName: 'Contract',
  tableName: 'contracts',
  underscored: true,
})
export class Contract extends Model {
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(50),
    unique: true,
  })
  public contractReference: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(200),
  })
  public contractTitle: string;

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
  public businessModelLookupId: string;

  @BelongsTo(() => Lookup, { foreignKey: 'businessModelLookupId', as: 'businessModelLookup' })
  public businessModelLookup: Lookup;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  })
  public isActive: boolean;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  })
  public numberOfTeamLeaders: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  })
  public numberOfBranches: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  })
  public numberOfPreventiveTickets: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  })
  public numberOfCorrectiveTickets: number;

  @Column({
    allowNull: true,
    get: getDate('contractStartDate'),
    set: setDate('contractStartDate'),
    type: DataTypes.DATE,
  })
  public contractStartDate: Date | null;

  @Column({
    allowNull: true,
    get: getDate('contractEndDate'),
    set: setDate('contractEndDate'),
    type: DataTypes.DATE,
  })
  public contractEndDate: Date | null;

  @Column({
    allowNull: true,
    type: DataTypes.DECIMAL(15, 2),
  })
  public contractValue: number | null;

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  public contractFiles: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  public contractDescription: string | null;

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'Contract created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'Contract updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date;
}

