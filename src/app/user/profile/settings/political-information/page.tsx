'use client'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LeaderPoliticalInfo } from './components/LeaderPoliticalInfo'
import { UserDetails } from '@/utils/typesUtils'
import { EmerginLeaderInfo } from './components/EmergingLeaderInfo'
import Link from 'next/link'
import { commonActions } from "@/redux_store/common/commonSlice";

import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { cusSelector, cusDispatch } from '@/redux_store/cusHooks'
import { getLeadersOptions } from '@/redux_store/common/commonAPI'

const PoliticalInformationPage: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm<UserDetails>()
  const [dropDownArr, setDropDownArr] = useState('')
  const { leaderOptions } = cusSelector((state) => state.common)
  const dispatch = cusDispatch();
  
  useEffect(() => {
    (async () => {
      const LeadersDropdown = await getLeadersOptions();
      dispatch(commonActions.setLeaderOptions(LeadersDropdown))
 
    })();
  }, [dispatch]);
  return (
    <form className='grid grid-cols-2 gap-x-4 gap-y-5'>
      <h2 className='text-4xl font-semibold col-span-full mb-5'>
        Political Information
      </h2>

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
      />

      <div className='flex justify-end col-span-full gap-2 mt-5'>
        <Link
          href={'/user/profile'}
          className='rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50'>
          close
        </Link>
        <button
          className='rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize'
          type='submit'>
          Save
        </button>
      </div>
    </form>
  )
}

export default PoliticalInformationPage
