'use client'
import { FC, ReactNode, Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from '.'

interface CusProviderProps {
  children: ReactNode
}
export const CusProvider: FC<CusProviderProps> = ({ children }) => {
  return (
    <Suspense fallback={<p></p>} >
      <Provider store={store}>
        <AuthLayer>{children}</AuthLayer>
      </Provider>
    </Suspense>
  )
}

const AuthLayer: FC<{ children: ReactNode }> = ({ children }) => {
  return <> {children} </>
}
