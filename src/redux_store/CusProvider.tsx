'use client'
import { FC, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '.'
import { cusDispatch } from './cusHooks'
import { useRouter } from 'next/navigation'
import { uiActions } from './UI/uiSlice'

interface CusProviderProps {
  children: ReactNode
}
export const CusProvider: FC<CusProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthLayer>{children}</AuthLayer>
    </Provider>
  )
}

const AuthLayer: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = cusDispatch()
  const router = useRouter()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || ''
    const userDetails = (localStorage.getItem('userDetails') as string) || ''

    if (authToken && userDetails) {
      dispatch(uiActions.setLogin(true))
      dispatch(uiActions.setJWT(authToken))

      dispatch(uiActions.storeUserDetails(JSON.parse(userDetails)))

      router.push(`/${JSON.parse(userDetails).userType}`)
      dispatch(uiActions.setUserType(JSON.parse(userDetails).userType))
    }
  }, [dispatch, router])
  return <> {children} </>
}
