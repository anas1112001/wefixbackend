import "reflect-metadata";
import { registerEnumType } from 'type-graphql'


export enum UserRoles {
  STUDENT = 'Student',
  DOCTOR = 'Doctor',
}


registerEnumType(UserRoles, {
  description: 'Employee position',
  name: 'Positions',
})
