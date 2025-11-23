import { DataTypes, UUIDV4 } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, setDate, toLowerCase } from '../../lib';
import { CompanyStatus, EstablishedType } from '../../graphql/service/Company/typedefs/Company/enums/Company.enums';

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
    allowNull: false,
    defaultValue: CompanyStatus.ACTIVE,
    type: DataTypes.ENUM({ values: Object.values(CompanyStatus) }),
  })
  public isActive: CompanyStatus;

  @Column({
    allowNull: false,
    type: DataTypes.ENUM({ values: Object.values(EstablishedType) }),
  })
  public establishedType: EstablishedType;

  @Column({
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  })
  public numberOfBranches: number;

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
}

