import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";

import { FC, useState, useTransition } from "react";
import { Input } from "./Input";
import { YesNoField } from "./YesNoField";

import { RiGalleryFill } from "react-icons/ri";
import { BiLoaderAlt, BiX } from "react-icons/bi";
import {
  AssemblyConstituencyDetails,
  DesignationDetails,
  LeaderFormFields,
  ParliamentaryConstituencyDetails,
  PartyDetails,
  StateDetails,
} from "./AddLeaderPage";
import { LEADER_IDS } from "@/utils/typesUtils";
import {
  convertFileToBase64,
  convertFileToBase64Emergin,
} from "@/utils/utility";

interface EmerginLeaderInfoProps {
  watch: UseFormWatch<LeaderFormFields>;
  errors: FieldErrors<LeaderFormFields>;
  register: UseFormRegister<LeaderFormFields>;
  setValue: UseFormSetValue<LeaderFormFields>;
  control: Control<LeaderFormFields>;
  designations: DesignationDetails[];
  states: StateDetails[];
  parliamentaryConstituency: ParliamentaryConstituencyDetails[];
  assemblyConstituency: AssemblyConstituencyDetails[];
  parties: PartyDetails[];
}

const minYear = 1951;

const curYear = new Date().getFullYear();

const electionYears: string[] = [];
const targetYears: string[] = [];
const maxYear = curYear + 10;

for (let year = curYear; year >= minYear; year--) {
  electionYears.push(year.toString());
}

for (let year = maxYear; year >= curYear; year--) {
  targetYears.push(year.toString());
}

export const EmerginLeaderInfo: FC<EmerginLeaderInfoProps> = ({
  control,
  errors,
  register,
  setValue,
  watch,
  assemblyConstituency,
  designations,
  parliamentaryConstituency,
  parties,
  states,
}) => {
  const participatedInElection = watch("participatedInElection");
  const election = watch("election") || watch("targetElection");
  const electionState = watch("electionState");
  const targetElection = watch("targetElection");
  const doneAnyPoliticalActivity = watch("doneAnyPoliticalActivity");
  const preparingForFutureElections = watch("preparingForFutureElections");

  const { fields, append, remove } = useFieldArray({
    name: "activities",
    control,
  });

  const {
    fields: references,
    append: newRef,
    remove: removeRef,
  } = useFieldArray({
    name: "references",
    control,
  });

  return (
    <>
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
          options: parties.map((el) => ({
            id: el.id,
            value: el.party_name,
          })),
        }}
      />
      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: "Joined Date is required" }}
        id="joinedDate"
        title="Joined Date"
        type="date"
      />
      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: "Party Post is required" }}
        id="postInParty"
        title="Post in Party"
        type="text"
        placeholder="chief"
      />

      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: "Party Post is required" }}
        id="politicalAchievements"
        title="Political Achievements"
        type="textarea"
        rows={4}
      />

      <Input
        errors={errors}
        register={register}
        id="whyYouJoinedPolitics"
        title="Why did you join Politics?"
        type="textarea"
        rows={4}
      />

      <YesNoField
        errors={errors}
        fullWidth
        validations={{
          onChange() {
            setValue("targetElection", "");
            setValue("election", "");
          },
        }}
        register={register}
        id="participatedInElection"
        question="Have you participated in any type of Elections"
      />

      {participatedInElection && participatedInElection === "yes" && (
        <>
          <Input
            register={register}
            errors={errors}
            title={"Elections"}
            type="select"
            id={"election"}
            required
            validations={{
              required: `Election is required`,
              onChange() {
                // Resetting all Fields

                setValue("targetElectionConstituency", "");
                setValue("electionState", "");
                setValue("targetElectionYear", "");
                setValue("electionYear", "");
                setValue("electionConstituency", "");
              },
            }}
            selectField={{
              title: "select election",
              options: designations.map((el) => ({
                id: el.id,
                value: el.designation,
              })),
            }}
          />

          {/* Showing State if election is MLA/MP */}
          {election &&
            (election === LEADER_IDS.mlaID || election === LEADER_IDS.mpID) && (
              <>
                <Input
                  errors={errors}
                  register={register}
                  validations={{ required: "State is required" }}
                  id="electionState"
                  title="State"
                  type="select"
                  required
                  selectField={{
                    title: "select state",
                    options: states.map((el) => ({
                      id: el.id,
                      value: el.state,
                    })),
                  }}
                />

                {/* Show Assembly Constituency if election is MLA and Parliamentary If Election is MP */}
                {electionState && (
                  <Input
                    errors={errors}
                    register={register}
                    validations={{
                      required: "Constituency is required",
                    }}
                    id="electionConstituency"
                    title="Constituency"
                    type="select"
                    required
                    selectField={{
                      title: "select constituency",
                      // Setting otions consitionally based on election selected like: IF Election is MP then parliamentary ELSE Assembly
                      options:
                        election === LEADER_IDS.mpID
                          ? parliamentaryConstituency
                            .filter((el) => el.stateid === electionState)
                            .map((el) => ({
                              id: el.id,
                              value: el.parliamentary_name,
                            }))
                          : assemblyConstituency
                            .filter((el) => el.stateid === electionState)
                            .map((el) => ({
                              id: el.id,
                              value: el.assembly_name,
                            })),
                    }}
                  />
                )}
              </>
            )}

          <Input
            register={register}
            errors={errors}
            title="Year"
            type="select"
            id={"electionYear"}
            required
            validations={{
              required: "Year is required",
            }}
            selectField={{
              title: "select year",
              options: electionYears.map((el) => ({ id: el, value: el })),
            }}
          />

          <Input
            errors={errors}
            register={register}
            title="Position"
            id="position"
            type="text"
            placeholder="2nd"
            validations={{
              required: "Position is required.",
            }}
            required
          />
          <Input
            errors={errors}
            register={register}
            title="Opponents"
            id="opponents"
            type="text"
            required
            placeholder="Enter Comma Separated Values"
            validations={{
              required: "Opponents is required.",
            }}
          />
        </>
      )}

      <YesNoField
        errors={errors}
        fullWidth
        validations={{
          onChange() {
            setValue("targetElection", "");
          },
        }}
        register={register}
        id="preparingForFutureElections"
        question="Are you preparing for any future elections"
      />

      {preparingForFutureElections && preparingForFutureElections === "yes" && (
        <>
          <Input
            register={register}
            errors={errors}
            title={"Target Elections"}
            type="select"
            id={"targetElection"}
            required
            validations={{
              required: `Election is required`,
              onChange() {
                // Resetting all Fields

                setValue("targetElectionConstituency", "");
                setValue("electionState", "");
                setValue("targetElectionYear", "");
                setValue("electionYear", "");
                setValue("electionConstituency", "");
              },
            }}
            selectField={{
              title: "select election",
              options: designations.map((el) => ({
                id: el.id,
                value: el.designation,
              })),
            }}
          />

          <Input
            register={register}
            errors={errors}
            title="Year"
            type="select"
            id={"targetElectionYear"}
            required
            validations={{
              required: "Year is required",
            }}
            selectField={{
              title: "select year",
              options: targetYears.map((el) => ({ id: el, value: el })),
            }}
          />

          <Input
            errors={errors}
            register={register}
            fullWidth
            title={
              <>
                If you become{" "}
                {targetElection ? (
                  <span className="underline text-base text-gray-500 capitalize">
                    {
                      // finding designation based on user selection then showing the designation in place of _____ (dash)
                      designations.find((el) => el.id === targetElection)
                        ?.designation
                    }
                  </span>
                ) : (
                  "_____"
                )}{" "}
                then what will be your Top Priorities !{" "}
              </>
            }
            id="topTenPriorities"
            type="textarea"
            required
            placeholder="Enter Comma Separated Values"
            validations={{ required: "field is required" }}
          />
        </>
      )}

      <YesNoField
        errors={errors}
        fullWidth
        required
        validations={{
          required: "Field is required",
          onChange(e) {
            const val = e.target.value;

            if (val === "yes") {
              remove();
              append({ description: "", img: [] });
            } else remove();
          },
        }}
        register={register}
        id="doneAnyPoliticalActivity"
        question="Have you done any Political Activity in Past "
      />

      {doneAnyPoliticalActivity && doneAnyPoliticalActivity === "yes" && (
        <div className="col-span-full flex flex-col gap-3">
          {fields.map((el, i) => {
            return (
              <Activity
                errors={errors}
                register={register}
                index={i}
                key={el.id}
                removeActivity={() => remove(i)}
                setValue={setValue}
              />
            );
          })}

          <button
            type="button"
            onClick={() => append({ img: [], description: "" })}
            className="outline-none self-start col-span-full text-sm mt-1 capitalize py-2 px-4 rounded bg-teal-500 text-teal-50 hover:bg-teal-600 transition-all"
          >
            add More
          </button>
        </div>
      )}

      <YesNoField
        errors={errors}
        fullWidth
        required
        validations={{
          required: "Field is required",
        }}
        register={register}
        id="familySupportedForPolitics"
        question="Does your family support you to join politics"
      />

      {/* MEMBERS IN Party */}
      <div className="col-span-full flex flex-col gap-4 mt-3">
        <span className="font-medium">
          How many people are there in your team?{" "}
          <strong className="text-red-500">*</strong>
        </span>

        <div className="grid grid-cols-2 gap-5">
          <PeopleCount register={register} value="50-100" />
          <PeopleCount register={register} value="100-500" />
          <PeopleCount register={register} value="500-1500" />
          <PeopleCount register={register} value="1500-3000" />
          <PeopleCount register={register} value="3000-5000" />
          <PeopleCount register={register} value="5000-above" />
        </div>
      </div>

      {/* REFRENCES */}
      <div className="col-span-full flex flex-col gap-4">
        <span className="font-medium text-lg">References</span>
        {references.map((el, i) => (
          <div className="grid grid-cols-4 gap-4" key={el.id}>
            <Input
              errors={errors}
              register={register}
              id={`references.${i}.name` as keyof LeaderFormFields}
              title="Name"
              type="text"
              required
              validations={{ required: "Reference Name is required" }}
            />
            <Input
              errors={errors}
              register={register}
              id={`references.${i}.age` as keyof LeaderFormFields}
              title="Age"
              type="text"
              required
              placeholder="XX"
              validations={{ required: "Reference Age is required" }}
            />
            <Input
              errors={errors}
              register={register}
              id={`references.${i}.mobileNo` as keyof LeaderFormFields}
              title="Mobile No"
              type="number"
              required
              placeholder="XXXXXXXXXX"
              validations={{
                required: "Reference Mobile no is required",
                validate: {
                  validMobileNo(no) {
                    return (
                      no.toString().length === 10 ||
                      "Please Enter a Valid Number"
                    );
                  },
                },
              }}
            />

            {i !== 0 && (
              <button
                type="button"
                onClick={() => removeRef(i)}
                className="outline-none justify-self-start self-end text-sm capitalize py-2 px-4 rounded bg-rose-500 text-rose-50 hover:bg-rose-600 transition-all"
              >
                remove reference
              </button>
            )}
          </div>
        ))}
        {references.length < 5 && (
          <button
            type="button"
            onClick={() => newRef({ age: "", mobileNo: "", name: "" })}
            className="outline-none self-start col-span-full text-sm mt-1 capitalize py-2 px-4 rounded bg-teal-500 text-teal-50 hover:bg-teal-600 transition-all"
          >
            add Reference
          </button>
        )}
      </div>
    </>
  );
};

const Activity: FC<{
  errors: FieldErrors<LeaderFormFields>;
  removeActivity: () => void;
  register: UseFormRegister<LeaderFormFields>;
  index: number;
  setValue: UseFormSetValue<LeaderFormFields>;
}> = ({ errors, register, index, removeActivity, setValue }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ActivityImg index={index} register={register} setValue={setValue} />

      <label
        htmlFor={`activities.${index}.description`}
        className="w-1/2 flex gap-5"
      >
        <textarea
          {...register(`activities.${index}.description`, {
            required: "Field is required",
          })}
          placeholder="description about the picture uploaded"
          id={`activities.${index}.description`}
          className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border ${errors.activities?.[index]?.description
              ? "bg-red-100 text-red-500 border-red-400"
              : "focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50"
            }`}
          rows={3}
        ></textarea>
        {index !== 0 && (
          <button
            type="button"
            onClick={removeActivity}
            className="text-2xl mb-auto w-6 aspect-square rounded-full bg-red-500 flex justify-center items-center text-red-50 hover:bg-red-600"
          >
            <BiX />
          </button>
        )}
      </label>
    </div>
  );
};

const ActivityImg: FC<{
  register: UseFormRegister<LeaderFormFields>;
  index: number;
  setValue: UseFormSetValue<LeaderFormFields>;
}> = ({ index, register, setValue }) => {
  const [activityImg, setActivityImg] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();
  const [uploadingImg, setUploadingImg] = useState(false);

  return (
    <div className="flex flex-col gap-3 relative">
      <label
        htmlFor={`activities.${index}.img`}
        className="flex items-center gap-2 cursor-pointer mb-auto"
      >
        <input
          id={`activities.${index}.img`}
          type="file"
          multiple
          className="hidden"
          {...register(`activities.${index}.img`, {
            required: "Field is required",
          })}
          onChange={async (e) => {
            setUploadingImg(true);
            const files = e.target.files as FileList;

            if (!files) return (e.target.value = "");

            const images: string[] = [];

            for (let f = 0; f < files.length; f++) {
              const file = files[f];
              if (!file.type.includes("image")) continue;

              const data = await convertFileToBase64Emergin(file);

              images.push(data.base64);
            }
            setUploadingImg(false);

            e.target.value = ""; // resetting input field

            startTransition(() =>
              setActivityImg((lst) => {
                const updatedImages = [...lst];

                for (let im = 0; im < images.length; im++) {
                  const image = images[im];
                  if (updatedImages.some((upImg) => upImg === image)) continue;

                  updatedImages.push(image);
                }

                // Setting images value
                setValue(`activities.${index}.img`, updatedImages);
                return updatedImages;
              })
            ); // Setting Images
          }}
        />
        <span>Upload Pictures</span>
        <RiGalleryFill className="text-2xl" />
        {(pending || uploadingImg) && (
          <BiLoaderAlt className="text-2xl animate-spin text-cyan-500" />
        )}
      </label>

      {activityImg.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {pending &&
            Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className="w-24 aspect-square bg-gray-200 animate-pulse"
              />
            ))}
          {!pending &&
            activityImg.map((el, i) => {
              return (
                <section
                  className="relative"
                  key={i + `activities.${index}.img`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      startTransition(() =>
                        setActivityImg((lst) => {
                          const images = [...lst];
                          images.splice(i, 1);

                          setValue(`activities.${index}.img`, images);
                          return images;
                        })
                      );
                    }}
                    className="text-2xl absolute top-1 right-1 w-6 aspect-square rounded-full bg-opacity-50 bg-slate-500 flex justify-center items-center text-red-50 hover:bg-opacity-70"
                  >
                    <BiX />
                  </button>
                  <img
                    src={el}
                    alt=""
                    className="w-24 aspect-square object-cover object-center"
                  />
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
};

const PeopleCount: FC<{
  register: UseFormRegister<LeaderFormFields>;
  value: string;
}> = ({ register, value }) => {
  return (
    <label
      htmlFor={value}
      className="flex gap-2 items-center cursor-pointer w-max"
    >
      <input
        type="radio"
        className="checkbox hidden"
        {...register("peopleInTeam", {
          required: "People Count is required",
        })}
        id={value}
        value={value}
      />
      <span className="select-none w-5 aspect-square rounded-full inline-block relative border-cyan-600 border-4 cursor-pointer after:bg-cyan-600 after:w-4/6 after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0" />
      <span className="font-medium">{value.split("-").join(" - ")}</span>
    </label>
  );
};
