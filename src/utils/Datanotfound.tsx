'use client'
import { FC } from 'react'

export const Datanotfound: FC<{ name: string }> = ({ name }) => {
  return (
    <div className='flex h-[200px] pt-[20px] capitalize w-full'>
      <p className='text-center text-xl font-[600] w-full'>
        ❗{name} Not Found
      </p>
    </div>
  )
}
