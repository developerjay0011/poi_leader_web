'use client'
import { FC, ReactNode } from 'react'
import { FiSearch } from 'react-icons/fi'

interface PeoplesComponentWrapperProps {
  children: ReactNode
  searchStr: string
  setSearchStr: (val: string) => void
  heading: string
  rightButton: ReactNode
}

export const PeoplesComponentWrapper: FC<PeoplesComponentWrapperProps> = ({
  children,
  heading,
  searchStr,
  setSearchStr,
  rightButton
}) => {
  return (
    <section className='border bg-white shadow-sm flex flex-col rounded-md'>
      {/* Filter networks */}
      <section className='flex justify-between flex-col gap-3'>
        <div className='flex justify-between max-[450px]:flex-col'>
          <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-5 py-4 text-[22px] font-semibold capitalize'>
            {heading}
          </h2>

          <div className='flex gap-5 mr-7 max-[450px]:ml-auto max-[450px]:mr-2'>
            <label className='relative self-center  max-[450px]:self-start'>
              <input
                type='search'
                className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none focus:bg-gray-50 focus:border-gray-400 transition-all placeholder:capitalize'
                placeholder={`search ${heading}`}
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value.toLowerCase())}
              />
              {searchStr.length === 0 && (
                <button className='absolute top-[8px] right-2'>
                  <FiSearch className='stroke-gray-400' />
                </button>
              )}
            </label>
            {rightButton && rightButton}
          </div>
        </div>
      </section>
      <div className='w-[100%] h-[1px] bg-zinc-200 m-auto' />

      <section className='px-7 py-5'>{children}</section>
    </section>
  )
}
