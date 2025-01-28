'use client'
import { FC, ReactNode, useEffect, useMemo, useState, memo } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store, persistor } from '.'
import { usePathname } from 'next/navigation'
import { USER_INFO, USER_TYPE } from '@/constants/common'
import { getCookie } from 'cookies-next'
import { PersistGate } from 'redux-persist/integration/react'
import Image from 'next/image'
import Logo from "@/assets/favicon.png"
import { AuthRoutes } from '@/constants/routes'
import Link from 'next/link'
import { fetchTabs } from './accesstab/tabApi'
import { ProtectedPage } from './ProtectedPage'
import { ErrorBoundary } from 'react-error-boundary'

// Types
interface CusProviderProps {
  children: ReactNode
}

interface UserDetails {
  leaderId?: string
  employeeId?: string
  [key: string]: any
}

interface TabState {
  data: string[] | null
  loading: boolean
  error: Error | null
}

// Memoized components
const LoadingPage = memo(() => (
  <div className='h-screen w-full flex items-center justify-center flex-col bg-red'>
    <Image
      src={Logo}
      alt="poi logo"
      className="h-[13rem] w-auto self-center max-lg:m-auto max-lg:h-[10rem]"
      priority
    />
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTopColor: '#f97316',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
))

LoadingPage.displayName = 'LoadingPage'

const NotAccessible = memo(() => {
  const isLeader = useMemo(() => getCookie(USER_TYPE) === "leader", [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 px-6 bg-white shadow-lg max-w-md rounded-lg">
        <div className="my-6 p-2 flex items-center justify-center">
          <Image
            src={Logo}
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto self-center max-lg:m-auto max-lg:h-[10rem]"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h1>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this page. Please contact your administrator for access.
        </p>
        <div className="mb-8 flex items-center justify-center">
          <Link
            href={isLeader ? "/user" : "/employee-access"}
            className="w-max flex items-center gap-2 self-center mx-auto text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
})

NotAccessible.displayName = 'NotAccessible'

const AuthLayer: FC<{ children: ReactNode }> = memo(({ children }) => {
  const curRoute = usePathname()
  const dispatch = useDispatch()
  const [tabState, setTabState] = useState<TabState>({
    data: null,
    loading: true,
    error: null
  })

  const userDetails = useMemo<UserDetails | null>(() => {
    try {
      const userInfo = getCookie(USER_INFO)
      return userInfo ? JSON.parse(userInfo as string) : null
    } catch (error) {
      console.error('Error parsing user info:', error)
      return null
    }
  }, [])

  const isLeader = useMemo(() => getCookie(USER_TYPE) === "leader", [])
  const authRouteList = useMemo(() => Object.values(AuthRoutes), [])

  // Fetch tabs
  useEffect(() => {
    let mounted = true

    const loadTabs = async () => {
      if (!userDetails?.leaderId) {
        setTabState(prev => ({ ...prev, loading: false }))
        return
      }

      try {
        const userId: any = isLeader ? userDetails.id : userDetails.employeeId
        const userType = isLeader ? "leader" : "employee"
        const access_tabs = await fetchTabs(userId, userType, dispatch)

        if (mounted) {
          setTabState({
            data: access_tabs,
            loading: false,
            error: null
          })
        }
      } catch (error) {
        console.error('Error fetching tabs:', error)
        if (mounted) {
          setTabState({
            data: null,
            loading: false,
            error: error as Error
          })
        }
      }
    }

    loadTabs()
    return () => { mounted = false }
  }, [userDetails?.leaderId, isLeader])

  const isAccessible = useMemo(() => {
    var is_accessable = true
    if (!tabState.loading && Array.isArray(tabState?.data) && userDetails?.leaderId) {
      if ((authRouteList.includes(curRoute) || curRoute.includes('/employee-access') || (tabState?.data?.includes(curRoute) && curRoute !== '/user' && curRoute !== '/user/profile')) && isLeader) {
        console.log("leader tab access denied", curRoute)
        is_accessable = false
      }
      if ((authRouteList.includes(curRoute) || curRoute.includes('/user') || (tabState?.data?.includes(curRoute) && curRoute !== '/employee-access')) && !isLeader) {
        console.log("employee tab access denied", curRoute)
        is_accessable = false
      }
    }
    return is_accessable
  }, [tabState, curRoute, authRouteList, isLeader, userDetails?.leaderId])



  if (tabState.loading) {
    return <LoadingPage />
  }

  if (tabState.error) {
    return <div>Error loading access information. Please try again.</div>
  }

  if (!isAccessible) {
    return <NotAccessible />
  }

  return (
    <ProtectedPage
      isLeader={isLeader}
      userDetails={userDetails}
      curRoute={curRoute}
    >
      {children}
    </ProtectedPage>
  )
})

AuthLayer.displayName = 'AuthLayer'

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <pre className="text-sm text-gray-500 mb-4">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  </div>
)

export const CusProvider: FC<CusProviderProps> = memo(({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
          <AuthLayer>{children}</AuthLayer>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
})
CusProvider.displayName = 'CusProvider'
