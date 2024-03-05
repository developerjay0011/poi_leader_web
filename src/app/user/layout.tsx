'use client'
import { FC, ReactNode, useEffect } from 'react'
import { TopNavbar } from '@/components/leader/TopNavbar'
import { LeftNavbar } from '@/components/leader/LeftNavbar'
import { RightNavbar } from '@/components/leader/RightNavbar'
import { usePathname } from 'next/navigation'
import { localStorageKeys } from '@/utils/utility'
import { USER_TYPE } from '@/constants/common'
import { getCookie } from 'cookies-next'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  let user_type = getCookie(USER_TYPE)

  useEffect(() => {
    localStorage.setItem(localStorageKeys.lastRouteVisited, pathname) // storing last path to keep track of user
  }, [pathname])



  return (
    <>
      <main className='flex flex-col h-[100dvh] overflow-hidden'>
        <TopNavbar />
        <div className='flex flex-grow overflow-y-scroll scroll_hidden'>
          <LeftNavbar />

          <section className='bg-zinc-100 flex-1 overflow-y-scroll main_scrollbar'>
            {children}
          </section>

          <RightNavbar />
        </div>
      </main>
    </>
  )
}

export default AdminLayout
