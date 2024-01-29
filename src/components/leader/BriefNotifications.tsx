import Link from 'next/link'
import { FC } from 'react'

interface BriefNotificationsProps {}
export const BriefNotifications: FC<BriefNotificationsProps> = () => {
  return (
    <>
      <div className='w-[300px] h-[400px] bg-white rounded-md shadow-md border text-sky-950 flex flex-col overflow-hidden'>
        <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize'>
          Notifications{' '}
        </h2>

        <div className='flex flex-col flex-1'></div>

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
