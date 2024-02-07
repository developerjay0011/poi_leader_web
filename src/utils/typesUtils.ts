import { StaticImageData } from 'next/image'

export interface LoginFormFields {
  userId: string
  password: string
  remember: boolean
  fullName: string
  email: string
  phoneNo: string
  userType: string
}


export interface ErrObj {
  isErr: boolean
  errTxt: string
}

export interface RegisterFormFields {
  fullName: string
  email: string
  phoneNo: string
  password: string
  userType: string
  userId: string
}

export interface LoginData {
  email: string;
  password: string
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  mobile: string;
  leadertype: string;

}

export interface ErrObj {
  isErr: boolean
  errTxt: string
}

export interface UserDetails {
  id: string
  username: string
  email: string
  password: string
  leaderType: string
  displayPic: string
  backgroundPic: string

  // Personal Information
  firstName: string
  middleName: string
  lastName: string
  dob: string
  gender: string
  motherName: string
  fatherName: string
  hobbies: string
  about: string
  maritalStatus: string
  spouseName: string
  noOfDaughters: number
  noOfSons: number
  bloodGroup: string
  criminalCases: number
  assests: string
  placeOfBirth: string
  higherEduction: string
  profession: string

  //  Political Info
  designation: string
  parliamentHouse: string
  politicalParty: string
  lokSabhaState: string
  lokSabhaConstituency: string
  rajyaSabhaNominated: string
  rajyaSabhaState: string
  mlaState: string
  mlaConstituency: string
  ministries: {
    name: string
    type: string
  }[]

  // Emerging Leader Political Info
  joinedDate: string
  postInParty: string

  // Question
  participatedInElection: string
  politicalAchievements: string
  whyYouJoinedPolitics: string

  // participatedInElection YES Field
  election: string
  electionYear: string
  position: string
  opponents: string
  electionState: string
  electionConstituency: string

  // participatedInElection NO Field
  targetElection: string
  targetElectionYear: string
  targetElectionState: string
  targetElectionConstituency: string
  topTenPriorities: string

  familySupportedForPolitics: string
  doneAnyPoliticalActivity: string
  activities: {
    img: string
    description: string
  }[]
  references: {
    name: string
    age: string
    mobileNo: string
  }[]
  peopleInTeam: string

  // Contact Information
  pAddress: string
  pState: string
  pDistrict: string
  pPincode: string

  bothAddressIsSame: string

  cAddress: string
  cState: string
  cPincode: string
  cDistrict: string

  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
  }

  telePhoneNos: string
  mobileNos: string
  workEmails: string
}

export const LEADER_IDS = {
  mpID: '649ebf20c47c520495a02cbd',
  leaderID: '6486e2530b653899171a9bdb',
  emergingLeaderID: '649e8aedd33f7f84f03820f2',
  mlaID: '649ebf1bc47c520495a02cbb',
  lokSabhaID: 'lok sabha',
  rajyaSabhaID: 'rajya sabha',
}

export interface AssemblyConstituencyDetails {
  assemblyName: string
  assemblyId: string
  stateId: string
}

export interface DesignationDetails {
  designationId: string
  designationName: string
}

export interface ParliamentaryConstituencyDetails {
  parliamentaryId: string
  parliamentaryName: string
  stateId: string
}

export interface StateDetails {
  stateId: string
  stateName: string
}

export interface PartyDetails {
  partyid: string
  partyname: string
}

export interface DistrictDetails {
  districtId: string
  districtName: string
  stateId: string
}

export interface PincodeDetails {
  districtId: string
  pincodes: string[]
}

export type UserType = 'leader' | 'citizen' | 'emerging-leader' | ''

export type PollType = 'text' | 'image'

export interface PollDetails {
  id: string
  title: string
  pollType: PollType
  options: { option: string; id: string; votes: number }[]
  imgOptions: { text: string; media: string; id: string; votes: number }[]
  publishDate: string
  access: string
  expiresAt: string
}

export type PostType = 'image' | 'video'

export interface MediaPost {
  type: PostType
  media: string
  id: string
  likes: Like[]
  comments: Comment[]
}

export type UserPostType = 'post' | 'agenda' | 'polls'

export interface Comment {
  id: string
  userId: string
  userImg: string
  username: string
  likes: Like[]
  commentText: string
  createdDate: string
  comments: NestedComment[]
}

export interface NestedComment {
  id: string
  userId: string
  userImg: string
  username: string
  likes: Like[]
  commentText: string
  createdDate: string
}

export interface Like {
  userId: string
}

export interface PostDetails {
  id: string
  writtenText: string
  userId: string
  type: UserPostType
  createdDatetime: string
  media: MediaPost[] | string
  comments: Comment[] | string
  likes: Like[] | string
  leaderid: string
  updatePost: any
}

export interface NewPostFields {
  type: string
  id: string
  media: string
}

export interface NewPostData {
  writtenText: string
  type: UserPostType
  media: NewPostFields[]
}

export type RQ_VAL = '0' | '1' | '2' | '3'

export const REQUEST_STATUS = {
  '0': {
    name: 'recieved',
    classes: 'bg-sky-100 text-sky-500 border-sky-500',
  },
  '1': {
    name: 'processing',
    classes: 'bg-yellow-100 text-yellow-500 border-yellow-500',
  },
  '2': {
    name: 'approved',
    classes: 'bg-green-100 text-green-500 border-green-500',
  },
  '3': {
    name: 'rejected',
    classes: 'bg-rose-100 text-rose-500 border-rose-500',
  },
}

export interface Attachments {
  type: string
  file: string
  id: string
}

export interface RequestComplaintDetails {
  attachments: string
  complaintno: string
  description: string
  id: string
  isdeleted: string
  signature: string
  subject: string
  to: string
  requestno: string
  createdDate: string
}

export interface ToDetails {
  designation: string
  dislike: string
  isSeen: string
  leaderId: string
  leaderProfilePic: string | StaticImageData
  name: string
  requestComplaintSeenDate: string
  requestComplaintStatus: string
}

export interface UserDetails1 {
  id: string
  firstName: string
}
