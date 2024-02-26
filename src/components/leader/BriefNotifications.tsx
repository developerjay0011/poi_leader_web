import { cusSelector } from '@/redux_store/cusHooks';
import Link from 'next/link'
import { FC } from 'react'
import { Notification } from '@/components/leader/Notification'
interface NotiProps {
  id: string,
  leaderid: string,
  postid: string,
  userid: string,
  username: string,
  userimg: string,
  usertype: string,
  title: string,
  description: string,
  createddate: string,
  isread: true
}
interface BriefNotificationsProps {

}
export const BriefNotifications: FC<BriefNotificationsProps> = (noti) => {
  const {  notification } = cusSelector((state) => state.leader);
  return (
    <>
      <div className='w-[300px] h-[400px] bg-white rounded-md shadow-md border text-sky-950 flex flex-col overflow-hidden'>
        <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize'>
          Notifications{' '}
        </h2>

        <div className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
          { notification.length > 0 &&
              notification.map((noti: NotiProps, index: number) => {
              return (
                <Notification key={index} title={noti.title} description={noti.description} userimg={noti.userimg} />
              )
            })}
            </ul>
        </div>

        <div className='w-full py-2 flex justify-center'>
          <Link
            href={'/admin/profile/notifications'}
            className='hover:underline text-orange-500 font-normal capitalize'>
            see all
          </Link>
        </div>
      </div>
    </>
  )
}
