import { CommonBox } from '@/utils/CommonBox'
import { friendImg, userImg } from '@/utils/utility'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { FaUserAltSlash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'

interface NetworksListProps {}

export const NetworksList: FC<NetworksListProps> = () => {
  return (
    <>
      <CommonBox
        title={"Follower's (3)"}
        cusJSX={[
          <Link
            href='/leader/profile/followers'
            key={Math.random()}
            className='text-orange-600 text-[14px] hover:underline'>
            See all
          </Link>,
        ]}>
        <div className='w-full py-5 overflow-x-scroll x_cusScroll'>
          <ul className='flex gap-5 w-max'>
            <FriendBox
              friendImg={friendImg}
              name='narendra modi'
              followersCount={0}
            />
            <FriendBox
              friendImg={friendImg}
              name='narendra modi'
              followersCount={0}
            />
            <FriendBox
              friendImg={friendImg}
              name='narendra modi'
              followersCount={0}
            />
            <FriendBox
              friendImg={friendImg}
              name='narendra modi'
              followersCount={0}
            />
            <FriendBox
              friendImg={friendImg}
              name='narendra modi'
              followersCount={0}
            />
            <FriendBox
              friendImg={friendImg}
              name='narendra modi'
              followersCount={0}
            />
          </ul>
        </div>
      </CommonBox>
    </>
  )
}

interface FriendBoxProps {
  name: string
  followersCount: number
  friendImg: string
}

const FriendBox: FC<FriendBoxProps> = ({ name, followersCount, friendImg }) => {
  return (
    <li className='border rounded-md overflow-hidden shadow-sm flex flex-col w-max'>
      <figure className='friend_box'>
        <Image src={friendImg} alt='friend image' width={1000} height={1000} />
      </figure>

      {/* Friend brief details */}
      <div className='flex flex-col items-center pt-3'>
        <h5 className='text-[15px] font-[600] capitalize'>{name}</h5>
        <p className='text-[12px] font-[500]'>{followersCount} followers</p>
      </div>

      {/* CTA's */}
      <div className='flex self-center gap-2 py-3'>
        <button
          type='button'
          className='rounded-md py-2 px-4 bg-sky-500 text-sky-50'>
          <FaMessage />
        </button>
        <button
          type='button'
          className='rounded-md py-2 px-4 bg-orange-500 text-sky-50'>
          <FaUserAltSlash />
        </button>
      </div>
    </li>
  )
}
