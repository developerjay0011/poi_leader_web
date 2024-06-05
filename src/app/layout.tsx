import './globals.scss'
import type { Metadata } from 'next'
// import { Open_Sans } from 'next/font/google'
import { CusProvider } from '@/redux_store/CusProvider' // Provider for Managing state using REDUX
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

// const font = Open_Sans({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800'],
// })

export const metadata: Metadata = {
  title: 'Politician Of India',
  description: 'Politician of india',
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang='en' >
      {/* <body className={font.className + ' font-normal '}> */}
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
