import { LoginForm } from '@/components/login_register/LoginForm'
import { USER_TYPE } from '@/constants/common'
import { LoginLayout } from '@/layouts/LoginLayout'
import { getCookie } from 'cookies-next'
import Script from 'next/script'
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
