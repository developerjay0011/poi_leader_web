import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import Link from 'next/link'
import { FC } from 'react'
import { Notification } from '@/components/leader/Notification'
import { ClearAllLeaderNotification, getNotification } from '@/redux_store/leader/leaderAPI';
import { leaderActions } from '@/redux_store/leader/leaderSlice';
import { Datanotfound } from '@/utils/Datanotfound';
import { Savedby } from '@/constants/common';
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
  onClick: any

}
export const BriefNotifications: FC<BriefNotificationsProps> = ({ onClick }) => {
  const { notification } = cusSelector((state) => state.leader);
  const { userDetails }: any = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();

  return (
    <>
      <div className='w-[300px] h-[400px] bg-white rounded-md shadow-md border text-sky-950 flex flex-col overflow-hidden '>
        <div className='flex items-center justify-between border-b py-1'>
          <h2 className='flex items-center h-[30px] after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-3  font-[500] text-[16px] capitalize'>
            Notifications
          </h2>
          {(notification.length > 0 && Savedby()?.saved_by_type == "leader") &&
            <h2
              onClick={async () => {
                await ClearAllLeaderNotification(userDetails.leaderId)
                const response = await getNotification({
                  "leaderId": userDetails?.leaderId,
                  "employeeId": userDetails?.employeeId
                });
                dispatch(leaderActions.setNotification(response));
              }}
              className='cursor-pointer flex items-center font-[500] text-[13px] capitalize px-3 hover:underline hover:text-orange-500 '>
              Clear
            </h2>
          }
        </div>

        <div className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
            {notification.length > 0 &&
              notification.map((noti: any, index: number) => {
                return (
                  <Notification noti={noti} key={index} title={noti.title} description={noti.description} userimg={""} />
                )
              })
            }
          </ul>
        </div>



        <div className='w-full py-2 flex justify-center'>
          <Link
            href={Savedby()?.saved_by_type == "employee" ? '/employee-access/profile/notifications' : '/user/notifications'}
            onClick={() => onClick()}
            className='hover:underline text-orange-500 font-normal capitalize'>
            see all
          </Link>
        </div>
      </div>
    </>
  )
}
