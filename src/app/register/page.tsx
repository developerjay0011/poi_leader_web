import { RegisterForm } from '@/components/login_register/RegisterForm'
import { LoginLayout } from '@/layouts/LoginLayout'
import { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'POI | Sign Up as Leader or Emerging Leader',
  description:
    'Create an account on POI to connect with leader and emerging leaders in India',
}

const RegisterPage: FC = () => {
  return (
    <>
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    </>
  )
}

export default RegisterPage
