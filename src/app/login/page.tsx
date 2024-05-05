import { LoginForm } from '@/components/login_register/LoginForm'
import { RegisterForm } from '@/components/login_register/RegisterForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { FC } from 'react'

const LoginPage: FC = () => {
  return (
    <>
      <LoginLayout isleaderinfo={false}>
        <LoginForm />
      </LoginLayout>
    </>
  )
}

export default LoginPage
