import { LoginForm } from '@/components/login_register/LoginForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { FC, memo } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Politician Of India',
  description: 'Sign in to connect with Political Leaders of India',
}

const LoginPage: FC = memo(() => {
  return (
    <LoginLayout isleaderinfo={false}>
      <LoginForm />
    </LoginLayout>
  )
})

LoginPage.displayName = 'LoginPage'

export default LoginPage
