'use client'
import { FC, ReactNode, useEffect } from 'react'
import { TopNavbar } from '@/components/leader/TopNavbar'
import { LeftNavbar } from '@/components/leader/LeftNavbar'
import { RightNavbar } from '@/components/leader/RightNavbar'
import { USER_TYPE } from '@/constants/common'
import { getCookie } from 'cookies-next'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { fetchAccessTabs, fetchEmployeeAccessTabs } from '@/redux_store/accesstab/tabApi'
import { accessAction } from '@/redux_store/accesstab/tabSlice'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = cusDispatch()
  var user_type = getCookie(USER_TYPE) as string
  const { userDetails }: any = cusSelector((state) => state.auth);
  const { loader, accesstabs }: any = cusSelector((state) => state.access);
  useEffect(() => {
    (async () => {
      if (user_type) {
        if (accesstabs?.length == 0) {
          dispatch(accessAction.storeLoader(true))
        }
        dispatch(accessAction.storeUsertype(user_type))
        var tabs = user_type == "leader" ? await fetchAccessTabs(userDetails?.id) : await fetchEmployeeAccessTabs(userDetails?.employeeid)
        await dispatch(accessAction.storeAccesstabs(tabs))
        dispatch(accessAction.storeLoader(false))
      }
    })()
  }, [user_type])

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
