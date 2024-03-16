'use client'
import { FC, ReactNode, useLayoutEffect } from 'react'
import { TopNavbar } from '@/components/leader/TopNavbar'
import { LeftNavbar } from '@/components/leader/LeftNavbar'
import { RightNavbar } from '@/components/leader/RightNavbar'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { fetchEmployeeAccessTabs } from '@/redux_store/accesstab/tabApi'
import { accessAction } from '@/redux_store/accesstab/tabSlice'
import { getCookie } from 'cookies-next'
import { USER_TYPE } from '@/constants/common'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = cusDispatch()
  const { userDetails }: any = cusSelector((state) => state.auth);
  useLayoutEffect(() => {
    (async () => {
      let usertype = getCookie(USER_TYPE)
      await dispatch(accessAction.storeLoader(true))
      await dispatch(accessAction.storeUsertype(usertype))
      var tabs = await fetchEmployeeAccessTabs(userDetails?.employeeId)
      if (Array.isArray(tabs)) { await dispatch(accessAction.storeAccesstabs(tabs as any)) }
      await dispatch(accessAction.storeLoader(false))
    })()
  });
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
      </main>
    </>
  )
}

export default AdminLayout
