'use client'
import { FC, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { DirectoryTable } from '../directory/DirectoryTable'

interface DirectoryPageProps {}
export const DirectoryPage: FC<DirectoryPageProps> = () => {
  const [searchString, setSearchString] = useState('')

  return (
    <>
      <section className='flex flex-col border rounded-md bg-white w-full'>
        <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize border-b'>
          my Directory
        </h2>

        <section className='flex flex-col gap-5 p-5 mt-5'>
          <div className='flex justify-between items-end max-[550px]:flex-col max-[550px]:items-start'>
            <section className='flex flex-col gap-3'>
              <h2 className='text-lg font-semibold'>Filters</h2>

              <div className='flex items-center gap-3 max-[700px]:flex-col max-[700px]:items-start'>
                <label htmlFor='filter' className='flex items-center gap-2'>
                  <span>Sort by</span>
                  <select
                    id='filter'
                    className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer'>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                  </select>
                </label>
              </div>
            </section>

            <section className='flex flex-col gap-5 max-[550px]:ml-auto max-[460px]:mt-4'>
              {/* CTA'S */}
              <div className='flex items-center justify-end gap-3'>
                {/* ADD OR EDIT Button */}
                <button className='px-5 py-2 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600'>
                  send message
                </button>
              </div>

              {/* FILTERS */}
              <div className='flex items-center gap-3 justify-end'>
                {/* SEARCH FILTER */}
                <label className='relative'>
                  <input
                    type='search'
                    className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all'
                    placeholder='search directory'
                    value={searchString}
                    onChange={(e) =>
                      setSearchString(e.target.value.toLowerCase())
                    }
                  />
                  {searchString.length === 0 && (
                    <button className='absolute top-[8px] right-2'>
                      <FiSearch className='stroke-gray-400' />
                    </button>
                  )}
                </label>
              </div>
            </section>
          </div>
          {/* Directory Table */}
          <DirectoryTable searchStr={searchString} />
        </section>
      </section>
    </>
  )
}
