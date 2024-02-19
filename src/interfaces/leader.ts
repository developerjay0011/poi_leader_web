export interface LeaderProfile {
  id?: string
  username?: string
  email?: string
  mobile?: string
  image?: string
  bgimage?: string
  leadertype?: string
  password?: string
  request_status?: string
  isactive?: boolean
  isdelete?: boolean
  is_profile_complete?: boolean
  created_date?: string
  modified_date?: string
  personal_info?: ProfileInfo
  contact_info?: ContactInfo
  political_info?: PoliticalInfo
  general_setting?: GeneralSetting
}

export interface ProfileInfo {
  first_name: string
  middle_name: string
  last_name: string
  gender: string
  blood_group: string
  father_name: string
  mother_name: string
  dob: string
  place_of_birth: string
  marital_status: string
  spouse_name: string
  no_of_daughters: number
  no_of_sons: number
  higher_education: string
  profession: string
  hobbies: string
  assets: string
}

export interface ContactInfo {
  permanent_address: string
  permanent_state_id: string
  permanent_state: string
  permanent_district_id: string
  permanent_distric: string
  permanent_pincode: string
  is_same_as_permanent: number
  present_address: string
  present_state_id: string
  present_district_id: string
  present_pincode: string
  telephones: string
  mobile_nos: string
  fb_link: string
  insta_link: string
  twitter_link: string
}

export interface PoliticalInfo {
  political_party_id: string
  political_party: string
  designation_id: string
  designation: string
  parliament_house: string
  stateid: string
  state: string
  assemblyid: string
  assembly: string
  parliamentaryid: string
  parliamentary: string
  is_hold_ministry: boolean
  ministries: MinistriesInfo[]
  is_nominated: boolean
  joined_date: string
  post_in_party: string
  achievements: string
  why_join_politics: string
  is_participated_in_elections: boolean
  is_prepare_for_elections: boolean
  done_any_political_activity: boolean
  does_family_supports: boolean
  people_in_team: string
  referencies: References[]
}

export interface MinistriesInfo {
  ministryid: string
  ministrytype: string
}

export interface References {
  name: string
  age: number
  mobile: string
}

export interface GeneralSetting {
  enable_follow_me: boolean
  show_agendas: boolean
  send_me_notifications: boolean
}