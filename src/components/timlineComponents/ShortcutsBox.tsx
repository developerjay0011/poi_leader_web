'use client'
import { CommonBox } from '@/utils/CommonBox'
import { FC } from 'react'
import { FaBell, FaClipboard, FaPowerOff, FaUser } from 'react-icons/fa'
import { ShortcutBtn } from '@/utils/ShortcutBtn'
import { LuNetwork } from 'react-icons/lu'
import { cusDispatch } from '@/redux_store/cusHooks'
import { uiActions } from '@/redux_store/UI/uiSlice'
import { HiSpeakerphone } from 'react-icons/hi'
import { FaUserGroup } from 'react-icons/fa6'
import { TfiStatsUp } from 'react-icons/tfi'
import { MdContacts, MdSpaceDashboard } from 'react-icons/md'

export const ShortcutsBox: FC = () => {
  const dispatch = cusDispatch()

  return (
    <>
      <CommonBox title='shortcuts'>
        <div className='flex flex-col py-4 gap-5 pr-16 font-normal'>
          <ShortcutBtn Icon={FaClipboard} title='feed' route={`/user`} />

          <ShortcutBtn
            Icon={FaUser}
            title='my profile'
            route={`/user/profile`}
          />

          <ShortcutBtn
            Icon={FaBell}
            title='notifications'
            route={`/user/profile/notifications`}
          />

          <ShortcutBtn
            Icon={LuNetwork}
            title='networks'
            route='/user/profile/networks'
          />

          <ShortcutBtn
            Icon={HiSpeakerphone}
            title='polls'
            route='/user/profile/polls'
          />

          <ShortcutBtn
            Icon={MdContacts}
            title='My Directory'
            route='/user/profile/directory'
          />

          <ShortcutBtn
            Icon={TfiStatsUp}
            title='account stats'
            route='/user/analytics'
          />

          <ShortcutBtn
            Icon={MdSpaceDashboard}
            title='Dashboard'
            target
            route='http://localhost:5000/'
          />

          <button onClick={() => dispatch(uiActions.setLogin(false))}>
            <ShortcutBtn Icon={FaPowerOff} title='logout' route='/' />
          </button>
        </div>
      </CommonBox>
    </>
  )
}
