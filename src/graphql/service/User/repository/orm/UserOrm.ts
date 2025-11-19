import { Model } from 'sequelize-typescript'

import { CompanyRoles, UserRoles } from '../../typedefs/User/enums/User.enums'


export declare class UserOrm extends Model {
  deviceId: string
  email: string
  firstName: string
  fullName: string
  id: string
  lastName: string
  userNumber: string
  password: string
  userRole: UserRoles
  companyRole: CompanyRoles | null
  fcmToken: string
}
