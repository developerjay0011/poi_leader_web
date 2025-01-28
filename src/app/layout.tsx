import './globals.scss'
import type { Metadata, Viewport } from 'next'
import { CusProvider } from '@/redux_store/CusProvider'
import { FC, ReactNode, memo } from 'react'
import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f97316',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://leader.politicianofindia.com:4007'),
  title: 'Politician Of India',
  description: 'Connect with Political Leaders of India - Official Platform',
  keywords: 'politics, india, leaders, politicians, democracy',
  authors: [{ name: 'POI Team' }],
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    title: 'Politician Of India',
    description: 'Connect with Political Leaders of India - Official Platform',
    type: 'website',
    locale: 'en_IN',
  },
}

const ToasterComponent = memo(() => (
  <div>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  </div>
))
ToasterComponent.displayName = 'ToasterComponent'

const RootLayout: FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <html lang='en' className={inter.variable}>
      <body className={inter.className}>
        <ToasterComponent />
        <CusProvider>{children}</CusProvider>
      </body>
    </html>
  )
})

RootLayout.displayName = 'RootLayout'

export default RootLayout
