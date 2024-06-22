'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { EmerginLeaderInfo } from './components/EmergingLeaderInfo'
import { cusSelector, cusDispatch } from '@/redux_store/cusHooks'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { UserDetails } from '@/utils/typesUtils'
import { LeaderPoliticalInfo } from './components/LeaderPoliticalInfo'
interface LeaderPoliticalInfoProps {
  setPage: (data: string) => void;
}
export const LeaderPoliticalInfoFrom: FC<LeaderPoliticalInfoProps> = ({ setPage }) => {
  const { leaderOptions } = cusSelector((state) => state.common);
  const { leaderProfile } = cusSelector((state) => state.leader);
  const dispatch = cusDispatch();
  const { register, formState: { errors }, handleSubmit, watch, setValue, reset, control, } = useForm<UserDetails>()

  const formSubmitHandler = async (data: UserDetails) => {
    const resBody: UserDetails = {
      ...data,
      done_any_political_activity: data.doneAnyPoliticalActivity === 'yes' ? true : false,
      is_participated_in_elections: data.participatedInElection === 'yes' ? true : false,
      does_family_supports: data.familySupportedForPolitics === 'yes' ? true : false,
      is_prepare_for_elections: data.isprepareforelections === 'yes' ? true : false,
      is_nominated: data.rajyaSabhaNominated === 'yes' ? true : false,
      is_hold_ministry: data?.hasMinistry === 'yes' ? true : false
    };
    var political_info = { ...resBody, activity_pictures: resBody && resBody.activity_pictures || [] }
    dispatch(leaderActions.setLeaderProfile({ ...leaderProfile, 'political_info': political_info, }));
    setPage('2')
  }





  return (
    <form
      className='gap-y-5'
      onSubmit={handleSubmit(formSubmitHandler)}
    >
      <h2 className='text-4xl font-semibold col-span-full mb-5'>
        Political Information
      </h2>
      {leaderProfile?.leadertype == "emerging leader" ?
        <EmerginLeaderInfo
          assemblyConstituency={leaderOptions.assemblies}
          parliamentaryConstituency={leaderOptions.parliamentries}
          states={leaderOptions.states}
          designations={leaderOptions?.designations}
          parties={leaderOptions?.politicalparty}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
          reset={reset}
        />
        :
        <LeaderPoliticalInfo
          watch={watch}
          reset={reset}
          setValue={setValue}
          register={register}
          assemblyConstituency={leaderOptions.assemblies}
          parliamentaryConstituency={leaderOptions.parliamentries}
          states={leaderOptions.states}
          designations={leaderOptions?.designations}
          parties={leaderOptions?.politicalparty}
          control={control}
          ministries={leaderOptions?.ministries}
          errors={errors}
        />

      }
      <div className='flex justify-end col-span-full gap-2 mt-5'>
        <button
          onClick={() => { setPage('0') }}
          className='rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize '>
          Previous
        </button>
        <button
          className='rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize'
          type='submit'>
          Save
        </button>
      </div>
    </form>
  )
}
