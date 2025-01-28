'use client'
import { FC, ReactNode, Suspense, memo, lazy } from 'react'

// Lazy load components
const TopNavbar = lazy(() => import('@/components/leader/TopNavbar').then(mod => ({ default: mod.TopNavbar })))
const LeftNavbar = lazy(() => import('@/components/leader/LeftNavbar').then(mod => ({ default: mod.LeftNavbar })))
const RightNavbar = lazy(() => import('@/components/leader/RightNavbar').then(mod => ({ default: mod.RightNavbar })))
const Notificationpage = lazy(() => import('@/utils/firebase/notification'))

const EmployeeLayout: FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <Suspense fallback={null}>
      <main className='flex flex-col h-[100dvh] overflow-hidden'>
        <Suspense fallback={null}>
          <TopNavbar user_type="employee" />
        </Suspense>
        <div className='flex flex-grow overflow-y-scroll scroll_hidden'>
          <Suspense fallback={null}>
            <LeftNavbar />
          </Suspense>
          <section className='bg-zinc-100 flex-1 overflow-y-scroll main_scrollbar'>
            {children}
          </section>
          <Suspense fallback={null}>
            <RightNavbar />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <Notificationpage />
        </Suspense>
      </main>
    </Suspense>
  )
})

EmployeeLayout.displayName = 'EmployeeLayout'

export default EmployeeLayout
