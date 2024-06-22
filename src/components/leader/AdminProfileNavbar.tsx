'use client'
import { CusLink } from '@/utils/CusLink'
import { FC, useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { motion as m } from 'framer-motion'
import { TfiStatsUp } from 'react-icons/tfi'
import { cusSelector } from '@/redux_store/cusHooks'
import { tabfilter } from '@/redux_store/accesstab/tabApi'

interface AdminProfileNavbarProps { }
export const AdminProfileNavbar: FC<AdminProfileNavbarProps> = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  const NAV_ROUTES = [
    {
      link: '/user/profile/feed',
      name: 'feed',
      tabname: "Leader"
    },
    {
      link: '/user/profile/networks',
      name: 'Groups',
      tabname: "Manage Group"
    },
    {
      link: '/user/profile/gallery',
      name: 'gallery',
      tabname: "Leader"
    },
    {
      link: '/user/profile/agenda',
      name: 'agenda',
      tabname: "Manage Agenda",
    },
    {
      link: '/user/profile/developments',
      name: 'developments',
      tabname: "Manage Developments",
    },
  ]
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!(e.target as HTMLElement).closest("#analytics") && showMoreOptions)
        setShowMoreOptions(false);
    });
  }, []);

  return (
    <>
      <nav className='flex items-center gap-8 ml-20 max-[1480px]:ml-10 max-[1200px]:ml-5 max-[450px]:gap-4 max-[1100px]:flex-wrap max-[620px]:justify-center'>


        {[...tabfilter(accesstabs, usertype, NAV_ROUTES as any) as []]?.map((El: any) => (
          <CusLink
            activeLinkClasses='active_profile_link'
            normalClasses='text-sky-950'
            className='text-lg font-[500] capitalize relative'
            href={El.link}>
            {El.name}
          </CusLink>
        ))}

        <button
          type='button'
          onClick={() => setShowMoreOptions((lst) => !lst)}
          id={"analytics"}
          className='relative'>
          <BsThreeDotsVertical className='text-xl z-[50]' />

          {showMoreOptions && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreOptions(false)}
              className='flex flex-col items-start bg-white rounded-sm shadow-lg absolute top-full right-0 z-[50]'>
              <CusLink
                href='/user/analytics'
                activeLinkClasses='bg-orange-500 text-orange-50 underline'
                normalClasses=''
                className='flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all'>
                <TfiStatsUp /> statistics
              </CusLink>
            </m.div>
          )}
        </button>
      </nav>
    </>
  )
}
