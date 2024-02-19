import { DropdownOptions } from "@/interfaces/common";

export const TOKEN_KEY = "token";
export const DEFAULT_CONTENT_TYPE = 'application/json';

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

export const GenderDropdowns: DropdownOptions[] = [
  { id: 'male', value: 'male' },
  { id: 'female', value: 'female' },
  { id: 'others', value: 'others' },
];

export const MaritalStatusDropdowns: DropdownOptions[] = [
  { id: 'married', value: 'married' },
  { id: 'Unmarried', value: 'Unmarried' },
  { id: 'divorced', value: 'divorced' }
];