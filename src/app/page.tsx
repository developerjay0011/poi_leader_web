import { LoginForm } from '@/components/login_register/LoginForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { FC } from 'react'



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
