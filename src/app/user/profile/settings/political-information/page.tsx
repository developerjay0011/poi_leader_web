'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { LeaderPoliticalInfo } from './components/LeaderPoliticalInfo'
import { UserDetails } from '@/utils/typesUtils'
import { EmerginLeaderInfo } from './components/EmergingLeaderInfo'
import Link from 'next/link'

const PoliticalInformationPage: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm<UserDetails>()

  return (
    <form className='grid grid-cols-2 gap-x-4 gap-y-5'>
      <h2 className='text-4xl font-semibold col-span-full mb-5'>
        Political Information
      </h2>

      <EmerginLeaderInfo
        assemblyConstituency={[]}
        control={control}
        designations={[]}
        errors={errors}
        parliamentaryConstituency={[]}
        parties={[]}
        register={register}
        setValue={setValue}
        states={[]}
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
