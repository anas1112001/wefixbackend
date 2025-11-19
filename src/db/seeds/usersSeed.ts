import { CompanyRoles, UserRoles } from '../../graphql/service/User/typedefs/User/enums/User.enums';


const USER_ID_JAD = 'd0b3042a-e75d-43af-97e5-b6455a11bee8';
const USER_ID_JEHAD = '24967689-821c-4003-afb4-564fc89171c8';
const USER_ID_EMAD = '0913932f-0b7b-4dfd-a116-2d054db17bbb';
const USER_ID_SUPERADMIN = 'd77f057d-b350-46f6-bfae-1b3cd8240a6e';
const USER_ID_TECHNICIAN = '6b15d58f-05c2-4c66-8d75-7154040a4bfb';

const fcmDoctorToken = 'cV00j5FkTT-5Fdfe-I0BJT:APA91bFyHALCDXlJCfKNDqAlE9iLg5LHDuHZvpAQj-MnPqICA5xELAySa1aTAK9Tu0Wpd0lUdThEi-zbnBMxIVFzowSmaHtyd_c6O6OAOSZqNWJEbmmXQwFKuCRsh09nAfwQKppdkeFV'
const fcmStudentToken = 'dZ3rv3gWSn-4a8Gqrh_IMr:APA91bHnc3MKCyjWGcV20pqci72cu4CwsUk3QjPjVniF4khSTCJKKCeaHde0GRrL3VPHBLbm5b2Rxk31zvbu3nisSA8-dd8-d-qCNsGd50KIHSLUI18hpnxYjnJurBREigfg3KJ88xPU'
const anotherfcmStudentToken = 'eVTW8uBURTmVjkiXfGSOsB:APA91bFZm2iNTX_RpVC5rdjy3r9h8WQzE84TXhekqChngnoRr_WaEpUTgw8TFTL01mecNB-um3rGs78kdnzpUNE_mu8sv-0BhzCydQ1z09LrUFhf2MgjjVZPwZnvwfbP9XjLt5wZoshD';
export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userNumber: string;
  password: string;
  userRole: UserRoles;
  companyRole: CompanyRoles | null;
  deviceId: string;
  fcmToken: string;
}

export const USER_DATA: readonly UserData[] = [
  {
    deviceId: 'UP1A.231105.015',
    email: 'jadabuawwad@outlook.com',
    fcmToken: fcmStudentToken,
    firstName: 'Jad',
    id: USER_ID_JAD,
    lastName: 'Abu Awwad',
    password: '$2a$12$Fk4mbwkI3.yAPqWmo8atZuKxl0KhEhPNXdANvHkDifPz5M/PBqqBi',
    userNumber: '9971035541',
    userRole: UserRoles.INDIVIDUAL,
    companyRole: CompanyRoles.CLIENT,
  },
  {
    deviceId: 'UP1A.231105.004',
    email: 'jehadabuawwad@outlook.com',
    fcmToken: fcmDoctorToken,
    firstName: 'Jehad',
    id: USER_ID_JEHAD,
    lastName: 'Abu Awwad',
    password: '$2a$12$Fk4mbwkI3.yAPqWmo8atZuKxl0KhEhPNXdANvHkDifPz5M/PBqqBi',
    userNumber: '9971035542',
    userRole: UserRoles.COMPANY,
    companyRole: CompanyRoles.COMPANY_ADMIN,
  },
  {
    deviceId: 'UP1A.231105.007',
    email: 'emadabuawwad@outlook.com',
    fcmToken: anotherfcmStudentToken,
    firstName: 'Emad',
    id: USER_ID_EMAD,
    lastName: 'Abu Awwad',
    password: '$2a$12$Fk4mbwkI3.yAPqWmo8atZuKxl0KhEhPNXdANvHkDifPz5M/PBqqBi',
    userNumber: '9971035543',
    userRole: UserRoles.COMPANY,
    companyRole: CompanyRoles.TEAM_LEADER,
  },
  {
    deviceId: 'UP1A.231105.010',
    email: 'technician@wefix.com',
    fcmToken: 'tech-fcm-token',
    firstName: 'Tech',
    id: USER_ID_TECHNICIAN,
    lastName: 'Agent',
    password: '$2a$12$Fk4mbwkI3.yAPqWmo8atZuKxl0KhEhPNXdANvHkDifPz5M/PBqqBi',
    userNumber: '9971035544',
    userRole: UserRoles.COMPANY,
    companyRole: CompanyRoles.TECHNICIAN,
  },
  {
    deviceId: 'WEB-001',
    email: 'superadmin@wefix.com',
    fcmToken: 'web-superadmin-fcm-token',
    firstName: 'Super',
    id: USER_ID_SUPERADMIN,
    lastName: 'Admin',
    password: '$2b$12$xhjxblKjcE9ZP67A7b5r.uTuwZf/GgM.ZSgBp8Fdh3/W7Ke66HYkW',
    userNumber: 'superadmin',
    userRole: UserRoles.SUPER_ADMIN,
    companyRole: null,
  },
];


