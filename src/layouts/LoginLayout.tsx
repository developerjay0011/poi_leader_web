import { FC, ReactNode } from 'react'
import BackgroundImg from '@/assets/background.jpg'
import Logo from '@/assets/favicon.png'
import { WebsiteInfoBox } from '@/components/login_register/WebsiteInfoBox'
import { FaPeopleGroup, FaUser } from 'react-icons/fa6'
import { MdDynamicFeed } from 'react-icons/md'
import { BsAndroid2, BsApple } from 'react-icons/bs'
import QRCode from 'react-qr-code'
import Link from 'next/link'
import CustomImage from '@/utils/CustomImage'

interface LoginPageProps {
  children: ReactNode
}

export const LoginLayout: FC<LoginPageProps> = ({ children }) => {
  return (
    <>
      <section className='min-h-[100dvh] w-full flex  items-center justify-center relative'>
        {/* BG IMAGE */}
        <CustomImage
          src={BackgroundImg}
          alt='background'
          className='w-full h-full absolute top-0 left-0 -z-10 object-cover object-center opacity-40'
        />
        <div className='flex w-[70%] gap-16 justify-between items-start text-sky-950 my-10 max-[1557px]:w-[80%] max-[1327px]:w-[90%] max-lg:flex-col max-lg:items-center max-lg:w-[70%] max-lg:gap-10 max-md:w-[80%] max-sm:w-[90%] max-[500px]:w-[95%] max-[500px]:my-4'>
          {/* Written Data */}
          <div className='w-[65%] flex flex-col gap-3 max-lg:hidden'>
            {/* POI LOGO */}
            <Link href={'/'} className='self-start'>
              <CustomImage
                src={Logo}
                alt='poi logo'
                className='h-[13rem] w-auto self-start max-lg:m-auto max-lg:h-[10rem]'
              />
            </Link>

            <h3 className='capitalize text-[2.7rem] font-[300] mt-4 max-lg:text-center'>
              Welcome to the Politician of India
            </h3>

            <p className='text-justify max-lg:hidden font-normal'>
              Politician of India is a social network platform where we can
              connect to the Leaders & Emerging Leaders. Connect with POI for
              Leaders social activities like Current work, Agenda, invitations
              and much more. Now join & get familiar with Leaders around the
              India !!!
            </p>

            {/* FOR Width > 1090px */}
            {/* Website stats */}
            <div className='flex items-center justify-between mt-10 w-[80%] max-[1300px]:w-full'>
              <WebsiteInfoBox
                dataCount={0}
                title='registered peoples'
                icon={<FaPeopleGroup className='text-4xl' />}
              />
              <WebsiteInfoBox
                dataCount={0}
                title='posts published'
                icon={<MdDynamicFeed className='text-4xl' />}
              />
              <WebsiteInfoBox
                dataCount={0}
                title='active users'
                icon={<FaUser className='text-4xl' />}
              />
            </div>

            {/* Promotions */}
            <div className='flex items-center gap-8 mt-10'>
              {/* QR */}
              <figure className='w-[7.5rem] aspect-square p-2 bg-white'>
                <QRCode
                  value='https://www.facebook.com/PoliticiansOfIndia'
                  className='w-full h-full object-contain object-center'
                />
              </figure>

              {/* Supported platforms */}
              <section className='flex flex-col gap-5 font-[500]'>
                <p>Download Mobile App and Scan QR Code to login</p>

                <div className='flex items-center gap-10'>
                  <p className='flex items-center gap-3'>
                    <BsAndroid2 className='text-3xl' /> <span>Android</span>
                  </p>
                  <p className='flex items-center gap-3'>
                    <BsApple className='text-3xl' /> <span>IOS</span>
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* FORM */}
          {children}

          {/* FOR Screens less than 1090px */}
          <div className='hidden px-5 items-center justify-between w-full max-lg:flex max-[500px]:hidden'>
            <WebsiteInfoBox
              dataCount={0}
              title='registered peoples'
              icon={<FaPeopleGroup className='text-4xl' />}
            />
            <WebsiteInfoBox
              dataCount={0}
              title='posts published'
              icon={<MdDynamicFeed className='text-4xl' />}
            />
            <WebsiteInfoBox
              dataCount={0}
              title='active users'
              icon={<FaUser className='text-4xl' />}
            />
          </div>

          {/* Promotions */}
          <div className='hidden px-5 self-start items-center gap-8 max-lg:flex max-[500px]:flex-col'>
            {/* QR */}
            <figure className='w-[7.5rem] aspect-square p-2 bg-white'>
              <QRCode
                value='https://www.youtube.com/@politiciansindia'
                className='w-full h-full object-contain object-center'
              />
            </figure>

            {/* Supported platforms */}
            <section className='flex flex-col gap-5 font-[500] max-[500px]:items-center max-[500px]:text-center'>
              <p>Download Mobile App and Scan QR Code to login</p>

              <div className='flex items-center gap-10'>
                <p className='flex items-center gap-3'>
                  <BsAndroid2 className='text-3xl' /> <span>Android</span>
                </p>
                <p className='flex items-center gap-3'>
                  <BsApple className='text-3xl' /> <span>IOS</span>
                </p>
              </div>
            </section>
          </div>

          {/* ------------ MOBILE ------------------------------ */}
        </div>
      </section>
    </>
  )
}
