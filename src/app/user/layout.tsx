'use client'
import { FC, ReactNode, useEffect, useLayoutEffect } from 'react'
import { TopNavbar } from '@/components/leader/TopNavbar'
import { LeftNavbar } from '@/components/leader/LeftNavbar'
import { RightNavbar } from '@/components/leader/RightNavbar'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { fetchAccessTabs, tabfilter } from '@/redux_store/accesstab/tabApi'
import { accessAction } from '@/redux_store/accesstab/tabSlice'
import { getCookie } from 'cookies-next'
import { TAB_ACCESS, USER_TYPE } from '@/constants/common'
import { usePathname } from 'next/navigation'
import { EXTRA_TABS, LEFT_NAV_ROUTES } from '@/utils/routes'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = cusDispatch()
  const { userDetails }: any = cusSelector((state) => state.auth);
  const pathname = usePathname()
  useLayoutEffect(() => {
    (async () => {
      let usertype = getCookie(USER_TYPE)
      await dispatch(accessAction.storeLoader(true))
      await dispatch(accessAction.storeUsertype(usertype))
      var tabs = await fetchAccessTabs(userDetails?.id)
      if (Array.isArray(tabs)) { await dispatch(accessAction.storeAccesstabs(tabs as any)) }
      var tab_layout = tabfilter(tabs, "leader", [...LEFT_NAV_ROUTES, ...EXTRA_TABS] as any)?.map((item: any) => item?.link)
      tab_layout = [...LEFT_NAV_ROUTES, ...EXTRA_TABS]?.filter((item: any) => !tab_layout?.includes(item?.link) && item?.link)?.map((item: any) => item?.link)
      if (tab_layout?.filter((item: any) => item == pathname)?.length > 0 && pathname != "/user") {
        window.location.href = '/'
      }
      await dispatch(accessAction.storeLoader(false))
    })()
  });
  return (
    <>
      <main className='flex flex-col h-[100dvh] overflow-hidden'>
        <TopNavbar user_type={"leader"} />
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
