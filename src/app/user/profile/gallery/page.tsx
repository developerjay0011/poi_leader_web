'use client'
import { useState } from 'react'
import { BriefPost } from '@/components/posts/BriefPost'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { validate } from 'uuid'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'

const AdminProfileGalleryPage = () => {
  const [searchStr, setSearchStr] = useState('')
  const changeSearchStr = (val: string) => setSearchStr(val)

  return (
    <>
      <div className='flex gap-5 w-full relative'>
        <div className='sticky top-0 left-0 self-start max-[1000px]:hidden'>
          <ShortcutsBox />
        </div>

        <section className='border bg-white shadow-sm flex flex-col rounded-md flex-1'>
          <section className='flex justify-between flex-col'>
            <div className='flex justify-between'>
              <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize max-[650px]:px-3'>
                Gallery
              </h2>
            </div>

            <div className='w-[96%] h-[1px] bg-zinc-200 m-auto max-[500px]:w-[90%]' />
          </section>

          <div className='py-7 px-7 max-[650px]:px-3'>
            <label htmlFor='filter' className='flex items-center gap-2'>
              <span>Media</span>
              <select
                id='filter'
                className='py-1 px-3 text-md border border-gray-300 outline-none text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                <option value=''>All</option>
                <option value='video'>video</option>
                <option value='image'>image</option>
              </select>
            </label>
          </div>

          <section className='px-7 pb-8 max-[650px]:px-3'>
            <ul className='grid grid-cols-5 gap-2 max-[1300px]:grid-cols-4 max-[750px]:grid-cols-3 max-[750px]:gap-1 max-[550px]:grid-cols-2 max-[450px]:grid-cols-1'>
              <BriefPost />
              <BriefPost />
            </ul>
          </section>
        </section>
      </div>
    </>
  )
}

export default AdminProfileGalleryPage
