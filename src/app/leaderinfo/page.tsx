import { LoginLayout } from '@/layouts/LoginLayout'
import { FC } from 'react'
import { LeaderDetailFrom } from '@/components/login_register/LeaderDetailfrom'
const LeaderinfoPage: FC = () => {

  return (

    <>
      <LoginLayout isleaderinfo={true} >
        <LeaderDetailFrom />
      </LoginLayout>
    </>
  )
}

export default LeaderinfoPage
