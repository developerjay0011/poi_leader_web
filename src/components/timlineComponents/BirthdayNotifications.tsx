'use client'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Sparkles from '@/assets/sparkles.png'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { GenerateId, calCurrentDate } from '@/utils/utility'
import { cusSelector } from '@/redux_store/cusHooks'
import { MdVerified } from 'react-icons/md'
import CustomImage from '@/utils/CustomImage'
import { getImageUrl } from '@/config/get-image-url'



const prefixArr = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th']

interface BirthdayNotificationsProps { }
export const BirthdayNotifications: FC<BirthdayNotificationsProps> = () => {
  const { birthdaylist } = cusSelector((state) => state.leader);
  const [index, setIndex] = useState(0)
  const birthday = birthdaylist[index]
  const [_, setGreetingsSent] = useState(birthday.sendGreetings)

  const age = calCurrentDate(birthday.dob)
  const agePrefix = prefixArr[+(age.toString().at(-1) as string)]

  const date = new Date(birthday.dob).getDate()
  const month = new Date(birthday.dob).toLocaleDateString('en-IN', { month: 'long', })

  const sendGreetingHanlder = () => {
    birthday.sendGreetings = !birthday.sendGreetings
    setGreetingsSent((lst) => !lst) // temp
  }

  // TEMP
  useEffect(() => {
    setGreetingsSent(birthday.sendGreetings)
  }, [birthday])

  return birthdaylist?.length > 0 && (
    <section className='border rounded-md bg-white text-sky-950 overflow-hidden'>
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

      <ul className='py-4 px-10 relative'>
        <CustomImage
          src={Sparkles}
          alt='background'
          className='absolute top-0 left-0 object-cover object-center w-full h-full'
        />

        {/* Toggle btns */}
        <button
          type='button'
          onClick={() =>
            setIndex((lst) => (lst > 0 ? lst - 1 : birthdaylist?.length - 1))
          }
          className='flex items-center justify-center w-10 aspect-square text-orange-500 bg-orange-100 rounded-full absolute top-1/2 left-2  translate-y-[-50%] hover:bg-orange-500 hover:text-orange-50 transition-all'>
          <BiSolidLeftArrow />
        </button>
        <button
          type='button'
          onClick={() =>
            setIndex((lst) => (lst < birthdaylist?.length - 1 ? lst + 1 : 0))
          }
          className='flex items-center justify-center w-10 aspect-square text-orange-500 bg-orange-100 rounded-full absolute top-1/2 right-2  translate-y-[-50%] hover:bg-orange-500 hover:text-orange-50 transition-all'>
          <BiSolidRightArrow />
        </button>
        <li
          className={`flex flex-col items-center transition-all relative `}>
          {/*  */}

          <CustomImage
            src={'https://wpkixx.com/html/pitnik/images/resources/dob-cake.gif'}
            alt='birthday gif'
            unoptimized={true}
            width={1000}
            height={1000}
            className='w-[85%] aspect-square object-contain'
          />

          <h2 className='text-center text-xl text-slate-500 w-max  pb-3 '>
            <strong className='text-orange-500 capitalize'>
              {birthday.name}
            </strong>{' '}
            Birthday
          </h2>

          {/* <button
            type='button'
            onClick={sendGreetingHanlder}
            hidden={birthday.sendGreetings}
            className={`text-sm mt-5 transition-all px-5 py-1 rounded-full capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}>
            send greetings
          </button> */}

          {birthday.sendGreetings && (
            <p className='flex gap-1 items-center mt-5 bg-green-100 px-4 text-sm font-medium py-2 rounded-full text-green-800'>
              <MdVerified className='text-green-500 text-xl' />
              Greetings Sent
            </p>
          )}
        </li>
      </ul>
    </section>
  )
}
