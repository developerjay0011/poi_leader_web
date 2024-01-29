'use client'
import { uiActions } from '@/redux_store/UI/uiSlice'
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
          route={`/user/profile`}
        />
        <ShortcutBtn
          Icon={FaEdit}
          title='edit profile'
          route={`/user/profile/settings/personal-information`}
        />
        <ShortcutBtn
          Icon={FaGear}
          title='account settings'
          route={`/user/profile/settings/general`}
        />
        <button onClick={() => dispatch(uiActions.setLogin(false))}>
          <ShortcutBtn Icon={FaPowerOff} title='log out' route='/' />
        </button>
      </aside>
    </>
  )
}
