import { cusSelector } from '@/redux_store/cusHooks'
import { CommonBox } from '@/utils/CommonBox'
import { GenerateId } from '@/utils/utility'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BsPlusCircle } from 'react-icons/bs'

interface StoriesBoxProps {}

const IMAGES = [
  'https://images.unsplash.com/photo-1665395806066-d47f41e6aa6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  'https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  'https://images.unsplash.com/photo-1696430484960-543301cda6d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  'https://images.unsplash.com/photo-1696587522095-1d0b522b3e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  'https://plus.unsplash.com/premium_photo-1696617442033-195805880c76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1937&q=80',
]

export const StoriesBox: FC<StoriesBoxProps> = () => {
  const id = GenerateId()
  const { userDetails } = cusSelector((st) => st.UI)

  return (
    <>
      <CommonBox
        title='My Stories'
        cusJSX={[
          <Link
            key={id}
            href={'/leader'}
            className='text-sm font-normal hover:underline text-orange-500'>
            see all
          </Link>,
        ]}>
        <ul className='flex gap-2 py-5'>
          <Story img={userDetails?.displayPic as string} self />
          {IMAGES.slice(0, 3).map((el) => (
            <Story key={el} img={el} />
          ))}
        </ul>
      </CommonBox>
    </>
  )
}

interface StoryProps {
  img: string
  self?: boolean
}

const Story: FC<StoryProps> = ({ img, self }) => {
  return (
    <>
      <li className='w-[25%] aspect-[9/16] rounded-lg relative overflow-hidden'>
        {/* User Img */}
        {self ? (
          <BsPlusCircle className='absolute top-3 left-3 z-10 text-white text-[38px] shadow' />
        ) : (
          <Image
            src={img}
            width={1000}
            height={1000}
            alt='user display pic'
            className='absolute top-3 left-3 border-2 border-white z-20 w-12 aspect-square rounded-full object-cover object-center shadow'
          />
        )}

        {/* Story Image */}
        <figure className='absolute top-0 left-0 w-full h-full object-cover object-center story_img'>
          <Image
            src={img}
            alt=''
            width={1000}
            height={1000}
            className='w-full h-full object-cover object-center'
          />
          {/* Overlay */}
          <div className='absolute top-0 left-0 w-full bg-black bg-opacity-25 h-full'></div>
        </figure>
      </li>
    </>
  )
}
