import { LoginForm } from '@/components/login_register/LoginForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
  title: "POI | Leader's Login",
  description: 'Explore Politician of india by logging in your account',
}

const LoginPage: FC = () => {
  return (
    <>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </>
  )
}

export default LoginPage
