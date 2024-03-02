"use client"
import { CommonBox } from '@/utils/CommonBox'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { BsGenderFemale, BsGenderMale, BsStars } from 'react-icons/bs'
import { FaFacebook, FaInstagram, FaRedhat } from 'react-icons/fa'
import { RiUserHeartLine } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai'
import { IoMdShare } from 'react-icons/io'
import { BiLocationPlus } from 'react-icons/bi'
import { cusSelector } from '@/redux_store/cusHooks'

interface GeneralInfoBoxProps { }

export const GeneralInfoBox: FC<GeneralInfoBoxProps> = () => {
  const { leaderProfile } = cusSelector((state) => state.leader);
  const socialNetworks: JSX.Element[] = [
    <Link
      target='_blank'
      href={leaderProfile.contact_info?.fb_link || ''}
      className='text-sky-950 text-[1.6rem]'
      style={{ display: leaderProfile.contact_info?.fb_link ? "flex" : "none" }}
      key={Math.random()}>
      <FaFacebook />
    </Link>,
    <Link
      target='_blank'
      href={leaderProfile.contact_info?.insta_link || ''}
      style={{ display: leaderProfile.contact_info?.insta_link ? "flex" : "none" }}
      className=' text-sky-950 text-[1.6rem]'
      key={Math.random()}>
      <FaInstagram />
    </Link>,
  ]

  return (
    <>
      <CommonBox title='Political Info'>
        <div className='grid grid-cols-2 py-5 gap-y-5 max-[550px]:grid-cols-1'>
          <GeneralInfo Icon={BiLocationPlus} heading='Place of birth'>
            <p className='text-[14px] pl-7 text-justify'>
              {leaderProfile.personal_info?.place_of_birth}
            </p>
          </GeneralInfo>

          <GeneralInfo Icon={AiOutlineUser} heading="Father's name">
            <p className='text-[14px] pl-7 text-justify'>
              {leaderProfile.personal_info?.father_name}
            </p>
          </GeneralInfo>

          <GeneralInfo Icon={AiOutlineUser} heading="Mother's name">
            <p className='text-[14px] pl-7 text-justify'>{leaderProfile.personal_info?.mother_name}</p>
          </GeneralInfo>

          <GeneralInfo Icon={FaRedhat} heading='education'>
            <p className='text-[14px] pl-7 text-justify'>{leaderProfile.personal_info?.higher_education}</p>
          </GeneralInfo>

          <GeneralInfo Icon={RiUserHeartLine} heading='Marital Status'>
            <div className='text-[14px] pl-7 text-justify flex flex-col'>
              <p>{leaderProfile.personal_info?.marital_status}</p>
              <p>{leaderProfile.personal_info?.spouse_name}</p>
              {/* <p className='text-[13px]'>(27 February 1975)</p> */}
            </div>
          </GeneralInfo>

          <div className=''>
            <GeneralInfo Icon={BsGenderMale} heading='no of sons'>
              <p className='text-[14px] pl-7 text-justify'>{leaderProfile.personal_info?.no_of_sons}</p>
            </GeneralInfo>

            <GeneralInfo Icon={BsGenderFemale} heading='no of daughters'>
              <p className='text-[14px] pl-7 text-justify'>{leaderProfile.personal_info?.no_of_daughters}</p>
            </GeneralInfo>
          </div>

          {/* <GeneralInfo Icon={BsStars} heading='work and experience'>
            <p className='text-[14px] pl-7 text-justify'>5 years</p>
          </GeneralInfo> */}

          <GeneralInfo Icon={IoMdShare} heading='social networks'>
            <div className='flex gap-3 mt-2 items-center pl-6'>
              {socialNetworks}
            </div>
          </GeneralInfo>
        </div>
      </CommonBox>
    </>
  )
}

const GeneralInfo: FC<{
  Icon: JSX.ElementType
  heading: string
  children: ReactNode
}> = ({ Icon, children, heading }) => {
  return (
    <>
      <article className='flex flex-col gap-1'>
        <h5 className='flex items-center gap-3'>
          <Icon className='text-[1rem]' />

          <span className='font-[500] capitalize text-[15px]'>{heading}</span>
        </h5>

        {children}
      </article>
    </>
  )
}
