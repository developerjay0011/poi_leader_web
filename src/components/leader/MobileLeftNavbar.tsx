import { CusLink } from '@/utils/CusLink'
import { motion as m } from 'framer-motion'
import { FC, ReactNode } from 'react'
import POILogo from '@/assets/poi_logo_1.png'
import Link from 'next/link'
import { FaBell, FaClipboard, FaUser } from 'react-icons/fa'
import { LuNetwork } from 'react-icons/lu'
import { FaUserGroup } from 'react-icons/fa6'
import { HiSpeakerphone } from 'react-icons/hi'
import { TfiStatsUp } from 'react-icons/tfi'
import { MdContacts, MdSpaceDashboard } from 'react-icons/md'
import CustomImage from '@/utils/CustomImage'
import { BsFillCalendar3WeekFill } from 'react-icons/bs'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { BiSolidUserDetail } from 'react-icons/bi'
import { cusSelector } from '@/redux_store/cusHooks'
import Shimmer from "react-shimmer-effect";

interface MobileLeftNavbarProps {
  onClose: () => void,
}
const TopNavLink: FC<{
  children: ReactNode;
  link: string;
  target?: boolean;
}> = ({ children, link, target }) => {
  return (
    <li>
      <CusLink
        activeLinkClasses='text-orange-500'
        normalClasses='text-sky-950'
        href={link}
        target={target}
        className='flex items-center gap-2 py-2 pl-5 uppercase font-medium'
      >
        {children}
      </CusLink>
    </li>
  );
};

export const MobileLeftNavbar: FC<MobileLeftNavbarProps> = ({ onClose }) => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  const Top_NAV_ROUTES = [
    {
      link: '/user',
      name: 'feed',
      Icon: FaClipboard,
      tabname: "Leader"
    },
    {
      link: '/user/profile',
      name: 'my profile',
      Icon: FaUser,
      tabname: "Leader"
    },
    {
      link: '/user/profile/notifications',
      name: 'notifications',
      Icon: FaBell,
      tabname: "Leader"
    },
    {
      link: '/user/profile/networks',
      name: 'Manage Group',
      Icon: LuNetwork,
      tabname: "Manage Group"
    },
    {
      link: '/user/profile/directory',
      name: 'Manage Directory',
      Icon: MdContacts,
      tabname: "Manage Directory"
    },
    {
      link: '/user/profile/events',
      name: 'events',
      Icon: BsFillCalendar3WeekFill,
      tabname: "Manage Events"
    },
    {
      link: '/user/analytics',
      name: 'account stats',
      Icon: TfiStatsUp,
      tabname: "Leader"
    },
    {
      link: '/user/letter/manage-letter',
      name: 'Manage Letter',
      Icon: SlEnvolopeLetter,
      tabname: "Manage Letters"
    },
    {
      link: '/user/letter/manage-letter-template',
      name: 'Manage Templa Letter',
      Icon: SlEnvolopeLetter,
      tabname: "Manage Letter Templates"
    },
    {
      link: ' /user/profile/polls',
      name: 'Polls',
      Icon: HiSpeakerphone,
      tabname: "Manage Polls"
    },
    {
      link: '/user/employees/manage-employees',
      name: 'Manage Employees',
      Icon: BiSolidUserDetail,
      tabname: "Manage Employees"
    },
    {
      link: '/user',
      name: 'Dashboard',
      Icon: MdSpaceDashboard,
      tabname: "Leader"
    },
  ]
  var tabfilter = (accesstabs: [], usertype: string) => {
    var tabs = [...Top_NAV_ROUTES]
    // tabs = tabs.filter((item: any) => ((usertype === "leader" && item?.tabname == "Leader") || accesstabs.some((element2: any) => element2?.tabname === item?.tabname)))
    return accesstabs?.length > 0 || usertype === "leader" ? tabs : []
  }




  return (
    <>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeInOut' }} className='fixed top-0 left-0 h-[100dvh] z-[100] w-[100dvw]'>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut' }}
          className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-[2px]'
          onClick={onClose}
        />

        <m.ul
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          exit={{ x: -100 }}
          transition={{ ease: 'easeOut' }}
          onClick={onClose}
          className='w-1/2 bg-white flex flex-col gap-2 relative h-full z-[102] items-start max-[500px]:w-[75%]'>
          <div
            className='w-full text-center bg-sky-950 flex justify-center py-3'>
            <CustomImage src={POILogo} alt='poi logo' className='h-12 w-auto' />
          </div>

          <div className='w-full flex flex-col gap-2 relative h-full items-start  main_scrollbar overflow-y-auto'>

            {loader ? Top_NAV_ROUTES.map((El: any) => (
              <Shimmer>
                <TopNavLink key={El.id} link={''}>
                  <>
                  </>
                </TopNavLink>
              </Shimmer>
            )) : [...tabfilter(accesstabs, usertype) as []]?.map((El: any) => (
              <TopNavLink key={El.id} link={El.link}>
                {<El.Icon className='text-xl' />}{El.name}
              </TopNavLink>
            ))}


            <li>
              <CusLink
                href='/user'
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <FaClipboard className='text-xl' /> Feed
              </CusLink>
            </li>
            <li>
              <CusLink
                href='/user/profile'
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <FaUser /> My Profile
              </CusLink>
            </li>
            <li>
              <CusLink
                href='/user/profile/networks'
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <LuNetwork /> My networks
              </CusLink>
            </li>
            <li>
              <CusLink
                href='/user/profile/notifications'
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <FaBell /> notifications
              </CusLink>
            </li>
            <li>
              <CusLink
                href='/user/profile/settings/manage-staff'
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <FaUserGroup /> Manage staff
              </CusLink>
            </li>
            <li>
              <CusLink
                href='/user/profile/polls'
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <HiSpeakerphone /> Polls
              </CusLink>
            </li>
            <li>
              <CusLink
                href='/user/analytics'
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <TfiStatsUp /> Account Stats
              </CusLink>
            </li>
            <li>
              <CusLink
                href='http://localhost:5000/'
                target
                activeLinkClasses='text-orange-500'
                className='flex items-center gap-2 py-2 pl-10 uppercase font-medium'
                normalClasses='text-sky-950'>
                <MdSpaceDashboard /> Dashboard
              </CusLink>
            </li>
          </div>
        </m.ul>
      </m.div>
    </>
  )
}
