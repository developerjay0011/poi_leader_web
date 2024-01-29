import { CommonBox } from '@/utils/CommonBox'
import { user2Img } from '@/utils/utility'
import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'
import ARVIND from '@/assets/politicians-images/ARVIND_KEJRIWAL.jpg'
import MODI from '@/assets/politicians-images/narendar_modi.jpg'
import RAHUL from '@/assets/politicians-images/Rahul-Gandhi.jpg'

interface TrendingUsersProps {}
export const TrendingUsers: FC<TrendingUsersProps> = () => {
  return (
    <>
      <section
        className={`border rounded-md w-full bg-white text-sky-950 max-h-[25rem] overflow-hidden flex flex-col`}>
        <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize'>
          Trending Leaders
        </h2>

        <div className='overflow-y-scroll flex-1 main_scrollbar'>
          <ul className='flex flex-col'>
            <TrendingUser
              userImg={MODI}
              designation='prime minister'
              username='narendar modi'
            />
            <TrendingUser
              userImg={RAHUL}
              designation=' chairperson of the Indian Youth Congress'
              username='rahul gandhi'
            />
            <TrendingUser
              userImg={ARVIND}
              designation='Chief Minister of Delhi'
              username='arvind kejriwal'
            />
          </ul>
        </div>
      </section>
    </>
  )
}
interface TrendingUserProps {
  designation: string
  username: string
  userImg: string | StaticImageData
}

const TrendingUser: FC<TrendingUserProps> = ({
  userImg,
  designation,
  username,
}) => (
  <li className='flex gap-3 py-3 px-3 last_noti items-center'>
    <Image
      src={userImg}
      alt='trending user'
      width={1000}
      height={1000}
      className='rounded-full w-12 aspect-square object-cover object-center'
    />

    <div className='flex flex-col'>
      <h3 className='text-[14px] font-semibold capitalize'>{username}</h3>
      <p className='text-[12px] capitalize'>{designation}</p>
    </div>

    <button
      type='button'
      className='text-orange-500 hover:underline ml-auto text-[15px]'>
      Follow
    </button>
  </li>
)
