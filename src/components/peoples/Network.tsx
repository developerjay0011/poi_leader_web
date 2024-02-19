import CustomImage from '@/utils/CustomImage'
import { FC } from 'react'

interface NetworkProps {
  backgroundImg: string
  displayImg: string
}

export const Network: FC<NetworkProps> = ({ backgroundImg, displayImg }) => {
  return (
    <li className='border rounded-md overflow-hidden w-full bg-white shadow-sm'>
      <figure className='relative'>
        {/* BG Image */}
        <CustomImage
          src={backgroundImg}
          alt='background pic'
          width={1000}
          height={1000}
          className='w-full h-auto object-cover object-center'
        />

        {/* Followers count */}
        <p className='absolute top-3 right-3 text-[13px] text-white font-[500] bg-black bg-opacity-40 rounded-full capitalize px-4 py-1 shadow-md'>
          0 followers
        </p>

        {/* User pic */}
        <CustomImage
          src={displayImg}
          alt='user pic'
          width={1000}
          height={1000}
          className='aspect-square rounded-full w-[5rem] absolute top-full z-10 border-[3px] border-white translate-y-[-50%] left-5 object-cover object-center'
        />
      </figure>

      {/* Info box */}
      <div className='py-5 px-5 flex flex-col mt-10'>
        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>networks: </span>
          <span className='text-[13px]'>0 (0) common networks</span>
        </p>

        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>photos: </span>
          <span className='text-[13px]'>0</span>
        </p>

        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>videos: </span>
          <span className='text-[13px]'>0</span>
        </p>

        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>posts: </span>
          <span className='text-[13px]'>0</span>
        </p>

        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>since: </span>
          <span className='text-[13px]'>june 2023</span>
        </p>
      </div>
    </li>
  )
}
