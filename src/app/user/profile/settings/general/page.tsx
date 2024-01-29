'use client'
import { GenerateId } from '@/utils/utility'
import Link from 'next/link'
import { FC, useState, useId } from 'react'

const AdminGeneralSettingPage: FC = () => {
  return (
    <>
      <section className='flex flex-col gap-5'>
        <div className='text-sky-950 flex flex-col gap-1'>
          <h2 className='text-3xl capitalize font-medium'>general setting</h2>
          <p>
            Set your login preference, help us personalize your experience and
            make big account change here.
          </p>
        </div>

        <ul>
          <GeneralSetting
            description='user can follow you if this setting is on'
            title='enable follow me'
          />

          <GeneralSetting
            description='user can see your agendas'
            title='show agendas'
          />

          <GeneralSetting
            description='send me notification emails my friends like, share or message me'
            title='Send Me Notifications'
          />
        </ul>

        <div className='flex justify-end gap-3'>
          <Link
            href={'/leader/profile'}
            className='rounded-full px-8 py-3 text-[14px] bg-gray-400 text-gray-50 transition-all capitalize hover:bg-orange-500 hover:text-orange-50'>
            cancel
          </Link>
          <button
            type='button'
            className='rounded-full px-8 py-3 text-[14px] bg-orange-500 text-orange-50 transition-all capitalize hover:bg-gray-400 hover:text-gray-50'>
            save
          </button>
        </div>

        <div className='mt-5 bg-gray-200 rounded py-4 px-5 text-sky-950'>
          <h4 className='text-2xl capitalize font-medium'>Account changes</h4>

          <p className='mt-4 flex items-center justify-between text-gray-600'>
            <span>Hide your Posts and profile</span>
            <button
              type='button'
              className='rounded-full bg-gray-400 text-[14px] text-gray-50 py-2 px-6 hover:bg-orange-500 hover:text-orange-50 capitalize'>
              deactivate account
            </button>
          </p>

          <p className='mt-4 flex items-center justify-between text-gray-600'>
            <span>Delete your account and data</span>
            <button
              type='button'
              className='rounded-full bg-gray-400 text-[14px] text-gray-50 py-2 px-6 hover:bg-orange-500 hover:text-orange-50 capitalize'>
              close account
            </button>
          </p>
        </div>
      </section>
    </>
  )
}

export default AdminGeneralSettingPage

interface GeneralSettingProps {
  title: string
  description: string
}

const GeneralSetting: FC<GeneralSettingProps> = ({ description, title }) => {
  const [checked, setChecked] = useState(false)
  const id = useId()

  return (
    <>
      <li className='flex items-center justify-between border-b py-5'>
        <div className='flex flex-col'>
          <h3 className='capitalize font-[500]'>{title}</h3>
          <p className='text-[15px] first-letter:capitalize text-gray-600'>
            {description}
          </p>
        </div>

        <label htmlFor={id} className='cursor-pointer'>
          <input
            type='checkbox'
            id={id}
            checked={checked}
            onChange={(e) => setChecked((lst) => !lst)}
            className='hidden cus_check_box'
          />
          <div className='inline-block rounded-full w-16 h-8 bg-gray-400 relative transition-all'>
            <p className='text-white uppercase text-[12px] absolute top-1/2 translate-y-[-50%] left-[51%]'>
              {checked ? 'on' : 'off'}
            </p>
            <span className='absolute h-[80%] aspect-square rounded-full bg-white top-1/2 translate-y-[-50%] left-[7%] transition-all' />
          </div>
        </label>
      </li>
    </>
  )
}
