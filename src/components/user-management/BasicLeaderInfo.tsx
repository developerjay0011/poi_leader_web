import { FC } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Input } from "./Input";
import { LEADER_IDS } from "@/utils/typesUtils";
import { LeaderFormFields } from "./AddLeaderPage";

interface BasicLeaderInfoProps {
  errors: FieldErrors<LeaderFormFields>;
  register: UseFormRegister<LeaderFormFields>;
  watch: UseFormWatch<LeaderFormFields>;
  setValue: UseFormSetValue<LeaderFormFields>;
}

export const BasicLeaderInfo: FC<BasicLeaderInfoProps> = ({
  errors,
  register,
  setValue,
}) => {
  return (
    <>
      <Input
        errors={errors}
        id="username"
        placeholder="poi01"
        register={register}
        title="Username"
        required
        type="text"
        validations={{
          required: "Username is required",
        }}
      />

      <Input
        errors={errors}
        id="email"
        placeholder="example@gmail.com"
        register={register}
        title="Email"
        required
        type="email"
        validations={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: "Entered email is not valid | Ex: something@example.com",
          },
        }}
      />

      <Input
        errors={errors}
        id="password"
        placeholder="XXXXXXX"
        register={register}
        title="Password"
        required
        type="password"
        validations={{
          required: "Password is required",
        }}
      />

      <Input
        errors={errors}
        id="leaderType"
        register={register}
        title="Leader Type"
        required
        type="select"
        validations={{
          required: "Leader Type is required",
          onChange() {
            // Resetting all field that depends on leader type
            setValue("designation", "");
            setValue("parliamentHouse", "");
            setValue("politicalParty", "");
            setValue("lokSabhaState", "");
            setValue("lokSabhaConstituency", "");
            setValue("rajyaSabhaNominated", "");
            setValue("rajyaSabhaState", "");
            setValue("mlaState", "");
            setValue("mlaConstituency", "");
            setValue("joinedDate", "");
            setValue("postInParty", "");
            setValue("participatedInElection", "");
            setValue("election", "");
            setValue("electionYear", "");
            setValue("position", "");
            setValue("opponents", "");
            setValue("electionState", "");
            setValue("electionConstituency", "");
            setValue("targetElection", "");
            setValue("targetElectionYear", "");
            setValue("targetElectionState", "");
            setValue("targetElectionConstituency", "");
            setValue("topTenPriorities", "");
            setValue("familySupportedForPolitics", "");
            setValue("doneAnyPoliticalActivity", "");
            setValue("peopleInTeam", "");
            setValue("ministries", [
              {
                name: "",
                type: "",
              },
            ]);
            setValue("activities", [
              {
                img: [""],
                description: "",
              },
            ]);
            setValue("references", [
              {
                age: "",
                mobileNo: "",
                name: "",
              },
            ]);
          },
        }}
        selectField={{
          options: [
            { id: LEADER_IDS.leaderID, value: "leader" },
            { id: LEADER_IDS.emergingLeaderID, value: "emerging leader" },
          ],
          title: "select leader type",
        }}
      />
    </>
  );
};

/*
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
  peopleInTeam
 */
