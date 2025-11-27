import { Model } from 'sequelize-typescript'
import { Lookup } from '../../../../../db/models/lookup.model'

export declare class UserOrm extends Model {
  deviceId: string
  email: string
  firstName: string
  fullName: string
  id: string
  lastName: string
  mobileNumber: string | null
  userNumber: string
  password: string
  userRoleId: string
  userRoleLookup?: Lookup
  fcmToken: string
  companyId: string | null
}
