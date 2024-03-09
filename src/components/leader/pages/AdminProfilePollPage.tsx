'use client'
import { FC, useState } from 'react'
import { ManagePollsForm } from '../forms/ManagePollsForm'
import { PollsTable } from '@/components/posts/polls/PollsTable'
import { AnimatePresence } from 'framer-motion'
import { BiPlusCircle } from 'react-icons/bi'
import { dateTimeConverter } from '@/utils/utility'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { FaPlus } from 'react-icons/fa6'

export const AdminProfilePollsPage: FC = () => {
  const [showAddPollForm, setShowAddPollForm] = useState(false)

  return (
    <>
      <div className='flex gap-5 w-full relative'>
        {/* <div className='sticky top-0 left-0 self-start max-[1000px]:hidden w-max'>
          <ShortcutsBox />
        </div> */}
        <ProfileShortcutsBox />

        <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
          {/* <section className='flex flex-col px-5 gap-6 mb-5'>
            <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-semibold text-[20px] capitalize'>
              polls
            </h2>
            <button
              type='button'
              onClick={() => setShowAddPollForm(true)}
              className='rounded-full bg-orange-500 text-orange-50 py-3 self-end px-8 capitalize font-medium flex items-center gap-2'>
              <BiPlusCircle className='text-2xl' /> create poll
            </button>
          </section> */}

          <div className='overflow-hidden flex flex-col flex-1 self-start px-5 border-b py-3 after:h-1/2 after:w-[3px] after:bg-orange-600 
            after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%]
             after:left-0 relative w-full' >

            <div className='flex items-center justify-between gap-3'>
              <h2 className="flex items-center text-[22px] font-semibold capitalize">
                polls
              </h2>
              <div className='flex gap-5'>
                <button
                  type='button'
                  onClick={() => setShowAddPollForm(true)}
                  className={`flex items-center gap-2 self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                >
                  create poll
                </button>
              </div>
            </div>
          </div>
          <section className='flex flex-col px-5 gap-6 mb-5'>
            <PollsTable />
          </section>
        </div>
      </div>

      <AnimatePresence>
        {showAddPollForm && (
          <ManagePollsForm
            onClose={() => setShowAddPollForm(false)}
            submitting={false}
            heading='create poll'
            expiresAt={dateTimeConverter(new Date().toString(), 4)}
            publishDate={dateTimeConverter(new Date().toString(), 0)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const genId = () => {
  let count = 0
  return () => {
    return (++count).toString()
  }
}

const idGen1 = genId()
const idGen2 = genId()
