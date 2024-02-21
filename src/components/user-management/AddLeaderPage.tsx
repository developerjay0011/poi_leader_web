import { FC, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";

import { motion as m } from "framer-motion";
import { BasicLeaderInfo } from "./BasicLeaderInfo";
import { PoliticalInfo } from "./PoliticalInfo";
import { PersonalLeaderInfo } from "./PersonalLeaderInfo";
import { ContactInfoField } from "./ContactInfoField";
import { RootState } from "@/redux_store";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { submitLeaderForm } from "@/redux_store/APIFunctions";

export interface LeaderFormFields {
  username: string;
  email: string;
  password: string;
  leaderType: string;

  // Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  motherName: string;
  fatherName: string;
  hobbies: string;
  about: string;
  maritalStatus: string;
  spouseName: string;
  noOfDaughters: number;
  noOfSons: number;
  bloodGroup: string;
  criminalCases: number;
  assests: string;
  placeOfBirth: string;
  higherEduction: string;
  profession: string;

  //  Political Info
  designation: string;
  parliamentHouse: string;
  politicalParty: string;
  lokSabhaState: string;
  lokSabhaConstituency: string;
  rajyaSabhaNominated: string;
  rajyaSabhaState: string;
  mlaState: string;
  mlaConstituency: string;
  ministries: {
    name: string;
    type: string;
  }[];
  activity_pictures: {
    pictures: string[],
    description: string
  }[];

  // Emerging Leader Political Info
  joinedDate: string;
  postInParty: string;

  // Question
  participatedInElection: string;
  politicalAchievements: string;
  whyYouJoinedPolitics: string;
  preparingForFutureElections: string;

  // participatedInElection YES Field
  election: string;
  electionYear: string;
  position: string;
  opponents: string;
  electionState: string;
  electionConstituency: string;

  // participatedInElection NO Field
  targetElection: string;
  targetElectionYear: string;
  targetElectionState: string;
  targetElectionConstituency: string;
  topTenPriorities: string;

  familySupportedForPolitics: string;
  doneAnyPoliticalActivity: string;
  activities: {
    img: string[];
    description: string;
  }[];
  references: {
    name: string;
    age: string;
    mobileNo: string;
  }[];
  peopleInTeam: string;

  // Contact Information
  pAddress: string;
  pState: string;
  pDistrict: string;
  pPincode: string;

  bothAddressIsSame: string;

  cAddress: string;
  cState: string;
  cPincode: string;
  cDistrict: string;

  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };

  telePhoneNos: string;
  mobileNos: string;
  workEmails: string;
}

export interface ProfessionDetails {
  professionId: string;
  professionName: string;
}

export interface AssemblyConstituencyDetails {
  assembly_name: string;
  id: string;
  stateid: string;
}

export interface DesignationDetails {
  id: string;
  designation: string;
}

export interface ParliamentaryConstituencyDetails {
  id: string;
  parliamentary_name: string;
  stateid: string;
}

export interface StateDetails {
  id: string;
  state: string;
}

export interface PartyDetails {
  id: string;
  party_name: string;
}

export interface DistrictDetails {
  id: string;
  district: string;
  stateid: string;
}

export interface PincodeDetails {
  districtId: string;
  pincodes: string[];
}

interface LeaderFormState {
  states: StateDetails[];
  districts: DistrictDetails[];
  pincodes: PincodeDetails[];
  assemblyConstituency: AssemblyConstituencyDetails[];
  parliamentaryConstituency: ParliamentaryConstituencyDetails[];
  designations: DesignationDetails[];
  parties: PartyDetails[];
  loading: boolean;
  professions: ProfessionDetails[];
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
};

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
  type: LeaderFormActionType;
  payload:
    | StateDetails[]
    | DistrictDetails[]
    | PincodeDetails[]
    | AssemblyConstituencyDetails[]
    | ParliamentaryConstituencyDetails[]
    | DesignationDetails[]
    | PartyDetails[]
    | boolean
    | ProfessionDetails[];
}

const reducerFn: (
  state: LeaderFormState,
  action: LeaderFormAction
) => LeaderFormState = (state, action) => {
  const { type, payload } = action;

  if (type === LeaderFormActionType.STORE_ASSEMBLY)
    return {
      ...state,
      assemblyConstituency: payload as AssemblyConstituencyDetails[],
    };
  if (type === LeaderFormActionType.STORE_STATE)
    return { ...state, states: payload as StateDetails[] };
  if (type === LeaderFormActionType.STORE_DISTRICT)
    return { ...state, districts: payload as DistrictDetails[] };
  if (type === LeaderFormActionType.STORE_PINCODE)
    return { ...state, pincodes: payload as PincodeDetails[] };
  if (type === LeaderFormActionType.STORE_PARLIAMENTARY)
    return {
      ...state,
      parliamentaryConstituency: payload as ParliamentaryConstituencyDetails[],
    };
  if (type === LeaderFormActionType.STORE_DESIGNATION)
    return {
      ...state,
      designations: payload as DesignationDetails[],
    };
  if (type === LeaderFormActionType.STORE_PARTY)
    return {
      ...state,
      parties: payload as PartyDetails[],
    };

  if (type === LeaderFormActionType.SET_LOADING)
    return { ...state, loading: payload as boolean };

  if (type === LeaderFormActionType.STORE_PROFESSION)
    return { ...state, professions: payload as ProfessionDetails[] };

  return init;
};

export const AddLeaderPage: FC = () => {
  const userDetails: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );
  const [state, dispatchFn] = useReducer(reducerFn, init);
  const dispatch = cusDispatch();
  const { leaderOptions } = cusSelector((state) => state.common)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm<LeaderFormFields>({
    defaultValues: {
      username: userDetails?.data?.user_detail?.username || "",
      email: userDetails?.data?.user_detail?.email || "",
      password: userDetails?.data?.user_detail?.password || "",
      bothAddressIsSame: "yes",
      references: [{ age: "", mobileNo: "", name: "" }],
    },
    mode: "onTouched",
  });

  const formSubmitHandler = async (data: LeaderFormFields) => {
    const bodyData = {
      id: userDetails?.data?.user_detail?.id,
      username: data?.username,
      email: data?.email,
      mobile: userDetails?.data?.user_detail?.mobile || "",
      image: userDetails?.data?.user_detail?.image || "",
      leadertype: data?.leaderType,
      password: data?.password,
      request_status: userDetails?.data?.leader_detail?.request_status,
      isactive: userDetails?.data?.user_detail?.isactive,
      is_profile_complete:
        userDetails?.data?.leader_detail?.is_profile_complete,
      created_date: userDetails?.data?.user_detail?.createddate,
      modified_date: userDetails?.data?.leader_detail?.modified_date,
      personal_info: {
        first_name: data?.firstName,
        middle_name: data?.middleName,
        last_name: data?.lastName,
        gender: data?.gender,
        blood_group: data?.bloodGroup,
        father_name: data?.fatherName,
        mother_name: data?.motherName,
        dob: data?.dob,
        place_of_birth: data?.placeOfBirth,
        marital_status: data?.maritalStatus,
        higher_education: data?.higherEduction,
        profession: data?.profession,
        hobbies: data?.hobbies,
        assets: data?.assests,
      },
      contact_info: {
        permanent_address: data?.pAddress,
        permanent_state_id: data?.pState,
        permanent_district_id: data?.pDistrict,
        permanent_pincode: "",
        is_same_as_permanent: true,
        present_address: data?.pAddress,
        present_state_id: data?.pState,
        present_district_id: data?.pDistrict,
        present_pincode: "",
        telephones: data?.telePhoneNos,
        mobile_nos: data?.mobileNos,
        fb_link: data?.socialMedia?.facebook,
        insta_link: data?.socialMedia?.instagram,
        twitter_link: data?.socialMedia?.twitter,
      },
      political_info: {
        political_party_id: data?.politicalParty,
        designation_id: data?.designation,
        parliament_house: data?.parliamentHouse,
        stateid: "data?.pState",
        assemblyid: "string",
        parliamentaryid: "string",
        is_hold_ministry: true,
        ministries: data?.ministries.map((el) => ({
          ministryid: el.name,
          ministrytype: el.type,
        })),
        is_nominated: true,
        joined_date: data?.joinedDate,
        post_in_party: data?.postInParty,
        achievements: "string",
        why_join_politics: "string",
        is_participated_in_elections: true,
        is_prepare_for_elections: true,
        done_any_political_activity: true,
        does_family_supports: true,
        people_in_team: data?.peopleInTeam,
        activity_pictures: data?.activity_pictures,
        referencies: data?.references?.map((el) => ({
          name: el?.name,
          age: +el?.age,
          mobile: el?.mobileNo,
        })),
      },
      general_setting: {
        enable_follow_me: true,
        show_agendas: true,
        send_me_notifications: true,
      },
    };

    try {
      await submitLeaderForm(bodyData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <m.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ ease: "easeIn" }}
      className="w-[95%] m-auto relative my-7 border bg-white border-gray-300 shadow-md rounded-md py-8 px-7 max-lg:w-[98%] max-lg:my-5"
    >
      <h1 className="text-4xl font-bold capitalize">add new leader</h1>
      <form
        className="mt-10 flex flex-col gap-10"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        {/* BASIC INFO */}
        <div className="border border-zinc-200 px-6 py-7 rounded-md flex flex-col gap-6">
          <h2 className="text-3xl font-semibold">Basic Information</h2>

          <section className="grid grid-cols-3 gap-x-4 gap-y-5">
            <BasicLeaderInfo
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </section>
        </div>

        {/* Political Info */}
        <div className="border border-zinc-200 px-6 py-7 rounded-md flex flex-col gap-6">
          <h2 className="text-3xl font-semibold">Political Information</h2>

          <section className="grid grid-cols-3 gap-x-4 gap-y-5">
            <PoliticalInfo
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              control={control}
              assemblyConstituency={leaderOptions.assemblies}
              parliamentaryConstituency={leaderOptions.parliamentries}
              states={leaderOptions.states}
              designations={leaderOptions?.designations}
              parties={leaderOptions?.politicalparty}
            />
          </section>
        </div>

        {/* Personal Info */}
        <div className="border border-zinc-200 px-6 py-7 rounded-md flex flex-col gap-6">
          <h2 className="text-3xl font-semibold">Personal Information</h2>

          <section className="grid grid-cols-3 gap-x-4 gap-y-5">
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
        <div className="border border-zinc-200 px-6 py-7 rounded-md">
          <h2 className="text-3xl font-semibold mb-7">Contact Information</h2>

          <section className="grid grid-cols-3 gap-x-4 gap-y-5">
            <ContactInfoField
              register={register}
              errors={errors}
              watch={watch}

              setValue={setValue}
              districts={leaderOptions.districts}
              states={leaderOptions.states}
            />
          </section>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            // onClick={handleSubmit(formSubmitHandler)}
            type="submit"
            className="px-5 py-1 rounded-full bg-cyan-500 text-cyan-50"
          >
            Submit
          </button>
          <button
            // onClick={() => navigate('/admin/user-management/manage-leaders')} // By passing -1 in navigate function this will redirect to the previous route
            type="button"
            className="px-5 py-1 rounded-full text-cyan-500 bg-cyan-100 transition-all hover:bg-cyan-500 hover:text-cyan-50"
          >
            Close
          </button>
        </div>
      </form>
    </m.section>
  );
};
