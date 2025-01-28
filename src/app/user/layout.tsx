'use client'
import { FC, ReactNode, useLayoutEffect, lazy, Suspense, memo } from 'react'
import { cusDispatch } from '@/redux_store/cusHooks'
import { accessAction } from '@/redux_store/accesstab/tabSlice'
import { getCookie } from 'cookies-next'
import { USER_TYPE } from '@/constants/common'

// Lazy load components
const TopNavbar = lazy(() => import('@/components/leader/TopNavbar').then(mod => ({ default: mod.TopNavbar })))
const LeftNavbar = lazy(() => import('@/components/leader/LeftNavbar').then(mod => ({ default: mod.LeftNavbar })))
const RightNavbar = lazy(() => import('@/components/leader/RightNavbar').then(mod => ({ default: mod.RightNavbar })))
const Notificationpage = lazy(() => import('@/utils/firebase/notification').then(mod => ({ default: mod.default })))

const AdminLayout: FC<{ children: ReactNode }> = memo(({ children }) => {
  const dispatch = cusDispatch()

  useLayoutEffect(() => {
    (async () => {
      let usertype = getCookie(USER_TYPE)
      await dispatch(accessAction.storeUsertype(usertype))
    })()
  });


  return (
    <main className='flex flex-col h-[100dvh] overflow-hidden'>
      <Suspense fallback={null}>
        <TopNavbar user_type="leader" />
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
  )
})

AdminLayout.displayName = 'AdminLayout'

export default AdminLayout
