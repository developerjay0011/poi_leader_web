import { getImageUrl } from '@/config/get-image-url'
import CustomImage from '@/utils/CustomImage'
import { user2Img } from '@/utils/utility'
import { FC } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi'
interface NotificationProps {
  title: string
  description: string
  userimg:string
}
export const Notification: FC<NotificationProps> = ({ title, description, userimg }) => {

  return (
    <li className='py-5 last_noti flex items-center gap-5'>
      <CustomImage
        src={getImageUrl(userimg)}
        alt='user 2 pic'
        width={1000}
        height={1000}
        className='w-14 ml-3 aspect-square rounded-full object-cover object-center'
      />

      {/* Info box */}
      <div className='flex flex-col'>
        <p className='text-[13px] object-left'>{title}</p>
        <p className='text-[13px] object-left'>
          {description}
        </p>
      </div>

      {/* Notification */}
      {/* <button className='ml-auto hover:text-orange-500'>
        <BiSolidTrashAlt className='' />
      </button> */}
    </li>
  )
}
