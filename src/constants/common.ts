import { DropdownOptions } from "@/interfaces/common";
import { getCookie, getCookies } from "cookies-next";

export const TOKEN_KEY = "TOKEN_KEY";
export const USER_VERIFY = "USER_VERIFY";
export const USER_TYPE = "USER_TYPE";
export const USER_INFO = "USER_INFO";
export const LOGIN_BODY = "LOGIN_BODY";
export const DEFAULT_CONTENT_TYPE = 'application/json';
export const EMPLOYEE_ID = "EMPLOYEE_ID";
export const LEADER_ID = "LEADER_ID";
export const TAB_ACCESS = "TAB_ACCESS";



export const Savedby = () => {
  let userDetails: any = getCookie(USER_INFO);
  userDetails = userDetails && JSON.parse(userDetails);
  let allcookies: any = getCookies();
  var leaderid = {
    "saved_by_type": 'leader',
    "saved_by": userDetails?.leaderId
  }
  var employeeid = {
    "saved_by_type": "employee",
    "saved_by": userDetails?.employeeId
  }

  return allcookies?.USER_TYPE == "leader" ? leaderid : employeeid
}



export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error'
};

export const EducationDropdowns: DropdownOptions[] = [
  { id: 'below 10th', value: 'below 10th' },
  { id: '10th pass', value: '10th pass' },
  { id: '12th pass', value: '12th pass' },
  { id: 'under graduate', value: 'under graduate' },
  { id: 'post graduate', value: 'post graduate' },
  { id: 'p.h.d', value: 'p.h.d' },
  { id: 'certificate', value: 'certificate' },
  { id: 'others', value: 'others' }
];

export const statusticketOption: DropdownOptions[] = [
  { id: 'read', value: 'read' },
  { id: 'under process', value: 'under process' },
  { id: 'declined', value: 'declined' },
  { id: 'forwarded', value: 'forwarded' },
  { id: 'response generated', value: 'response generated' },
  { id: 'closed', value: 'closed' },
]


export const GenderDropdowns: DropdownOptions[] = [
  { id: 'male', value: 'male' },
  { id: 'female', value: 'female' },
  { id: 'others', value: 'others' },
];

export const MaritalStatusDropdowns: DropdownOptions[] = [
  { id: 'Married', value: 'married' },
  { id: 'Unmarried', value: 'unmarried' },
  { id: 'Divorced', value: 'divorced' }
];

export const Tickettype: DropdownOptions[] = [
  { id: 'suggestion', value: 'suggestion' },
  { id: 'request', value: 'request' },
  { id: 'complaint', value: 'complaint' }
];