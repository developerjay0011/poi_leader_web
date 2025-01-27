'use client'
import { FC, ReactNode } from 'react'
import { TopNavbar } from '@/components/leader/TopNavbar'
import { LeftNavbar } from '@/components/leader/LeftNavbar'
import { RightNavbar } from '@/components/leader/RightNavbar'
import Notificationpage from '@/utils/firebase/notification'
const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <main className='flex flex-col h-[100dvh] overflow-hidden'>
        <TopNavbar user_type={"employee"} />
        <div className='flex flex-grow overflow-y-scroll scroll_hidden'>
          <LeftNavbar />
          <section className='bg-zinc-100 flex-1 overflow-y-scroll main_scrollbar'>
            {children}
          </section>
          <RightNavbar />
        </div>
        <Notificationpage />
      </main>
    </>
  )
}

export default AdminLayout
