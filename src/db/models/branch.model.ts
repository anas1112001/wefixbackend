import { DataTypes, UUIDV4 } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate, toLowerCase } from '../../lib';
import { Company } from './company.model';
import { Lookup } from './lookup.model';
import { User } from './user.model';

@Table({
  modelName: 'Branch',
  tableName: 'branches',
  underscored: true,
})
export class Branch extends Model {
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
  public branchTitle: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  public branchNameArabic: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  public branchNameEnglish: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  public branchRepresentativeName: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(20),
  })
  public representativeMobileNumber: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  public representativeEmailAddress: string | null;

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
    allowNull: true,
    type: DataTypes.UUID,
  })
  public teamLeaderLookupId: string | null;

  @BelongsTo(() => Lookup, { foreignKey: 'teamLeaderLookupId', as: 'teamLeaderLookup' })
  public teamLeaderLookup: Lookup;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  })
  public isActive: boolean;

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'Branch created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'Branch updated DateTime',
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

