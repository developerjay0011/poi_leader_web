import './globals.scss'
import type { Metadata } from 'next'
import { CusProvider } from '@/redux_store/CusProvider' // Provider for Managing state using REDUX
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
export const metadata: Metadata = {
  title: 'Politician Of India',
  description: 'Politician of india',
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang='en' >
      <body >
        <div>
          <Toaster />
        </div>
        <CusProvider>{children}</CusProvider>
      </body>
    </html>
  )
}

export default RootLayout
