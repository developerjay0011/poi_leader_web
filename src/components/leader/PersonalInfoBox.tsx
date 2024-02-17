"use client";
import { cusSelector } from '@/redux_store/cusHooks'
import { CommonBox } from '@/utils/CommonBox'
import { dateConverterNumeric } from '@/utils/utility';
import { FC } from 'react'
import { BiBriefcaseAlt, BiLogoGmail } from 'react-icons/bi'
import { FaTransgenderAlt } from 'react-icons/fa'
import {
  FaCakeCandles,
  FaGlobe,
  FaHandshake,
  FaPhone,
  FaUser,
} from 'react-icons/fa6'
import { MdBloodtype } from 'react-icons/md'

interface PersonalInfoBoxProps {}
export const PersonalInfoBox: FC<PersonalInfoBoxProps> = () => {
  const { leaderProfile } = cusSelector((state) => state.leader);

  return (
    <>
      <CommonBox title='Personal info' width=''>
        <section className='py-6'>
          {/* MORE INFO */}
          <div className='grid grid-cols-2 gap-y-8 max-[400px]:grid-cols-1'>
            {/* ABOUT */}
            <PersonalBriefInfo
              Icon={FaUser}
              data='R.K. Singh is known for his expertise in the energy sector and has
              been actively involved in implementing policies related to power
              and renewable energy in India. He has been instrumental in
              promoting clean and sustainable energy sources and driving
              initiatives for electricity access and affordability'
              heading='About me:'
              className='col-span-full'
            />
            <PersonalBriefInfo
              Icon={FaCakeCandles}
              data={leaderProfile?.personal_info?.dob && dateConverterNumeric(leaderProfile?.personal_info?.dob)}
              heading='Date of Birth:'
            />

            <PersonalBriefInfo
              Icon={FaPhone}
              data={`+91 ${leaderProfile?.mobile}`}
              heading='(IN) Phone no:'
            />

            <PersonalBriefInfo
              Icon={FaTransgenderAlt}
              data={leaderProfile?.personal_info?.gender}
              heading='Gender: '
            />

            <PersonalBriefInfo
              Icon={MdBloodtype}
              data={leaderProfile.personal_info?.blood_group}
              heading='Blood Group: '
            />

            <PersonalBriefInfo
              Icon={BiLogoGmail}
              data={leaderProfile?.email}
              heading='Email: '
              className='col-span-full'
            />

            <PersonalBriefInfo
              Icon={BiBriefcaseAlt}
              data={leaderProfile.political_info?.designation_id}
              heading='Designation: '
              className='col-span-full'
            />

            <PersonalBriefInfo Icon={FaGlobe} data='India' heading='Country' />

            <PersonalBriefInfo
              Icon={FaHandshake}
              data={leaderProfile.political_info?.joined_date && dateConverterNumeric(leaderProfile.political_info?.joined_date)}
              heading='Joined: '
            />
          </div>
        </section>
      </CommonBox>
    </>
  )
}

const PersonalBriefInfo: FC<{
  Icon: JSX.ElementType
  heading?: string
  data?: any
  className?: React.ComponentProps<'div'>['className'] // this is just a workaround to get intellisence of tailwind classes
}> = ({ Icon, data, heading, className }) => {
  return (
    <>
      <article className={`flex flex-col gap-1 ${className}`}>
        <p className='flex items-end gap-3'>
          <Icon className='text-[1rem]' />

          <span className='font-[500] capitalize text-[15px]'>{heading}</span>
        </p>
        <p
          className={`text-[14px] pl-7 ${
            heading?.toLowerCase().includes('about') && 'text-justify'
          }`}>
          {data || 'N/A'}
        </p>
      </article>
    </>
  )
}
