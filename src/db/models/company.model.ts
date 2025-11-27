import { DataTypes, UUIDV4 } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate, toLowerCase } from '../../lib';
import { CompanyStatus } from '../../graphql/service/Company/typedefs/Company/enums/Company.enums';
import { Lookup } from './lookup.model';
import { User } from './user.model';

@Table({
  modelName: 'Company',
  tableName: 'companies',
  underscored: true,
})
export class Company extends Model {
  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING(20),
    unique: true,
  })
  public companyId: string;

  @Column({
    allowNull: false,
    set: toLowerCase('title'),
    type: DataTypes.STRING(100),
  })
  public title: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  public companyNameArabic: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  public companyNameEnglish: string | null;

  @ForeignKey(() => Lookup)
  @Column({
    allowNull: true,
    type: DataTypes.UUID,
  })
  public countryLookupId: string | null;

  @BelongsTo(() => Lookup, { foreignKey: 'countryLookupId', as: 'countryLookup' })
  public countryLookup: Lookup;

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  public hoAddress: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  public hoLocation: string | null;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(10),
    unique: true,
  })
  public ticketShortCode: string | null;

  @Column({
    allowNull: false,
    defaultValue: CompanyStatus.ACTIVE,
    type: DataTypes.ENUM({ values: Object.values(CompanyStatus) }),
  })
  public isActive: CompanyStatus;

  @Column({
    allowNull: true,
    type: DataTypes.TEXT,
  })
  public logo: string | null;

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'Company created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'Company updated DateTime',
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
    comment: 'Whether the record is active (auditing)',
    defaultValue: true,
    field: 'is_active_audit',
    type: DataTypes.BOOLEAN,
  })
  public isActiveAudit: boolean;

  @Column({
    allowNull: false,
    comment: 'Whether the record is deleted (soft delete)',
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  })
  public isDeleted: boolean;
}

