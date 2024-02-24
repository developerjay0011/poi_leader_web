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
  image: string
  bgimage: string
  usertype:string
  // Personal Information
  first_name: string
  middle_name: string
  last_name: string
  dob: string
  gender: string
  mother_name: string
  father_name: string
  hobbies: string
  about: string
  marital_status: string
  spouse_name: string
  no_of_daughters: number
  no_of_sons: number
  blood_group: string
  criminal_cases: number
  assets: string
  place_of_birth: string
  higher_education: string
  profession: string

  //  Political Info
  lok_sabha_state: string
  lok_sabha_constituency: string
  rajya_sabha_nominated: string
  rajya_sabha_state: string
  mla_state: string
  mla_constituency: string
  ministries?: {
    ministryid?: string
    ministrytype?: string
  }[]
  activity_pictures?: {
    pictures?: string[]
    description: string
  }[]
  political_party_id: string
  designation: string
  designation_id: string
  parliament_house: string
  stateid: string
  assemblyid: string
  parliamentaryid: string
  is_hold_ministry: boolean
  is_nominated: boolean
  is_participated_in_elections: boolean
  is_prepare_for_elections: boolean

  parliamentHouse: string
  lokSabhaState: string
  rajyaSabhaState: string
  rajyaSabhaNominated: string
  mlaConstituency: string
  lokSabhaConstituency: string
  politicalParty: string
  mlaState: string

  done_any_political_activity: boolean
  does_family_supports: boolean
  people_in_team: string
  referencies: {
    name?: string
    age?: number
    mobile?: string
  }[]

  // Emerging Leader Political Info
  joined_date: string
  post_in_party: string

  // Question
  participatedInElection: string
  achievements: string
  why_join_politics: string

  // participatedInElection YES Field
  position: string
  opponents: string
  elections: string
  election_year: string
  election_stateid: string
  election_constituency_id: string
  election_parliamentary_constituency_id: string


  // participatedInElection NO Field
  targetElectionState: string
  targetElectionConstituency: string
  
  target_elections: string
  target_election_year: string
  top_priorities: string

  familySupportedForPolitics: string
  doneAnyPoliticalActivity: string
  peopleInTeam: string

  // Contact Information
  permanent_address: string
  permanent_state_id: string
  permanent_district_id: string
  permanent_pincode: string

  bothAddressIsSame: string
  is_same_as_permanent: boolean

  present_address: string
  present_state_id: string
  present_district_id: string
  present_pincode: string


  fb_link: string
  insta_link: string
  twitter_link: string
  

  telephones: string
  mobile_nos: string
  workEmails: string

  Name:string;
  Phone:string;
  Email:string;


  title:string
  description:string
  documents:string
  attachments:string
  leaderId?: string
  creation_date: string
  categoryid:string
}

export const LEADER_IDS = {
  // mpID: '649ebf20c47c520495a02cbd',
  mpID: '65b252f4af64d588b642fb98',
  leaderID: '6486e2530b653899171a9bdb',
  emergingLeaderID: '649e8aedd33f7f84f03820f2',
  mlaID: '649ebf1bc47c520495a02cbb',
  lokSabhaID: 'lok sabha',
  rajyaSabhaID: 'rajya sabha',
}

export interface AssemblyConstituencyDetails {
  assembly_name: string
  id: string
  stateid: string
}

export interface DesignationDetails {
  id: string
  designation: string
}

export interface ParliamentaryConstituencyDetails {
  id: string
  parliamentary_name: string
  stateid: string
}

export interface StateDetails {
  id: string
  state: string
}

export interface PartyDetails {
  id: string
  party_name: string
}
export interface TimeLineDetails {
    status : string
  description : string
  milestone: string
  created_date: string
  attachments: string[]
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

export type UserPostType = 'post' | 'agenda' | 'polls' | 'story'

export interface Comment {
  id: string
  userId: string
  userImg: string
  username: string
  likes: Like[]
  commentText: string
  createdDate: string
  comments: NestedComment[]
  allData: any
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
  updatePost: (data:any) => void;
  types: any[]
  allData:any
}

export interface NewPostFields {
  type: string
  id: string
  media: any
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
export interface AgendaFormFields {
  leaderid: string
  title: string
  priority: string
  access: string
  categoryid: string
  description: string
  attachments: string
  creation_date: string
  documents: string
  status: string
  saved_by_type: string
  saved_by:string

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
