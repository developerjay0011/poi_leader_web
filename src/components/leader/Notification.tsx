import { user2Img } from '@/utils/utility'
import Image from 'next/image'
import { FC } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi'

export const Notification: FC = () => {
  return (
    <li className='py-5 last_noti flex items-center gap-5'>
      <Image
        src={user2Img}
        alt='user 2 pic'
        width={1000}
        height={1000}
        className='w-14 aspect-square rounded-full object-cover object-center'
      />

      {/* Info box */}
      <div className='flex flex-col'>
        <h2>Narendre modi liked your post</h2>
        <p className='text-[13px]'>
          <code>👍</code> 0 mins ago
        </p>
      </div>

      {/* Notification */}
      <button className='ml-auto hover:text-orange-500'>
        <BiSolidTrashAlt className='' />
      </button>
    </li>
  )
}
