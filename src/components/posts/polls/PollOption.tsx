import CustomImage from '@/utils/CustomImage'
import { FC } from 'react'

export const PollOption: FC<{
  id: string
  pollImg?: string
  pollText: string
  index: number
}> = ({ id, index, pollText, pollImg }) => {
  return (
    <label htmlFor={id} className='w-full cursor-pointer'>
      <input
        name='poll'
        type='radio'
        id={id}
        className='hidden poll_checked'
        onChange={(e) => console.log(`${id} is checked`)}
      />
      <span
        className={`border-2 w-full ${
          !pollImg ? 'py-3 px-5 capitalize' : ''
        } rounded-md overflow-hidden flex items-center gap-2`}>
        {pollImg && (
          <CustomImage
            alt='poll Img'
            height={1000}
            width={1000}
            src={pollImg}
            className='w-24 aspect-square object-cover object-center'
          />
        )}
        {!pollImg && index + ')'} {pollText}
      </span>
    </label>
  )
}
