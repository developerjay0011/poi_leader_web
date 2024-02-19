import { FC } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
/* import {
  AssemblyConstituencyDetails,
  DesignationDetails,
  LeaderFormFields,
  ParliamentaryConstituencyDetails,
  PartyDetails,
  StateDetails,
} from '../../../pages/user-management/AddLeaderPage' */

import { LEADER_IDS } from "@/utils/typesUtils";
import { LeaderPoliticalInfo } from "./LeaderPoliticalInfo";
import { EmerginLeaderInfo } from "./EmerginLeaderInfo";
import {
  AssemblyConstituencyDetails,
  DesignationDetails,
  LeaderFormFields,
  ParliamentaryConstituencyDetails,
  PartyDetails,
  StateDetails,
} from "./AddLeaderPage";

interface PoliticalInfoProps {
  errors: FieldErrors<LeaderFormFields>;
  watch: UseFormWatch<LeaderFormFields>;
  register: UseFormRegister<LeaderFormFields>;
  setValue: UseFormSetValue<LeaderFormFields>;
  control: Control<LeaderFormFields>;
  designations: DesignationDetails[];
  states: StateDetails[];
  parliamentaryConstituency: ParliamentaryConstituencyDetails[];
  assemblyConstituency: AssemblyConstituencyDetails[];
  parties: PartyDetails[];
}

export const PoliticalInfo: FC<PoliticalInfoProps> = ({
  errors,
  register,
  watch,
  setValue,
  control,
  assemblyConstituency,
  designations,
  parliamentaryConstituency,
  states,
  parties,
}) => {
  const leaderType = watch("leaderType");

  const Leader = leaderType
    ? leaderType === LEADER_IDS.leaderID
      ? "leader"
      : "emergingLeader"
    : "error";

  // Object To store leader/emerging leader political fields and one error key which will render a warning text.
  const LEADER_POLITICAL_INFO = {
    leader: (
      <LeaderPoliticalInfo
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        watch={watch}
        assemblyConstituency={assemblyConstituency}
        designations={designations}
        parliamentaryConstituency={parliamentaryConstituency}
        states={states}
        parties={parties}
      />
    ),
    emergingLeader: (
      <EmerginLeaderInfo
        register={register}
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
        assemblyConstituency={assemblyConstituency}
        designations={designations}
        parliamentaryConstituency={parliamentaryConstituency}
        states={states}
        parties={parties}
      />
    ),
    error: (
      <h2 className="col-span-full text-xl text-gray-300 font-bold">
        first select leader type
      </h2>
    ),
  };

  return LEADER_POLITICAL_INFO[Leader];
};
