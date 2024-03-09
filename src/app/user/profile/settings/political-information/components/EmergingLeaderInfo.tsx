import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import {
  LEADER_IDS,
  UserDetails,
  ParliamentaryConstituencyDetails,
  PartyDetails,
  StateDetails,
  AssemblyConstituencyDetails,
  DesignationDetails,
  yearlistfuture,
} from '@/utils/typesUtils'
import { ChangeEvent, FC, useState, useEffect } from 'react'
import { Input } from '../../../../../../components/Input'
import { YesNoField } from '../../../../../../components/YesNoField'
import { RiGalleryFill } from 'react-icons/ri'
import { BiX } from 'react-icons/bi'
import CustomImage from '@/utils/CustomImage'
import { cusSelector } from '@/redux_store/cusHooks'
import moment from 'moment'
import { uploadActivityPictures } from '@/redux_store/leader/leaderAPI'
import { ErrorMessage } from '@hookform/error-message'

interface EmerginLeaderInfoProps {
  watch: UseFormWatch<UserDetails>
  reset: UseFormReset<UserDetails>
  errors: FieldErrors<UserDetails>
  register: UseFormRegister<UserDetails>
  setValue: UseFormSetValue<UserDetails>
  control: Control<UserDetails>
  designations: DesignationDetails[]
  states: StateDetails[]
  parliamentaryConstituency: ParliamentaryConstituencyDetails[]
  assemblyConstituency: AssemblyConstituencyDetails[]
  parties: PartyDetails[]
}

export const EmerginLeaderInfo: FC<EmerginLeaderInfoProps> = ({
  control,
  errors,
  register,
  setValue,
  watch,
  reset,
  assemblyConstituency,
  designations,
  parliamentaryConstituency,
  parties,
  states,
}) => {

  const participatedInElection = watch('participatedInElection')
  const election = watch('elections') || watch('target_elections')
  const isprepareforelections = watch('isprepareforelections')
  const electionState = watch('election_stateid')
  const targetElection = watch('target_elections')
  const doneAnyPoliticalActivity = watch('doneAnyPoliticalActivity')
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { fields, append, remove } = useFieldArray({ name: 'activity_pictures', control, });
  const { fields: references, append: newRef, remove: removeRef, } = useFieldArray({ name: 'referencies', control, })
  const { political_info } = leaderProfile;
  useEffect(() => {
    reset({
      ...political_info,
      joined_date: moment(political_info?.joined_date).format("YYYY-MM-DD"),
      participatedInElection: political_info?.is_participated_in_elections ? 'yes' : 'no',
      doneAnyPoliticalActivity: leaderProfile.political_info?.done_any_political_activity ? 'yes' : 'no',
      isprepareforelections: leaderProfile.political_info?.is_prepare_for_elections ? 'yes' : 'no',
      familySupportedForPolitics: leaderProfile.political_info?.does_family_supports ? 'yes' : 'no',
      position: leaderProfile.political_info?.position
    });
  }, [political_info, reset]);


  return (
    <>
      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: 'Political Party is required' }}
        id='political_party_id'
        title='Political Party'
        type='select'
        selectField={{
          title: 'select political party',
          // Rendering party List
          options: parties?.map((el) => ({
            id: el.id,
            value: el.party_name,
          })),
        }}
      />
      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: 'Joined Date is required' }}
        id='joined_date'
        title='Joined Date'
        type='date'
      />

      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: 'Party Post is required' }}
        id='post_in_party'
        title='Post in Party'
        type='text'
        placeholder='chief'
      />

      <Input
        errors={errors}
        id='achievements'
        register={register}
        title='Political Achievements'
        type='textarea'
        required
        rows={4}
        fullWidth
      />

      <Input
        errors={errors}
        id='why_join_politics'
        register={register}
        title='Why did you join Politics?'
        type='textarea'
        required
        rows={4}
        fullWidth
      />

      <YesNoField
        errors={errors}
        fullWidth
        validations={{
          onChange(i) {
            setValue('elections', '')
          },
        }}
        register={register}
        id='participatedInElection'
        question='Have you participated in any type of Elections'
      />

      {participatedInElection === 'yes' && (
        <>
          <Input
            register={register}
            errors={errors}
            title={'Elections'}
            type='select'
            id={'elections'}
            required
            validations={{
              required: `Election is required`,
              onChange() {
                setValue('election_stateid', '')
                setValue('election_year', '')
                setValue('election_constituency_id', '')
              },
            }}
            selectField={{
              title: 'select election',
              options: designations.map((el) => ({
                id: el.id,
                value: el.designation,
              })),
            }}
          />

          <Input
            register={register}
            errors={errors}
            title='Year'
            type='select'
            id={'election_year'}
            required
            validations={{
              required: 'Year is required',
            }}
            selectField={{
              title: 'select year',
              options: yearlistfuture() as any
            }}
          />

          {/* Showing State if election is MLA/MP */}
          {election &&
            (election === LEADER_IDS.mlaID || election === LEADER_IDS.mpID) && (
              <>
                <Input
                  errors={errors}
                  register={register}
                  validations={{ required: 'State is required' }}
                  id='election_stateid'
                  title='State'
                  type='select'
                  required
                  selectField={{
                    title: 'select state',
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
                      required: 'Constituency is required',
                    }}
                    id={election === LEADER_IDS.mpID ? "election_parliamentary_constituency_id" : 'election_constituency_id'}
                    title='Constituency'
                    type='select'
                    required
                    selectField={{
                      title: 'select constituency',
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
                            .filter((el) => el?.stateid === electionState)
                            .map((el) => ({
                              id: el?.id,
                              value: el?.assembly_name,
                            })),
                    }}
                  />
                )}
              </>
            )
          }
          <>
            <Input
              errors={errors}
              register={register}
              title='Position'
              id='position'
              type='text'
              placeholder='2nd'
              validations={{
                required: 'Position is required.',
              }}
              required
            />
            <Input
              errors={errors}
              register={register}
              title='Opponents'
              id='opponents'
              type='text'
              required
              placeholder='Enter Comma Separated Values'
              validations={{
                required: 'Opponents is required.',
              }}
            />
          </>
        </>
      )}
      <YesNoField
        errors={errors}
        fullWidth
        validations={{
          onChange() {
            setValue('target_elections', '')
          },
        }}
        register={register}
        id='isprepareforelections'
        question='Are you preparing for any future elections'
      />

      {isprepareforelections === "yes" && (
        <>
          <Input
            register={register}
            errors={errors}
            title={'Elections'}
            type='select'
            id={'target_elections'}
            required
            validations={{
              required: `Election is required`,
            }}
            selectField={{
              title: 'select election',
              options: designations.map((el) => ({
                id: el.id,
                value: el.designation,
              })),
            }}
          />

          <Input
            register={register}
            errors={errors}
            title='Year'
            type='select'
            id={'target_election_year'}
            required
            validations={{
              required: 'Year is required',
            }}
            selectField={{
              title: 'select year',
              options: yearlistfuture() as any
            }}
          />
          <Input
            id='top_priorities'
            errors={errors}
            register={register}
            title={
              <>
                {' '}
                If you become{' '}
                {targetElection ? (
                  <span className='underline text-base text-gray-500 capitalize'>
                    {
                      // finding designation based on user selection then showing the designation in place of _____ (dash)
                      designations.find(
                        (el) => el.id === targetElection
                      )?.designation
                    }
                  </span>
                ) : (
                  '_____'
                )}{' '}
                then what will be your Top Priorities !{' '}
              </>
            }
            type='textarea'
            fullWidth
            rows={4}
          />
        </>
      )}


      <YesNoField
        errors={errors}
        fullWidth
        required
        validations={{
          required: 'Field is required',
          onChange(e) {
            const val = e.target.value

            if (val === 'yes') {
              remove()
              append({ description: '', pictures: [] })
            } else remove()
          },
        }}
        register={register}
        id='doneAnyPoliticalActivity'
        question='Have you done any Political Activity in Past'
      />

      {doneAnyPoliticalActivity && doneAnyPoliticalActivity === 'yes' && (
        <div className='col-span-full flex flex-col gap-3'>
          {fields.map((el, i) => {
            return (
              <Activity
                errors={errors}
                register={register}
                index={i}
                key={el.id}
                removeActivity={() => remove(i)}
                setValue={setValue}
                preserveValues={leaderProfile.political_info?.activity_pictures && leaderProfile.political_info?.activity_pictures[i]}
              />
            )
          })}

          <button
            type='button'
            onClick={() => append({ pictures: [], description: '' })}
            className='outline-none self-start col-span-full text-sm mt-1 capitalize py-2 px-4 rounded bg-teal-500 text-teal-50 hover:bg-teal-600 transition-all'>
            add More
          </button>
        </div>
      )}

      <YesNoField
        errors={errors}
        fullWidth
        required
        validations={{
          required: 'Field is required',
        }}
        register={register}
        id='familySupportedForPolitics'
        question='Does your family support you to join politics'
      />

      {/* MEMBERS IN Party */}
      <div className='col-span-full flex flex-col gap-4 mt-3'>
        <span className='font-medium'>
          How many people are there in your team?{' '}
          <strong className='text-red-500'>*</strong>
        </span>

        <div className='grid grid-cols-2 gap-5'>
          <PeopleCount register={register} value='50 - 100' />
          <PeopleCount register={register} value='100 - 500' />
          <PeopleCount register={register} value='500 - 1500' />
          <PeopleCount register={register} value='1500 - 3000' />
          <PeopleCount register={register} value='3000 - 5000' />
          <PeopleCount register={register} value='5000 - above' />
        </div>
      </div>

      {/* REFRENCES */}
      <div className='col-span-full flex flex-col gap-4'>
        <span className='font-medium text-lg'>References</span>
        {references.map((el, i) => (
          <div className='grid grid-cols-4 gap-4' key={el.id}>
            <Input
              errors={errors}
              register={register}
              id={`referencies.${i}.name` as keyof UserDetails}
              key={`referencies.${i}.name` as keyof UserDetails}
              title='Name'
              type='text'
              required
              validations={{ required: 'Reference Name is required' }}
            />
            <Input
              errors={errors}
              register={register}
              id={`referencies.${i}.age` as keyof UserDetails}
              key={`referencies.${i}.age` as keyof UserDetails}
              title='Age'
              type='text'
              required
              placeholder='XX'
              validations={{ required: 'Reference Age is required' }}
            />
            <Input
              errors={errors}
              register={register}
              id={`referencies.${i}.mobile` as keyof UserDetails}
              key={`referencies.${i}.mobile` as keyof UserDetails}
              title='Mobile No'
              type='text'
              required
              placeholder='XXXXXXXXXX'
              validations={{
                required: 'Reference Mobile no is required',
                validate: {
                  validMobileNo(no) {
                    return (
                      no?.toString().length === 10 ||
                      'Please Enter a Valid Number'
                    )
                  },
                },
              }}
            />

            {i !== 0 && (
              <button
                type='button'
                onClick={() => removeRef(i)}
                className='outline-none justify-self-start self-end text-sm capitalize py-2 px-4 rounded bg-rose-500 text-rose-50 hover:bg-rose-600 transition-all'>
                remove reference
              </button>
            )}
          </div>
        ))}
        {references.length < 5 && (
          <button
            type='button'
            onClick={() => newRef({ age: undefined, mobile: undefined, name: undefined })}
            className='outline-none self-start col-span-full text-sm mt-1 capitalize py-2 px-4 rounded bg-teal-500 text-teal-50 hover:bg-teal-600 transition-all'>
            add Reference
          </button>
        )}
      </div>
    </>
  )
}

const Activity: FC<{
  errors: FieldErrors<UserDetails>
  register: UseFormRegister<UserDetails>
  index: number
  removeActivity: () => void
  setValue: UseFormSetValue<UserDetails>
  preserveValues: any
}> = ({ errors, register, index, removeActivity, setValue, preserveValues }) => {
  const [activityImg, setActivityImg] = useState(preserveValues.pictures || []);
  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('pictures', files[i]); // Assuming the server expects an array with the name 'pictures[]'
      }
      const profileRes = await uploadActivityPictures(formData);
      setValue(`activity_pictures.${index}.pictures`, profileRes.data);
      setActivityImg(profileRes.data);
    }
  }

  return (
    <div className='w-full flex gap-4'>
      <div className='w-full flex flex-col gap-3 relative'>
        <div className='flex flex-row gap-3 relative'>
          {activityImg.length > 0 && (
            activityImg.map((image: string, imgIndex: number) => {
              return (
                <div className='relative' key={image}>
                  <button
                    type='button'
                    key={imgIndex}
                    onClick={() => {
                      const updatedImageList = activityImg?.filter((el: string) => el !== image);
                      setActivityImg(updatedImageList);
                      setValue(`activity_pictures.${index}.pictures`, updatedImageList);
                    }}
                    className='text-2xl absolute top-2 right-2 w-6 aspect-square rounded-full bg-opacity-50 bg-slate-500 flex justify-center items-center text-red-50 hover:bg-opacity-70'>
                    <BiX />
                  </button>

                  <CustomImage
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
                    alt=''
                    key={image}
                    className='w-36 aspect-square bg-red-500 object-cover object-center'
                    width={200}
                    height={200}
                  />
                </div>
              )
            })
          )}
        </div>
        <div className='w-full flex flex-row gap-3'>
          <label
            htmlFor={`activity_pictures.${index}.pictures`}
            className='flex items-center gap-2 cursor-pointer mb-auto w-44'>
            <input
              id={`activity_pictures.${index}.pictures`}
              type='file'
              multiple
              className='hidden'
              {...register(`activity_pictures.${index}.pictures`, {
                // required: 'Field is required',
                onChange: async (e: ChangeEvent<HTMLInputElement>) => {
                  onChangeHandler(e);
                }
              })}
            />
            <span>{activityImg.length > 0 ? 'Add' : 'Upload'} Picture</span>
            <RiGalleryFill className='text-2xl' />
          </label>

          <label htmlFor={`activity_pictures.${index}.description`} className='w-full'>
            <textarea
              {...register(`activity_pictures.${index}.description`, {
                required: 'Field is required',
              })}
              placeholder='description about the picture uploaded'
              id={`activity_pictures.${index}.description`}
              className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border ${errors.activity_pictures && errors.activity_pictures[index]?.description
                ? 'bg-red-100 text-red-500 border-red-400'
                : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
                }`}
              rows={3}></textarea>
          </label>
        </div>
        <ErrorMessage
          as={'span'}
          errors={errors}
          name={`activity_pictures.${index}.pictures`}
          className='text-sm text-red-500'
        />
        {index !== 0 && (
          <button
            type='button'
            onClick={removeActivity}
            className='text-2xl mb-auto w-6 aspect-square rounded-full bg-red-500 flex justify-center items-center text-red-50 hover:bg-red-600'>
            <BiX />
          </button>
        )}
      </div>
    </div>
  )
}

const PeopleCount: FC<{
  register: UseFormRegister<UserDetails>
  value: string
}> = ({ register, value }) => {
  return (
    <label
      htmlFor={value}
      className='flex gap-2 items-center cursor-pointer w-max'>
      <input
        type='radio'
        className='checkbox hidden'
        {...register('people_in_team', {
          required: 'People Count is required',
        })}
        id={value}
        value={value}
      />
      <span className='select-none w-5 aspect-square rounded-full inline-block relative border-cyan-600 border-4 cursor-pointer after:bg-cyan-600 after:w-4/6 after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0' />
      <span className='font-medium'>{value.split('-').join(' - ')}</span>
    </label>
  )
}
