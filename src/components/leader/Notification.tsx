import { getImageUrl } from '@/config/get-image-url'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { DeleteLeaderNotification, getNotification } from '@/redux_store/leader/leaderAPI'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import CustomImage from '@/utils/CustomImage'
import { user2Img } from '@/utils/utility'
import { FC } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi'
interface NotificationProps {
  title: string
  description: string
  userimg: string
  noti: any
}
export const Notification: FC<NotificationProps> = ({ title, description, userimg, noti }) => {
  const { userDetails }: any = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();



  return (
    <li className='py-5 last_noti flex items-center gap-5'>
      <CustomImage
        src={getImageUrl(userimg)}
        alt='user 2 pic'
        width={1000}
        height={1000}
        className='w-14 ml-3 aspect-square rounded-full object-cover object-center '
      />

      {/* Info box */}
      <div className='flex flex-col text-left'>
        <p className='text-[13px] object-left'>{title}</p>
        <p className='text-[13px] object-left'>
          {description}
        </p>
      </div>

      {/* Notification */}
      <button onClick={async () => {
        await DeleteLeaderNotification({
          "id": noti?.id,
          "leaderid": userDetails.leaderId
        })
        const response = await getNotification(userDetails?.leaderId as string);
        dispatch(leaderActions.setNotification(response));
      }} className='ml-auto hover:text-orange-500'>
        <BiSolidTrashAlt className='' />
      </button>
    </li>
  )
}
