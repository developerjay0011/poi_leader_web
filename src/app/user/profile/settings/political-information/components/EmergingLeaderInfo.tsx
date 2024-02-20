import {
  Control,
  FieldErrors,
  UseFormRegister,
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
} from '@/utils/typesUtils'
import { ChangeEvent, FC, useState,useEffect } from 'react'
import { Input } from '../../../../../../components/Input'
import { YesNoField } from '../../../../../../components/YesNoField'
import { ErrorMessage } from '@hookform/error-message'
import { RiGalleryFill } from 'react-icons/ri'
import { BiX } from 'react-icons/bi'
import { convertFileToBase64 } from '@/utils/utility'
import CustomImage from '@/utils/CustomImage'
import { cusSelector } from '@/redux_store/cusHooks'
import moment from 'moment'

interface EmerginLeaderInfoProps {
  watch: UseFormWatch<UserDetails>
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
  assemblyConstituency,
  designations,
  parliamentaryConstituency,
  parties,
  states,
}) => {

  const participatedInElection = watch('participatedInElection')
  const election = watch('election') || watch('targetElection')
  const electionState = watch('electionState')
  const targetElection = watch('targetElection')
  const doneAnyPoliticalActivity = watch('doneAnyPoliticalActivity')
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { fields, append, remove } = useFieldArray({
    name: 'activities',
    control,
  })

  const {
    fields: references,
    append: newRef,
    remove: removeRef,
  } = useFieldArray({
    name: 'references',
    control,
  })
  useEffect(() => {
    setValue('politicalParty', leaderProfile?.political_info?.political_party || '');
    setValue('joinedDate', moment(leaderProfile?.political_info?.joined_date).format("YYYY-MM-DD"));
    setValue('postInParty', leaderProfile?.political_info?.post_in_party || '');
    setValue('politicalAchievements', leaderProfile?.political_info?.achievements || '');
    setValue('whyYouJoinedPolitics', leaderProfile?.political_info?.why_join_politics || '');
    setValue('participatedInElection',leaderProfile?.political_info?.is_participated_in_elections ? 'yes' : 'no');


  }, [parties]);

  return (
    <>
      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: 'Political Party is required' }}
        id='politicalParty'
        title='Political Party'
        type='select'
        selectField={{
          title: 'select political party',
          // Rendering party List
          options: parties?.map((el) => ({
            id: el.party_name,
            value: el.party_name,
          })),
        }}
      />
      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: 'Joined Date is required' }}
        id='joinedDate'
        title='Joined Date'
        type='date'
      />

      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: 'Party Post is required' }}
        id='postInParty'
        title='Post in Party'
        type='text'
        placeholder='chief'
      />

      <Input
        errors={errors}
        id='politicalAchievements'
        register={register}
        title='Political Achievements'
        type='textarea'
        required
        rows={4}
        fullWidth
      />

      <Input
        errors={errors}
        id='whyYouJoinedPolitics'
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
          onChange() {
            setValue('targetElection', '')
            setValue('election', '')
          },
        }}
        register={register}
        id='participatedInElection'
        question='Have you participated in any type of Elections'
      />

      {participatedInElection && (
        <>
          <Input
            register={register}
            errors={errors}
            title={
              participatedInElection === 'yes'
                ? 'Elections'
                : 'Target Elections'
            }
            type='select'
            id={
              participatedInElection === 'yes' ? 'election' : 'targetElection'
            }
            required
            validations={{
              required: `Election is required`,
              onChange() {
                // Resetting all Fields

                setValue('targetElectionConstituency', '')
                setValue('electionState', '')
                setValue('targetElectionYear', '')
                setValue('electionYear', '')
                setValue('electionConstituency', '')
              },
            }}
            selectField={{
              title: 'select election',
              options: designations.map((el) => ({
                id: el.designationId,
                value: el.designationName,
              })),
            }}
          />

          <Input
            register={register}
            errors={errors}
            title='Year'
            type='select'
            id={
              participatedInElection === 'yes'
                ? 'electionYear'
                : 'targetElectionYear'
            }
            required
            validations={{
              required: 'Year is required',
            }}
            selectField={{
              title: 'select year',
              options: [
                {
                  id: LEADER_IDS.mlaID,
                  value: 'MLA',
                },
                {
                  id: LEADER_IDS.mpID,
                  value: 'MP',
                },
              ],
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
                  id='electionState'
                  title='State'
                  type='select'
                  required
                  selectField={{
                    title: 'select state',
                    options: states.map((el) => ({
                      id: el.stateId,
                      value: el.stateName,
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
                    id='electionConstituency'
                    title='Constituency'
                    type='select'
                    required
                    selectField={{
                      title: 'select constituency',
                      // Setting otions consitionally based on election selected like: IF Election is MP then parliamentary ELSE Assembly
                      options:
                        election === LEADER_IDS.mpID
                          ? parliamentaryConstituency
                              .filter((el) => el.stateId === electionState)
                              .map((el) => ({
                                id: el.parliamentaryId,
                                value: el.parliamentaryName,
                              }))
                          : assemblyConstituency
                              .filter((el) => el.stateId === electionState)
                              .map((el) => ({
                                id: el.assemblyId,
                                value: el.assemblyName,
                              })),
                    }}
                  />
                )}
              </>
            )}
        </>
      )}

      {participatedInElection && participatedInElection === 'yes' && (
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
      )}

      {participatedInElection && participatedInElection === 'no' && (
        <Input
          id='topTenPriorities'
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
                      (el) => el.designationId === targetElection
                    )?.designationName
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
              append({ description: '', img: '' })
            } else remove()
          },
        }}
        register={register}
        id='doneAnyPoliticalActivity'
        question='Have you done any Political Activity in Past '
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
              />
            )
          })}

          <button
            type='button'
            onClick={() => append({ img: '', description: '' })}
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
          <PeopleCount register={register} value='50-100' />
          <PeopleCount register={register} value='100-500' />
          <PeopleCount register={register} value='500-1500' />
          <PeopleCount register={register} value='1500-3000' />
          <PeopleCount register={register} value='3000-5000' />
          <PeopleCount register={register} value='5000-above' />
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
              id={`references.${i}.name` as keyof UserDetails}
              title='Name'
              type='text'
              required
              validations={{ required: 'Reference Name is required' }}
            />
            <Input
              errors={errors}
              register={register}
              id={`references.${i}.age` as keyof UserDetails}
              title='Age'
              type='text'
              required
              placeholder='XX'
              validations={{ required: 'Reference Age is required' }}
            />
            <Input
              errors={errors}
              register={register}
              id={`references.${i}.mobileNo` as keyof UserDetails}
              title='Mobile No'
              type='text'
              required
              placeholder='XXXXXXXXXX'
              validations={{
                required: 'Reference Mobile no is required',
                validate: {
                  validMobileNo(no) {
                    return (
                      no.toString().length === 10 ||
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
            onClick={() => newRef({ age: '', mobileNo: '', name: '' })}
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
}> = ({ errors, register, index, removeActivity, setValue }) => {
  const [activityImg, setActivityImg] = useState('')

  return (
    <div className='w-full flex gap-4'>
      <div className='flex flex-col gap-3 relative'>
        {activityImg && (
          <>
            <button
              type='button'
              onClick={() => {
                setActivityImg('')
                setValue(`activities.${index}.img`, '')
              }}
              className='text-2xl absolute top-2 right-2 w-6 aspect-square rounded-full bg-opacity-50 bg-slate-500 flex justify-center items-center text-red-50 hover:bg-opacity-70'>
              <BiX />
            </button>

            <CustomImage
              src={activityImg}
              alt=''
              className='w-36 aspect-square bg-red-500 object-cover object-center'
            />
          </>
        )}

        <label
          htmlFor={`activities.${index}.img`}
          className='flex items-center gap-2 cursor-pointer mb-auto'>
          <input
            id={`activities.${index}.img`}
            type='file'
            // accept=''
            className='hidden'
            {...register(`activities.${index}.img`, {
              required: 'Field is required',
              onChange: async (e: ChangeEvent<HTMLInputElement>) => {
                const file = (e.target.files as FileList)[0]

                e.target.value = '' // resetting input field

                if (!file) return

                if (!file.type.includes('image')) return

                const data = await convertFileToBase64(file)

                setActivityImg(data)
                setValue(`activities.${index}.img`, data)
              },
            })}
          />
          <span>Upload Picture</span>
          <RiGalleryFill className='text-2xl' />
        </label>
      </div>

      <label htmlFor={`activities.${index}.description`} className=''>
        <textarea
          {...register(`activities.${index}.description`, {
            required: 'Field is required',
          })}
          placeholder='description about the picture uploaded'
          id={`activities.${index}.description`}
          className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border ${
            errors.activities
              ? 'bg-red-100 text-red-500 border-red-400'
              : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
          }`}
          rows={3}></textarea>
      </label>

      {index !== 0 && (
        <button
          type='button'
          onClick={removeActivity}
          className='text-2xl mb-auto w-6 aspect-square rounded-full bg-red-500 flex justify-center items-center text-red-50 hover:bg-red-600'>
          <BiX />
        </button>
      )}
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
        {...register('peopleInTeam', {
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
