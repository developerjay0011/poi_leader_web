'use client'
import { FC, useEffect, useState, memo, useCallback } from 'react'
import Sparkles from '@/assets/sparkles.png'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { calCurrentDate } from '@/utils/utility'
import { cusSelector } from '@/redux_store/cusHooks'
import CustomImage from '@/utils/CustomImage'
import { getImageUrl } from '@/config/get-image-url'
import dob from '@/assets/dob-cake.gif'

const prefixArr = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'] as const

interface Birthday {
  id: string
  name: string
  dob: string
  image: string
  sendGreetings: boolean
}

interface BirthdayNotificationsProps {
  className?: string
}

const NavigationButton = memo(({
  onClick,
  direction
}: {
  onClick: () => void
  direction: 'left' | 'right'
}) => (
  <button
    type='button'
    onClick={onClick}
    className={`flex items-center justify-center w-10 aspect-square text-orange-500 bg-orange-100 rounded-full absolute top-1/2 ${direction === 'left' ? 'left-2' : 'right-2'
      } translate-y-[-50%] hover:bg-orange-500 hover:text-orange-50 transition-all`}
  >
    {direction === 'left' ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
  </button>
))

NavigationButton.displayName = 'NavigationButton'

const BirthdayHeader = memo(({ birthday }: { birthday: Birthday }) => {
  const age = calCurrentDate(birthday.dob)
  const agePrefix = prefixArr[+(age.toString().at(-1) as string)]
  const date = new Date(birthday.dob).getDate()
  const month = new Date(birthday.dob).toLocaleDateString('en-IN', { month: 'long' })

  return (
    <div className='flex gap-3 bg-violet-500 px-4 py-2 items-center text-violet-50'>
      <CustomImage
        src={getImageUrl(birthday.image)}
        alt='display pic'
        width={1000}
        height={1000}
        className='w-[42px] aspect-square rounded-full object-cover object-center'
      />
      <strong>
        {age}
        {agePrefix} birthday
      </strong>
      <p className='flex flex-col ml-auto items-center'>
        <span className='italic text-xl'>{date}</span>
        <span className='text-base font-medium -mt-1'>{month}</span>
      </p>
    </div>
  )
})

BirthdayHeader.displayName = 'BirthdayHeader'

const BirthdayItem = memo(({ birthday }: { birthday: Birthday }) => (
  <li className='flex flex-col items-center transition-all relative'>
    <CustomImage
      src={dob}
      alt='birthday gif'
      unoptimized={true}
      width={1000}
      height={1000}
      className='w-[85%] aspect-square object-contain'
    />
    <h2 className='text-center text-xl text-slate-500 w-[100%] pb-3'>
      <strong className='text-orange-500 capitalize'>
        {birthday.name}
      </strong>{' '}
      Birthday
    </h2>
  </li>
))

BirthdayItem.displayName = 'BirthdayItem'

export const BirthdayNotifications: FC<BirthdayNotificationsProps> = memo(({ className = '' }) => {
  const { birthdaylist } = cusSelector((state) => state.leader);
  const [index, setIndex] = useState(0)
  const birthday = birthdaylist[index] as Birthday
  const [greetingsSent, setGreetingsSent] = useState(birthday?.sendGreetings ?? false)

  useEffect(() => {
    if (birthday) {
      setGreetingsSent(birthday.sendGreetings)
    }
  }, [birthday])

  const handlePrevious = useCallback(() => {
    setIndex(prev => (prev > 0 ? prev - 1 : birthdaylist.length - 1))
  }, [birthdaylist.length])

  const handleNext = useCallback(() => {
    setIndex(prev => (prev < birthdaylist.length - 1 ? prev + 1 : 0))
  }, [birthdaylist.length])

  if (!birthdaylist?.length || !birthday) return null

  return (
    <section className={`border rounded-md bg-white text-sky-950 overflow-hidden ${className}`}>
      <BirthdayHeader birthday={birthday} />
      <ul className='py-4 px-10 relative'>
        <CustomImage
          src={Sparkles}
          alt='background'
          className='absolute top-0 left-0 object-cover object-center w-full h-full'
        />
        <NavigationButton direction="left" onClick={handlePrevious} />
        <NavigationButton direction="right" onClick={handleNext} />
        <BirthdayItem birthday={birthday} />
      </ul>
    </section>
  )
})

BirthdayNotifications.displayName = 'BirthdayNotifications'

export default BirthdayNotifications
