"use client"
import { CommonBox } from '@/utils/CommonBox'
import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { FaFacebook, FaInstagram, FaRedhat } from 'react-icons/fa'
import { RiUserHeartLine } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai'
import { IoMdShare } from 'react-icons/io'
import { BiBriefcaseAlt, BiLocationPlus } from 'react-icons/bi'
import { cusSelector } from '@/redux_store/cusHooks'

interface GeneralInfoBoxProps { }

export const GeneralInfoBox: FC<GeneralInfoBoxProps> = () => {
  const { leaderData } = cusSelector((state) => state.auth);
  const { leaderOptions } = cusSelector((state) => state.common);
  const socialNetworks: JSX.Element[] = [
    <Link
      target='_blank'
      href={leaderData.contact_info?.fb_link || ''}
      className='text-sky-950 text-[1.6rem]'
      style={{ display: leaderData.contact_info?.fb_link ? "flex" : "none" }}
      key={Math.random()}>
      <FaFacebook />
    </Link>,
    <Link
      target='_blank'
      href={leaderData.contact_info?.insta_link || ''}
      style={{ display: leaderData.contact_info?.insta_link ? "flex" : "none" }}
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
              {leaderData.personal_info?.place_of_birth}
            </p>
          </GeneralInfo>

          <GeneralInfo Icon={AiOutlineUser} heading="Father's name">
            <p className='text-[14px] pl-7 text-justify'>
              {leaderData.personal_info?.father_name}
            </p>
          </GeneralInfo>

          <GeneralInfo Icon={AiOutlineUser} heading="Mother's name">
            <p className='text-[14px] pl-7 text-justify'>{leaderData.personal_info?.mother_name}</p>
          </GeneralInfo>
          {leaderData.political_info?.is_hold_ministry &&
            <GeneralInfo Icon={BiBriefcaseAlt} heading="Ministry">
              {leaderData.political_info?.ministries?.map((i) => {
                var label = leaderOptions?.ministries?.find((t) => t?.id == i?.ministryid)?.name
                return label && (
                  <p className='text-[14px] pl-7 text-justify'>
                    {label}
                  </p>
                )
              })}
            </GeneralInfo>
          }
          <GeneralInfo Icon={FaRedhat} heading='education'>
            <p className='text-[14px] pl-7 text-justify'>{leaderData.personal_info?.higher_education}</p>
          </GeneralInfo>

          <GeneralInfo Icon={RiUserHeartLine} heading='Marital Status'>
            <div className='text-[14px] pl-7 text-justify flex flex-col'>
              <p>{leaderData.personal_info?.marital_status}</p>
              <p>{leaderData.personal_info?.spouse_name}</p>
              {/* <p className='text-[13px]'>(27 February 1975)</p> */}
            </div>
          </GeneralInfo>
          {
            leaderData.personal_info?.marital_status == "unmarried" ?
              <div className=''>
                <GeneralInfo Icon={BsGenderMale} heading='no of sons'>
                  <p className='text-[14px] pl-7 text-justify'>{leaderData.personal_info?.no_of_sons}</p>
                </GeneralInfo>

                <GeneralInfo Icon={BsGenderFemale} heading='no of daughters'>
                  <p className='text-[14px] pl-7 text-justify'>{leaderData.personal_info?.no_of_daughters}</p>
                </GeneralInfo>
              </div> : null

          }

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
