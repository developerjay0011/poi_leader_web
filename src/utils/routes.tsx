import { FaBell, FaClipboard, FaUser } from 'react-icons/fa'
import { GenerateId } from './utility'
import { LuNetwork } from 'react-icons/lu'
import { FaUserGroup } from 'react-icons/fa6'
import { MdContacts } from 'react-icons/md'
import { BsFillCalendar3WeekFill } from 'react-icons/bs'
import { TfiStatsUp } from 'react-icons/tfi'

export const LEFT_NAV_ROUTES = [
  {
    id: GenerateId(),
    link: '/user',
    name: 'feed',
    Icon: FaClipboard,
  },
  {
    id: GenerateId(),
    link: '/user/profile',
    name: 'my profile',
    Icon: FaUser,
  },
  {
    id: GenerateId(),
    link: '/user/profile/notifications',
    name: 'notifications',
    Icon: FaBell,
  },
  {
    id: GenerateId(),
    link: '/user/profile/networks',
    name: 'groups',
    Icon: LuNetwork,
  },
  {
    id: GenerateId(),
    link: '/user/profile/directory',
    name: 'directory',
    Icon: MdContacts,
  },
  {
    id: GenerateId(),
    link: '/user/profile/events',
    name: 'events',
    Icon: BsFillCalendar3WeekFill,
  },
  {
    id: GenerateId(),
    link: '/user/analytics',
    name: 'account stats',
    Icon: TfiStatsUp,
  },
]