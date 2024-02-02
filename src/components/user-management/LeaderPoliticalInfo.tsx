import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";

import { FC, useState } from "react";
import { Input } from "./Input";

import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { YesNoField } from "./YesNoField";
import {
  AssemblyConstituencyDetails,
  DesignationDetails,
  LeaderFormFields,
  ParliamentaryConstituencyDetails,
  PartyDetails,
  StateDetails,
} from "./AddLeaderPage";
import { LEADER_IDS } from "@/utils/typesUtils";

interface LeaderPoliticalInfoProps {
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

export const LeaderPoliticalInfo: FC<LeaderPoliticalInfoProps> = ({
  control,
  errors,
  register,
  setValue,
  watch,
  assemblyConstituency,
  designations,
  parliamentaryConstituency,
  states,
  parties,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ministries",
  });

  console.log(parties);
  console.log(assemblyConstituency);

  const [hasMinistry, setHasMinistry] = useState(false);
  const designation = watch("designation");
  const parliamentHouse = watch("parliamentHouse");
  const lokSabhaState = watch("lokSabhaState");
  const mlaState = watch("mlaState");
  const rajyaSabhaNominated = watch("rajyaSabhaNominated");

  return (
    <>
      <Input
        register={register}
        errors={errors}
        title="Designation"
        type="select"
        id="designation"
        required
        validations={{
          required: "Designation is required",
          onChange() {
            // Resetting all Fields
            setValue("parliamentHouse", "");
            setValue("lokSabhaState", "");
            setValue("rajyaSabhaState", "");
            setValue("rajyaSabhaNominated", "");
            setValue("mlaConstituency", "");
            setValue("lokSabhaConstituency", "");
            setValue("politicalParty", "");
            setValue("mlaState", "");
          },
        }}
        selectField={{
          title: "select designation",
          options: designations?.map((el) => ({
            id: el.id,
            value: el.designation,
          })),
        }}
      />

      {/* Showing State if designation is MLA */}
      {designation && designation === LEADER_IDS.mlaID && (
        <>
          <Input
            errors={errors}
            register={register}
            validations={{ required: "State is required" }}
            id="mlaState"
            title="State"
            type="select"
            required
            selectField={{
              title: "select state",
              options: states?.map((el) => ({
                id: el.id,
                value: el.state,
              })),
            }}
          />

          {/* ONLY SHOW Assembly Constituency if State is selected */}
          {mlaState && (
            <Input
              errors={errors}
              register={register}
              validations={{ required: "Assembly Constituency is required" }}
              id="mlaConstituency"
              title="Assembly Constituency"
              type="select"
              required
              selectField={{
                title: "select constituency",
                // filtering assembly constituency based on mla State
                options: assemblyConstituency
                  ?.filter((el) => el.stateid === mlaState)
                  ?.map((el) => ({ id: el.id, value: el.assembly_name })),
              }}
            />
          )}
        </>
      )}

      {/* Showing parliament house if designation is MP */}
      {designation && designation === LEADER_IDS.mpID && (
        <Input
          errors={errors}
          register={register}
          required
          validations={{
            required: "Parliament House is required",
            onChange(e) {
              setValue("politicalParty", "");
              const val = e.target.value;

              if (val === LEADER_IDS.lokSabhaID) {
                setValue("rajyaSabhaState", "");
                setValue("rajyaSabhaNominated", "");
              } else {
                setValue("lokSabhaConstituency", "");
                setValue("lokSabhaState", "");
              }
            },
          }}
          id="parliamentHouse"
          title="Parliament House"
          type="select"
          selectField={{
            title: "select parliament house",
            options: [
              {
                id: LEADER_IDS.lokSabhaID,
                value: "lok sabha",
              },
              {
                id: LEADER_IDS.rajyaSabhaID,
                value: "rajya sabha",
              },
            ],
          }}
        />
      )}

      {/* IF User selected LOK SABHA */}
      {parliamentHouse && parliamentHouse === LEADER_IDS.lokSabhaID && (
        <>
          <Input
            errors={errors}
            required
            register={register}
            validations={{ required: "State is required" }}
            id="lokSabhaState"
            title="State"
            type="select"
            selectField={{
              title: "select state",
              options: states?.map((el) => ({
                id: el.id,
                value: el.state,
              })),
            }}
          />

          {/* ONLY SHOW Parliamentary Constituency if State is selected */}
          {lokSabhaState && (
            <Input
              errors={errors}
              required
              register={register}
              validations={{
                required: "Parliament Constituency is required",
              }}
              id="lokSabhaConstituency"
              title="Parliamentary Constituency"
              type="select"
              selectField={{
                title: "select constituency",
                // filtering parliamentary constituency based on loksabha State
                options: parliamentaryConstituency
                  ?.filter((el) => el.stateid === lokSabhaState)
                  ?.map((el) => ({
                    id: el.id,
                    value: el.parliamentary_name,
                  })),
              }}
            />
          )}
        </>
      )}

      {/* IF User selected RAJYA SABHA */}
      {parliamentHouse && parliamentHouse === LEADER_IDS.rajyaSabhaID && (
        <>
          {/* ASKING IF User is nominated or not? */}
          <YesNoField
            errors={errors}
            id="rajyaSabhaNominated"
            question="Are you Nominated"
            register={register}
            required
            validations={{ required: "Question is necessary" }}
          />

          {rajyaSabhaNominated && rajyaSabhaNominated === "no" && (
            <Input
              errors={errors}
              required
              register={register}
              validations={{ required: "State is required" }}
              id="rajyaSabhaState"
              title="State"
              type="select"
              selectField={{
                title: "select state",
                options: states?.map((el) => ({
                  id: el.id,
                  value: el.state,
                })),
              }}
            />
          )}
        </>
      )}

      {/* Showing Political party once designation is selected */}
      {designation && (
        <Input
          errors={errors}
          required
          register={register}
          validations={{ required: "Political Party is required" }}
          id="politicalParty"
          title="Political Party"
          type="select"
          selectField={{
            title: "select political party",
            // Rendering party List
            options: parties?.map((el) => ({
              id: el.id,
              value: el.party_name,
            })),
          }}
        />
      )}

      {designation &&
        (designation === LEADER_IDS.mpID ||
          designation === LEADER_IDS.mlaID) && (
          <label
            htmlFor="holdMinistry"
            className="flex items-center cursor-pointer gap-2 mt-5 w-max col-span-3"
          >
            <span className="capitalize text-md">Hold any ministry?</span>
            <input
              type="checkbox"
              className="permission_checkbox hidden"
              id="holdMinistry"
              onChange={(e) => {
                setHasMinistry(e.target.checked);
                remove();
                e.target.checked ? append({ name: "", type: "" }) : remove();
              }}
              checked={hasMinistry}
            />
            <span className="un_checked_box">
              <MdOutlineCheckBoxOutlineBlank className="text-2xl text-cyan-800" />
            </span>
            <span className="checked_box hidden">
              <MdOutlineCheckBox className="text-2xl text-cyan-800" />
            </span>
          </label>
        )}

      {hasMinistry && (
        <div className="col-span-full flex flex-col gap-4">
          {fields.map((el, i) => (
            <div key={el.id} className="grid grid-cols-3 gap-x-4">
              <Input
                errors={errors}
                register={register}
                required
                validations={{ required: "Ministry Name is required" }}
                id={`ministries.${i}.name` as keyof LeaderFormFields}
                title="Ministry Name"
                type="select"
                selectField={{
                  title: "select Ministry",
                  options: [
                    {
                      id: "1",
                      value: "BJP",
                    },
                    {
                      id: "2",
                      value: "AAP",
                    },
                  ],
                }}
              />
              <Input
                errors={errors}
                register={register}
                required
                validations={{ required: "Ministry Type is required" }}
                id={`ministries.${i}.type` as keyof LeaderFormFields}
                title="Ministry Type"
                type="select"
                selectField={{
                  title: "select ministry type",
                  // Rendering party List
                  options: parties?.map((el) => ({
                    id: el.id,
                    value: el.party_name,
                  })),
                }}
              />
              {i !== 0 && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="outline-none justify-self-start self-center text-sm mt-5 capitalize py-2 px-4 rounded bg-rose-500 text-rose-50 hover:bg-rose-600 transition-all"
                >
                  remove ministry
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", type: "" })}
            className="outline-none self-start col-span-full text-sm mt-1 capitalize py-2 px-4 rounded bg-teal-500 text-teal-50 hover:bg-teal-600 transition-all"
          >
            add ministry
          </button>
        </div>
      )}
    </>
  );
};
