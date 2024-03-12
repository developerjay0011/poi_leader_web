import { FC } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Input } from "./Input";
import { LeaderFormFields, ProfessionDetails } from "./AddLeaderPage";
import { MultiSelectInputPersonalLeaderInfo } from "./MultiSelectInputPersonalLeaderInfo";
import { BLOOG_GROUPS } from "@/utils/utility";
import { MaritalStatusDropdowns } from "@/constants/common";

interface PersonalLeaderInfoProps {
  errors: FieldErrors<LeaderFormFields>;
  watch: UseFormWatch<LeaderFormFields>;
  register: UseFormRegister<LeaderFormFields>;
  setValue: UseFormSetValue<LeaderFormFields>;
  professions: ProfessionDetails[];
}

export const PersonalLeaderInfo: FC<PersonalLeaderInfoProps> = ({
  errors,
  register,
  setValue,
  watch,
  professions,
}) => {
  const maritalStatus = watch("maritalStatus");

  return (
    <>
      <Input
        errors={errors}
        id="firstName"
        placeholder="narendar"
        register={register}
        title="First Name"
        type="text"
        required
        validations={{
          required: "First name is required",
        }}
      />
      <Input
        errors={errors}
        id="middleName"
        register={register}
        title="Middle Name"
        type="text"
      />
      <Input
        errors={errors}
        id="lastName"
        placeholder="modi"
        register={register}
        title="Last Name"
        type="text"
        required
        validations={{
          required: "Last name is required",
        }}
      />
      <Input
        errors={errors}
        id="gender"
        selectField={{
          title: "select gender",
          options: [
            {
              id: "male",
              value: "male",
            },
            {
              id: "female",
              value: "female",
            },
            {
              id: "others",
              value: "others",
            },
          ],
        }}
        register={register}
        title="Gender"
        type="select"
        required
        validations={{
          required: "Gender is required",
        }}
      />
      <Input
        errors={errors}
        id="bloodGroup"
        selectField={{
          title: "select blood group",
          options: BLOOG_GROUPS.map((el) => ({ id: el, value: el })),
        }}
        register={register}
        title="Blood Group"
        type="select"
        required
        validations={{
          required: "Blood Group is required",
        }}
      />
      <Input
        errors={errors}
        id="fatherName"
        placeholder="Damodardas Mulchand Modi"
        register={register}
        title="Father Name"
        type="text"
        required
        validations={{
          required: "Father name is required",
        }}
      />
      <Input
        errors={errors}
        id="motherName"
        placeholder="Heeraben Modi"
        register={register}
        title="Mother Name"
        type="text"
        required
        validations={{
          required: "Mother name is required",
        }}
      />
      <Input
        errors={errors}
        id="dob"
        register={register}
        title="Date of Birth"
        type="date"
        required
        validations={{
          required: "Date of Birth is required",
        }}
      />
      <Input
        errors={errors}
        id="placeOfBirth"
        placeholder="Vadnagar"
        register={register}
        title="Place of Birth"
        type="text"
        required
        validations={{
          required: "Place of Birth is required",
        }}
      />
      <Input
        errors={errors}
        id="maritalStatus"
        selectField={{
          title: "select marital status",
          options: MaritalStatusDropdowns,
        }}
        register={register}
        title="Marital Status"
        type="select"
        required
        validations={{
          required: "Marital Status is required",
        }}
      />
      {/* Conditional Data based on maritalStatus */}
      {maritalStatus && maritalStatus === "Married" && (
        <>
          <Input
            errors={errors}
            id="spouseName"
            placeholder="Jashodaben Modi"
            register={register}
            title="Spouse Name"
            type="text"
            required
            validations={{
              required: "Spouse Name is required",
            }}
          />

          <Input
            errors={errors}
            id="noOfDaughters"
            placeholder=""
            register={register}
            title="No of Daughters"
            type="number"
            required
            validations={{
              required: "Daughter's count is required",
            }}
          />

          <Input
            errors={errors}
            id="noOfSons"
            placeholder=""
            register={register}
            title="No of Sons"
            type="number"
            required
            validations={{
              required: "Son's count is required",
            }}
          />
        </>
      )}
      <Input
        errors={errors}
        id="higherEduction"
        required
        validations={{ required: "Higher Education is required" }}
        register={register}
        title="Higher Education"
        type="select"
        selectField={{
          title: "Select Higher Education",
          options: [
            { id: "below 10th", value: "below 10th" },
            { id: "10th pass", value: "10th pass" },
            { id: "12th pass", value: "12th pass" },
            { id: "under graduate", value: "under graduate" },
            { id: "post graduate", value: "post graduate" },
            { id: "p.h.d", value: "p.h.d" },
            { id: "certificate", value: "certificate" },
            { id: "others", value: "others" },
          ],
        }}
      />

      <MultiSelectInputPersonalLeaderInfo
        defaultValues={[]}
        id="profession"
        limit={5}
        options={professions.map((el) => ({
          id: el.professionId,
          val: el.professionName,
        }))}
        setValue={(val) =>
          setValue("profession", val.map((el) => el.val).join(", ") as string)
        }
        title="Profession"
        required
      />
      <Input
        errors={errors}
        id="hobbies"
        placeholder="cricket"
        register={register}
        title="Hobbies OR Interests"
        type="textarea"
        fullWidth
        rows={3}
      />
      <Input
        errors={errors}
        id="assests"
        placeholder=""
        register={register}
        title="Asset & Liability"
        type="textarea"
        fullWidth
        rows={3}
      />
    </>
  );
};
