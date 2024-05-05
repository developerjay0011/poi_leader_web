import { FaClipboard, FaUser } from 'react-icons/fa'
import { GenerateId } from './utility'
import { LuNetwork } from 'react-icons/lu'
import { MdContacts } from 'react-icons/md'
import { BsFillCalendar3WeekFill, BsHouseGearFill } from 'react-icons/bs'
import { TfiStatsUp } from 'react-icons/tfi'
import { SlEnvolopeLetter } from "react-icons/sl";
import { BiCategoryAlt, BiSolidUserDetail, BiTask } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { ImTicket } from "react-icons/im";
import { HiSpeakerphone } from 'react-icons/hi'
import { FaFileInvoice } from "react-icons/fa";

export const LEFT_NAV_ROUTES = [
  {
    link: '/user/profile/agenda',
    link2: '/employee-access/profile/agenda',
    name: 'agenda',
    Icon: BiTask,
    tabname: "Manage Agenda",
    isuser: "Employee"
  },
  {
    link: '/user/profile/developments',
    link2: '/employee-access/profile/developments',
    name: 'developments',
    Icon: BsHouseGearFill,
    tabname: "Manage Developments",
    isuser: "Employee"
  },
  {
    id: GenerateId(),
    link: '/user',
    name: 'feed',
    Icon: FaClipboard,
    tabname: "Leader"
  },
  {
    id: GenerateId(),
    link: '/user/profile',
    name: 'my profile',
    Icon: FaUser,
    tabname: "Leader"
  },

  {
    id: GenerateId(),
    link: '/user/profile/networks',
    link2: '/employee-access/profile/networks',
    name: 'Manage Group',
    Icon: LuNetwork,
    tabname: "Manage Group"
  },
  {
    id: GenerateId(),
    link: '/user/profile/directory',
    link2: '/employee-access/profile/directory',
    name: 'Manage Directory',
    Icon: MdContacts,
    tabname: "Manage Directory"
  },
  {
    id: GenerateId(),
    link: '/user/analytics',
    link2: '/employee-access/analytics',
    name: 'account stats',
    Icon: TfiStatsUp,
    tabname: "Leader"
  },
  {
    id: GenerateId(),
    link: '/user/events',
    link2: '/employee-access/events',
    name: 'events',
    Icon: BsFillCalendar3WeekFill,
    tabname: "Manage Events"
  },
  {
    id: GenerateId(),
    link: '/user/letter/manage-letter',
    link2: '/employee-access/letter/manage-letter',
    name: 'Manage Letter',
    Icon: SlEnvolopeLetter,
    tabname: "Manage Letters"
  },
  {
    id: GenerateId(),
    link: '/user/letter/manage-letter-template',
    link2: '/employee-access/letter/manage-letter-template',
    name: 'Manage Template Letter',
    Icon: SlEnvolopeLetter,
    tabname: "Manage Letter Templates"
  },
  {
    id: GenerateId(),
    link: '/user/ticket',
    link2: '/employee-access/ticket',
    name: 'Ticket',
    Icon: ImTicket,
    tabname: "Manage Letters"
  },
  {
    id: GenerateId(),
    link: '/user/location/manage-location',
    link2: '/employee-access/location/manage-location',
    name: 'Manage Office Location',
    Icon: FaMapLocationDot,
    tabname: "Manage Office Locations",
  },
  {
    id: GenerateId(),
    link: '/user/filetype/manage-files',
    link2: '/employee-access/filetype/manage-files',
    name: 'Manage file type',
    Icon: FaFileInvoice,
    tabname: "Manage File",
  },
  {
    id: GenerateId(),
    link: '/user/employees/manage-employees',
    link2: '/employee-access/employees/manage-employees',
    name: 'Manage Employees',
    Icon: BiSolidUserDetail,
    tabname: "Manage Employees"
  },
  {
    id: GenerateId(),
    link: '/user/polls',
    link2: '/employee-access/polls',
    name: 'Manage Polls',
    Icon: HiSpeakerphone,
    tabname: "Manage Polls"
  },
  {
    id: GenerateId(),
    link: '/user/manage-categories',
    link2: '/employee-access/manage-categories',
    name: 'Manage Categories',
    Icon: BiCategoryAlt,
    tabname: "Manage Categories"
  },
]
export const EXTRA_TABS = [{
  link: '/user/letter/add-letter',
  link2: '/employee-access/letter/add-letter',
  tabname: "Manage Letters",
},
{
  link: '/user/profile/feed',
  name: 'feed',
  tabname: "Leader"
},
{
  link: '/user/profile/gallery',
  name: 'gallery',
  tabname: "Leader"
},
{
  link: '/user/profile/agenda',
  name: 'agenda',
  tabname: "Manage Agenda",
},
{
  link: '/user/profile/developments',
  name: 'developments',
  tabname: "Manage Developments",
},
{
  link: '/employee-access/profile/notifications',
  name: 'notifications',
  tabname: "employee",
},
]