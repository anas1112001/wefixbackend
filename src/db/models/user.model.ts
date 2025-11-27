import { DataTypes, UUIDV4 } from 'sequelize'
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript'

import { getDate, getIsoTimestamp, getUserFullName, setDate, toLowerCase } from '../../lib'
import { Company } from './company.model'
import { Lookup } from './lookup.model'

@Table({
  modelName: 'User',
  tableName: 'users',
  underscored: true,
})

export class User extends Model {

  @Column({
    allowNull: false,
    defaultValue: UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  })
  public id: string
  
  @Column({
    allowNull: false,
    set: toLowerCase('userNumber'),
    type: DataTypes.STRING(10),
    unique: true,
  })
  
  public userNumber: string

  @Column({
    allowNull: false,
    set: toLowerCase('firstName'),
    type: DataTypes.STRING(128),
  })
  public firstName: string

  @Column({
    allowNull: false,
    set: toLowerCase('lastName'),
    type: DataTypes.STRING(128),
  })
  public lastName: string

  @Column({
    comment: 'User full name',
    get: getUserFullName,
    type: DataTypes.VIRTUAL,
  })
  public fullName: string


  @Column({
    allowNull: false,
    set: toLowerCase('email'),
    type: DataTypes.STRING(128),
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  public email: string


  @Column({
    allowNull: false,
    set: toLowerCase('deviceId'),
    type: DataTypes.STRING(128),
    unique: false,
  })
  public deviceId: string

  @Column({
    allowNull: false,
    type: DataTypes.STRING(),
    unique: false,
  })
  public fcmToken: string

  @Column({
    allowNull: false,
    type: DataTypes.STRING, 
  })
  public password: string;
  
  @Column({
    allowNull: true,
    comment: 'Mobile phone number for password recovery',
    type: DataTypes.STRING(15),
  })
  public mobileNumber: string | null

  @ForeignKey(() => Lookup)
  @Column({
    allowNull: false,
    comment: 'User Role lookup reference',
    type: DataTypes.UUID,
  })
  public userRoleId: string

  @BelongsTo(() => Lookup, { foreignKey: 'userRoleId', as: 'userRoleLookup' })
  public userRoleLookup: Lookup

  @ForeignKey(() => Company)
  @Column({
    allowNull: true,
    type: DataTypes.UUID,
  })
  public companyId: string | null

  @BelongsTo(() => Company, { foreignKey: 'companyId', as: 'company' })
  public company?: Company | null


  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'User created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'User updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    comment: 'User who created this record',
    type: DataTypes.UUID,
  })
  public createdBy: string | null

  @BelongsTo(() => User, { foreignKey: 'createdBy', as: 'creator' })
  public creator?: User | null

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    comment: 'User who last updated this record',
    type: DataTypes.UUID,
  })
  public updatedBy: string | null

  @BelongsTo(() => User, { foreignKey: 'updatedBy', as: 'updater' })
  public updater?: User | null

  @Column({
    allowNull: true,
    comment: 'DateTime when record was deleted',
    get: getDate('deletedAt'),
    set: setDate('deletedAt'),
    type: DataTypes.DATE,
  })
  public deletedAt: Date | null

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    comment: 'User who deleted this record',
    type: DataTypes.UUID,
  })
  public deletedBy: string | null

  @BelongsTo(() => User, { foreignKey: 'deletedBy', as: 'deleter' })
  public deleter?: User | null

  @Column({
    allowNull: false,
    comment: 'Whether the record is active',
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  })
  public isActive: boolean

  @Column({
    allowNull: false,
    comment: 'Whether the record is deleted (soft delete)',
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  })
  public isDeleted: boolean
}
