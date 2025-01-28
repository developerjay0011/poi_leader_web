'use client'
import { FC, ReactNode, lazy, memo } from 'react'

// Lazy load components
const TopNavbar = lazy(() => import('@/components/leader/TopNavbar').then(mod => ({ default: mod.TopNavbar })))
const LeftNavbar = lazy(() => import('@/components/leader/LeftNavbar').then(mod => ({ default: mod.LeftNavbar })))
const RightNavbar = lazy(() => import('@/components/leader/RightNavbar').then(mod => ({ default: mod.RightNavbar })))
const Notificationpage = lazy(() => import('@/utils/firebase/notification').then(mod => ({ default: mod.default })))

const AdminLayout: FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <main className='flex flex-col h-[100dvh] overflow-hidden'>
      <TopNavbar user_type="leader" />
      <div className='flex flex-grow overflow-y-scroll scroll_hidden'>
        <LeftNavbar />
        <section className='bg-zinc-100 flex-1 overflow-y-scroll main_scrollbar'>
          {children}
        </section>
        <RightNavbar />
      </div>
      <Notificationpage />
    </main>
  )
})

AdminLayout.displayName = 'AdminLayout'

export default AdminLayout
