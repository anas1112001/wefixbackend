import { DataTypes, UUIDV4 } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { getDate, getIsoTimestamp, getUserFullName, setDate, toLowerCase } from '../../lib';
import { IndividualStatus } from '../../graphql/service/Individual/typedefs/Individual/enums/Individual.enums';

@Table({
  modelName: 'Individual',
  tableName: 'individuals',
  underscored: true,
})
export class Individual extends Model {
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
  public individualId: string;

  @Column({
    allowNull: false,
    set: toLowerCase('firstName'),
    type: DataTypes.STRING(50),
  })
  public firstName: string;

  @Column({
    allowNull: false,
    set: toLowerCase('lastName'),
    type: DataTypes.STRING(50),
  })
  public lastName: string;

  @Column({
    comment: 'Individual full name',
    get: getUserFullName,
    type: DataTypes.VIRTUAL,
  })
  public fullName: string;

  @Column({
    allowNull: false,
    set: toLowerCase('email'),
    type: DataTypes.STRING(100),
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  public email: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(20),
  })
  public phoneNumber: string | null;

  @Column({
    allowNull: false,
    defaultValue: IndividualStatus.ACTIVE,
    type: DataTypes.ENUM({ values: Object.values(IndividualStatus) }),
  })
  public isActive: IndividualStatus;

  @CreatedAt
  @Column({
    allowNull: false,
    comment: 'Individual created DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('createdAt'),
    set: setDate('createdAt'),
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    comment: 'Individual updated DateTime',
    defaultValue: getIsoTimestamp,
    get: getDate('updatedAt'),
    set: setDate('updatedAt'),
    type: DataTypes.DATE,
  })
  public updatedAt: Date;
}

