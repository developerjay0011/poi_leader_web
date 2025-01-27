'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from '.'
import { usePathname } from 'next/navigation'
import { USER_INFO, USER_TYPE } from '@/constants/common'
import { getCookie } from 'cookies-next'
import { PersistGate } from 'redux-persist/integration/react'
import Image from 'next/image'
import Logo from "@/assets/favicon.png";
import { AuthRoutes } from '@/constants/routes'
import Link from 'next/link'
import { fetchTabs } from './accesstab/tabApi'
import { ProtectedPage } from './ProtectedPage'

interface CusProviderProps {
  children: ReactNode
}

const LoadingPage = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center justify-center flex-col bg-red'>
      <Image
        src={Logo}
        alt="poi logo"
        className="h-[13rem] w-auto self-center max-lg:m-auto max-lg:h-[10rem]"
      />
      <div style={{ width: '40px', height: '40px', border: '5px solid #ccc', borderTop: '5px solid orange', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export const CusProvider: FC<CusProviderProps> = ({ children }) => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthLayer>{children}</AuthLayer>
      </PersistGate>
    </Provider>
  )
}
const NotAccessible = () => {
  const isLeader = getCookie(USER_TYPE) == "leader"
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="mb-6">
          <Image
            src={Logo}
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your administrator for access.
        </p>
        <Link
          href={isLeader ? "/user" : "/employee-access"}
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
const AuthLayer: FC<{ children: ReactNode }> = ({ children }) => {
  let is_not_accessable = false
  const curRoute = usePathname();
  const [loader, setLoader] = useState<any>(true)
  const authRouteList = Object.values(AuthRoutes);
  let userDetails: any = getCookie(USER_INFO);
  userDetails = userDetails && JSON.parse(userDetails);
  const isLeader = getCookie(USER_TYPE) == "leader"

  useEffect(() => {
    (async () => {
      if (userDetails?.leaderId) {
        setLoader(true)
        console.log(isLeader ? userDetails?.leaderId : userDetails?.employeeId, isLeader ? "leader" : "employee")
        const access_tabs = await fetchTabs(isLeader ? userDetails?.leaderId : userDetails?.employeeId, isLeader ? "leader" : "employee")
        if ((authRouteList.includes(curRoute) || curRoute.includes('/employee-access') || (access_tabs.includes(curRoute) && curRoute !== '/user' && curRoute !== '/user/profile')) && isLeader) {
          is_not_accessable = true
        }
        if ((authRouteList.includes(curRoute) || curRoute.includes('/user') || (access_tabs.includes(curRoute) && curRoute !== '/employee-access')) && !isLeader) {
          is_not_accessable = true
        }
        setLoader(false)
      } else {
        setLoader(false)
      }
    })()
  }, [])


  if (is_not_accessable || loader) {
    return loader ? <LoadingPage /> : <NotAccessible />
  }

  return (
    <ProtectedPage
      isLeader={isLeader}
      userDetails={userDetails}
      curRoute={curRoute}
    >
      {children}
    </ProtectedPage>)
}
