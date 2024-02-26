import CustomImage from '@/utils/CustomImage'
import moment from 'moment'
import { FC } from 'react'

interface NetworkProps {
  backgroundImg: string
  displayImg: string
  name: string
  member: [],
  created_date:string
}

export const Network: FC<NetworkProps> = ({ backgroundImg, displayImg, name, member, created_date }) => {
  return (
    <li className='border rounded-md overflow-hidden w-full bg-white shadow-sm'>
      {/* <figure className='relative'>
     
        <CustomImage
          src={backgroundImg}
          alt='background pic'
          width={1000}
          height={1000}
          className='w-full h-auto object-cover object-center'
        />


        <p className='absolute top-3 right-3 text-[13px] text-white font-[500] bg-black bg-opacity-40 rounded-full capitalize px-4 py-1 shadow-md'>
          0 followers
        </p>

       
        <CustomImage
          src={displayImg}
          alt='user pic'
          width={1000}
          height={1000}
          className='aspect-square rounded-full w-[5rem] absolute top-full z-10 border-[3px] border-white translate-y-[-50%] left-5 object-cover object-center'
        />
      </figure> */}

      {/* Info box */}
      <div className='py-5 px-5 flex flex-col '>
        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>Name:  </span>
          <span className='text-[13px]'>{name}</span>
          
        </p>
        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>member: </span>
          <span className='text-[13px]'>{member?.length}</span>
        </p>
        {/* <p className='capitalize flex items-center gap-3 text-[14px]'>
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
        </p> */}

        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>since: </span>
          <span className='text-[13px]'>{moment(created_date).format('MMM YYYY')}</span>
        </p>
      </div>
    </li>
  )
}
