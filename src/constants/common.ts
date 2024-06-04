import { DropdownOptions } from "@/interfaces/common";
import { getCookie, getCookies } from "cookies-next";

export const TOKEN_KEY = "TOKEN_KEY";
export const USER_VERIFY = "USER_VERIFY";
export const USER_TYPE = "USER_TYPE";
export const USER_INFO = "USER_INFO";
export const LEADER_ID = "LEADER_ID";
export const LOGIN_BODY = "LOGIN_BODY";
export const DEFAULT_CONTENT_TYPE = 'application/json';
export const TAB_ACCESS = "TAB_ACCESS";
export const LEADER_FCM_TOKEN_KEY = "LEADER_FCM_TOKEN_KEY";
export const LEADER_IP = "LEADER_IP";


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
  { id: 'Below 10th', value: 'Below 10th' },
  { id: '10th Pass', value: '10th Pass' },
  { id: '12th paPassss', value: '12th Pass' },
  { id: 'Under Graduate', value: 'Under Graduate' },
  { id: 'Post Graduate', value: 'Post Graduate' },
  { id: 'P.H.D', value: 'P.H.D' },
  { id: 'Certificate', value: 'Certificate' },
  { id: 'Others', value: 'Others' }
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
  { id: 'Male', value: 'Male' },
  { id: 'Female', value: 'Female' },
  { id: 'Others', value: 'Others' },
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