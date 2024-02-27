import { getImageUrl } from '@/config/get-image-url'
import CustomImage from '@/utils/CustomImage'
import Image from 'next/image'
import { FC } from 'react'

export const PollOption: FC<{
  id: string
  pollImg?: string
  pollText: string
  index: number,
  alldata: any,
  Onvote: () => void,
  isshow: boolean,
  calculatePercentage: () => void,
  isUserExist: boolean,
  isselected: boolean
}> = ({ id, index, pollText, pollImg, Onvote, isUserExist, isselected, calculatePercentage, isshow }) => {



  return (
    <label key={index} htmlFor={id} className={`w-full cursor-pointer`}>
      <input
        name='poll'
        type='radio'
        id={id}
        className={`hidden poll_checked`}
        onChange={() => { Onvote() }}
        disabled={isUserExist}
      />
      <span className={`border-2 w-full  pr-3 ${!pollImg ? 'py-3 px-5 capitalize' : ''} rounded-md overflow-hidden flex items-center gap-2 ${isselected ? 'bg-orange-50 border-orange-400 text-orange-500 font-medium' : ''}`}>
        <samp className='flex w-full items-center gap-2 rounded-md font-medium capitalize'>
          {pollImg && (
            <CustomImage
              alt='poll Img'
              height={1000}
              width={1000}
              src={getImageUrl(pollImg)}
              className='w-24 aspect-square object-cover object-center'
            />
          )}
          {!pollImg && index + ')'} {pollText}
        </samp>
        {isshow ? calculatePercentage() + "%" : ''}
      </span>
    </label>
  )
}
