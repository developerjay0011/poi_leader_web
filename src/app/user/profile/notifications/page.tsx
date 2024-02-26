
import { Notification } from '@/components/leader/Notification'
import { BriefProfileInfoBox } from '@/components/timlineComponents/BriefProfileInfoBox'
import {  cusSelector } from '@/redux_store/cusHooks';
import { CommonBox } from '@/utils/CommonBox'



const NotificationsPage = () => {
  // const {  notification } = cusSelector((state) => state.leader);


  return (
    <div className='flex gap-5'>
      <CommonBox title='all notifications' width='flex-1 self-start'>
        <ul className='flex flex-col'>
          {/* <Notification /> */}
        </ul>
      </CommonBox>

      <div className='max-[1000px]:hidden'>
        <BriefProfileInfoBox />
      </div>
    </div>
  )
}

export default NotificationsPage
