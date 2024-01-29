import { userImg } from '@/utils/utility'
import Image from 'next/image'
import { FC } from 'react'
import { BiComment, BiLike, BiShare } from 'react-icons/bi'
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri'

interface BriefPostProps {}
export const BriefPost: FC<BriefPostProps> = () => {
  return (
    <>
      <li className='w-full aspect-square rounded-md bg-sky-50 overflow-hidden relative brief_post'>
        <button id='postIcon' className='absolute top-4 right-4 z-[5]'>
          <RiCheckboxMultipleBlankFill className='text-2xl text-white' />
        </button>

        <div className='w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 overlay flex items-center justify-center'>
          <div className='flex gap-4 text-white'>
            <p className='flex items-center gap-2'>
              <BiLike className='text-xl' /> 0
            </p>

            <p className='flex items-center gap-2'>
              <BiShare className='text-xl' /> 0
            </p>

            <p className='flex items-center gap-2'>
              <BiComment className='text-xl' /> 0
            </p>
          </div>
        </div>
        <Image
          width={1000}
          height={1000}
          className='w-full h-full object-cover object-center'
          src={userImg}
          alt='user image'
        />
      </li>
    </>
  )
}
