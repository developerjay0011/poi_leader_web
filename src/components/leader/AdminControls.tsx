'use client'
import { ProtectedRoutes } from '@/constants/routes'
import { authActions } from '@/redux_store/auth/authSlice'
import { cusDispatch } from '@/redux_store/cusHooks'
import { ShortcutBtn } from '@/utils/ShortcutBtn'
import { FC } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaGear, FaPowerOff, FaUser } from 'react-icons/fa6'

interface AdminControlsProps {}

export const AdminControls: FC<AdminControlsProps> = () => {
  const dispatch = cusDispatch()

  return (
    <>
      <aside className='flex flex-col py-5 px-4 w-full bg-white rounded shadow-lg gap-4 border'>
        <ShortcutBtn
          Icon={FaUser}
          title='view profile'
          route={ProtectedRoutes.userProfile}
        />
        <ShortcutBtn
          Icon={FaEdit}
          title='edit profile'
          route={ProtectedRoutes.editUserProfile}
        />
        <ShortcutBtn
          Icon={FaGear}
          title='account settings'
          route={ProtectedRoutes.accountSetting}
        />
        <button onClick={() => dispatch(authActions.logout())}>
          <ShortcutBtn Icon={FaPowerOff} title='log out' route='/' />
        </button>
      </aside>
    </>
  )
}
