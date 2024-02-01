import { FC, useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'

import { motion as m } from 'framer-motion'
import { ConnectToAPI } from '../../utils/utility'
import { BasicLeaderInfo } from './BasicLeaderInfo'
import { PoliticalInfo } from './PoliticalInfo'
import { PersonalLeaderInfo } from './PersonalLeaderInfo'
import { ContactInfoField } from './ContactInfoField'

export interface LeaderFormFields {
  username: string
  email: string
  password: string
  leaderType: string

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
  preparingForFutureElections: string

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
    img: string[]
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

export interface ProfessionDetails {
  professionId: string
  professionName: string
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

interface LeaderFormState {
  states: StateDetails[]
  districts: DistrictDetails[]
  pincodes: PincodeDetails[]
  assemblyConstituency: AssemblyConstituencyDetails[]
  parliamentaryConstituency: ParliamentaryConstituencyDetails[]
  designations: DesignationDetails[]
  parties: PartyDetails[]
  loading: boolean
  professions: ProfessionDetails[]
}

const init: LeaderFormState = {
  states: [],
  assemblyConstituency: [],
  districts: [],
  parliamentaryConstituency: [],
  pincodes: [],
  designations: [],
  parties: [],
  loading: true,
  professions: [],
}

enum LeaderFormActionType {
  STORE_STATE,
  STORE_DISTRICT,
  STORE_PINCODE,
  STORE_ASSEMBLY,
  STORE_PARLIAMENTARY,
  STORE_DESIGNATION,
  STORE_PARTY,
  SET_LOADING,
  STORE_PROFESSION,
}

interface LeaderFormAction {
  type: LeaderFormActionType
  payload:
    | StateDetails[]
    | DistrictDetails[]
    | PincodeDetails[]
    | AssemblyConstituencyDetails[]
    | ParliamentaryConstituencyDetails[]
    | DesignationDetails[]
    | PartyDetails[]
    | boolean
    | ProfessionDetails[]
}

const reducerFn: (
  state: LeaderFormState,
  action: LeaderFormAction
) => LeaderFormState = (state, action) => {
  const { type, payload } = action

  if (type === LeaderFormActionType.STORE_ASSEMBLY)
    return {
      ...state,
      assemblyConstituency: payload as AssemblyConstituencyDetails[],
    }
  if (type === LeaderFormActionType.STORE_STATE)
    return { ...state, states: payload as StateDetails[] }
  if (type === LeaderFormActionType.STORE_DISTRICT)
    return { ...state, districts: payload as DistrictDetails[] }
  if (type === LeaderFormActionType.STORE_PINCODE)
    return { ...state, pincodes: payload as PincodeDetails[] }
  if (type === LeaderFormActionType.STORE_PARLIAMENTARY)
    return {
      ...state,
      parliamentaryConstituency: payload as ParliamentaryConstituencyDetails[],
    }
  if (type === LeaderFormActionType.STORE_DESIGNATION)
    return {
      ...state,
      designations: payload as DesignationDetails[],
    }
  if (type === LeaderFormActionType.STORE_PARTY)
    return {
      ...state,
      parties: payload as PartyDetails[],
    }

  if (type === LeaderFormActionType.SET_LOADING)
    return { ...state, loading: payload as boolean }

  if (type === LeaderFormActionType.STORE_PROFESSION)
    return { ...state, professions: payload as ProfessionDetails[] }

  return init
}

export const AddLeaderPage: FC = () => {
  
  const [state, dispatchFn] = useReducer(reducerFn, init)
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm<LeaderFormFields>({
    defaultValues: {
      bothAddressIsSame: 'yes',
      references: [{ age: '', mobileNo: '', name: '' }],
    },
    mode: 'onTouched',
  })

  const formSubmitHandler = (data: LeaderFormFields) => {
    console.log(data)
  }

  // Below is the logic to prefill fields which depends on data coming from an API
  // useEffect(() => {
  //   if (state.states.length > 0 && state.districts.length > 0) {
  //     setValue('pState', 'f1b64cf8fbb341709c43ab6f7295e5f9')
  //     setValue('pDistrict', '9f50cb535edc4341bdb528b784884552')
  //   }
  // }, [state, setValue])

  return (
    <m.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ ease: 'easeIn' }}
      className='w-[95%] m-auto relative my-7 border bg-white border-gray-300 shadow-md rounded-md py-8 px-7 max-lg:w-[98%] max-lg:my-5'>
      <h1 className='text-4xl font-bold capitalize'>add new leader</h1>
      {state.loading && (
        <div className='flex flex-col gap-3 items-center py-10'>
          <span className='formLoader' />
          <p className='text-cyan-700 animate-pulse'>Loading Assets...</p>
        </div>
      )}

      {/* {!state.loading && state.assemblyConstituency.length > 0 && ( */}
      {true && (
        <form
          className='mt-10 flex flex-col gap-10'
          noValidate
          onSubmit={handleSubmit(formSubmitHandler)}>
          {/* BASIC INFO */}
          <div className='border border-zinc-200 px-6 py-7 rounded-md flex flex-col gap-6'>
            <h2 className='text-3xl font-semibold'>Basic Information</h2>

            <section className='grid grid-cols-3 gap-x-4 gap-y-5'>
              <BasicLeaderInfo
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            </section>
          </div>

          {/* Political Info */}
          <div className='border border-zinc-200 px-6 py-7 rounded-md flex flex-col gap-6'>
            <h2 className='text-3xl font-semibold'>Political Information</h2>

            <section className='grid grid-cols-3 gap-x-4 gap-y-5'>
              <PoliticalInfo
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                control={control}
                assemblyConstituency={state.assemblyConstituency}
                parliamentaryConstituency={state.parliamentaryConstituency}
                states={state.states}
                designations={state.designations}
                parties={state.parties}
              />
            </section>
          </div>

          {/* Personal Info */}
          <div className='border border-zinc-200 px-6 py-7 rounded-md flex flex-col gap-6'>
            <h2 className='text-3xl font-semibold'>Personal Information</h2>

            <section className='grid grid-cols-3 gap-x-4 gap-y-5'>
              <PersonalLeaderInfo
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                professions={state.professions}
              />
            </section>
          </div>

          {/* Contact Info */}
          <div className='border border-zinc-200 px-6 py-7 rounded-md'>
            <h2 className='text-3xl font-semibold mb-7'>Contact Information</h2>

            <section className='grid grid-cols-3 gap-x-4 gap-y-5'>
              <ContactInfoField
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                districts={state.districts}
                states={state.states}
                pincodes={state.pincodes}
              />
            </section>
          </div>

          <div className='flex gap-2 justify-end'>
            <button
              type='submit'
              className='px-5 py-1 rounded-full bg-cyan-500 text-cyan-50'>
              Submit
            </button>
            <button
              // onClick={() => navigate('/admin/user-management/manage-leaders')} // By passing -1 in navigate function this will redirect to the previous route
              type='button'
              className='px-5 py-1 rounded-full text-cyan-500 bg-cyan-100 transition-all hover:bg-cyan-500 hover:text-cyan-50'>
              Close
            </button>
          </div>
        </form>
      )}
    </m.section>
  )
}
