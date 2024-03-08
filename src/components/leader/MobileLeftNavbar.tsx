import { CusLink } from '@/utils/CusLink'
import { motion as m } from 'framer-motion'
import { FC, ReactNode, useEffect } from 'react'
import POILogo from '@/assets/poi_logo_1.png'
import { FaBell, FaClipboard, FaUser } from 'react-icons/fa'
import { LuNetwork } from 'react-icons/lu'
import { FaUserGroup } from 'react-icons/fa6'
import { HiSpeakerphone } from 'react-icons/hi'
import { TfiStatsUp } from 'react-icons/tfi'
import { MdContacts, MdSpaceDashboard } from 'react-icons/md'
import CustomImage from '@/utils/CustomImage'
import { BsFillCalendar3WeekFill, BsHouseGearFill } from 'react-icons/bs'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { BiSolidUserDetail, BiTask } from 'react-icons/bi'
import { cusSelector } from '@/redux_store/cusHooks'
import Shimmer from "react-shimmer-effect";
import { tabfilter } from '@/redux_store/accesstab/tabApi'
import { GrUserWorker } from 'react-icons/gr'
interface MobileLeftNavbarProps {
  onClose: () => void
  showMobileNav: boolean
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

export const MobileLeftNavbar: FC<MobileLeftNavbarProps> = ({ onClose, showMobileNav }) => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  const Top_NAV_ROUTES = [
    {
      link: '/user/profile/agenda',
      name: 'agenda',
      Icon: BiTask,
      tabname: "Manage Agenda",
      isuser: "Employee"
    },
    {
      link: '/user/profile/developments',
      name: 'developments',
      Icon: BsHouseGearFill,
      tabname: "Manage Developments",
      isuser: "Employee"
    },
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
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 1000 && showMobileNav) { onClose(); } };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showMobileNav]);


  return (
    <>
      <m.div layout initial={{ opacity: 0 }} className='z-[100]' animate={showMobileNav ? { opacity: 1 } : { opacity: 0 }} exit={{ opacity: 0 }} transition={{ ease: 'easeInOut' }} onClick={onClose}>
        {showMobileNav &&
          <m.div className='fixed top-0 left-0 h-[100dvh] z-[100] w-[100dvw]'>
            <m.div
              initial={{ opacity: 0 }}
              animate={showMobileNav ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut' }}
              className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-[2px]'
              onClick={onClose}
            />
            <m.ul
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ ease: 'easeOut' }}
              onClick={onClose}
              className='w-1/2 bg-white flex flex-col gap-2 relative h-full z-[102] items-start max-[500px]:w-[75%] max-w-[300px] '>
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
                )) : [...tabfilter(accesstabs, usertype, Top_NAV_ROUTES as any) as []]?.map((El: any) => (
                  <TopNavLink key={El.id} link={El.link}>
                    {<El.Icon className='text-xl' />}{El.name}
                  </TopNavLink>
                ))}
              </div>
            </m.ul>
          </m.div>
        }
      </m.div>
    </>
  )
}
