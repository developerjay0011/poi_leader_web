'use client'
import { FC, useState } from 'react'
import { BsFilePdf } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { HiUserAdd } from 'react-icons/hi'
import Banner from '@/assets/statistics_banner.jpg'
import { AiFillLike } from 'react-icons/ai'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { CusAreaChart } from '@/components/charts/CusAreaChart'
import { CusLineChart } from '@/components/charts/CusLineChart'
import { CusPieChart } from '@/components/charts/CusPieChart'
import { CusBarChart } from '@/components/charts/CusBarChart'
import CustomImage from '@/utils/CustomImage'

type Graph = 'LINE' | 'AREA' | 'PIE' | 'BAR'
const GraphType = [
  { name: 'LINE' },
  { name: 'AREA' },
  { name: 'PIE' },
  { name: 'BAR' },
]

const AdminAccountStatsPage: FC = () => {
  const [graphTypeVal, setGraphTypeVal] = useState<Graph>('AREA')

  return (
    <>
      {/* BANNER */}
      <div className='w-full mb-10 py-28 relative text-sky-950'>
        <CustomImage
          src={Banner}
          alt='stats banner'
          className='absolute top-0 left-0 w-full h-full object-top object-cover opacity-50 z-[5]'
        />

        <div className='flex flex-col relative items-center z-[10] w-full gap-3'>
          <h2 className='text-5xl font-semibold'>R.K Singh Statistics</h2>
          <p>View all your account activity here</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className='w-[70%] m-auto flex flex-col gap-5'>
        {/* Filter */}
        <div className='flex items-center gap-2'>
          <p className='capitalize'>select timeline</p>
          <select
            id='filter'
            className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
            <option value='5'>last 7 days</option>
            <option value='10'>last month</option>
            <option value='25'>3 months</option>
            <option value='25'>All</option>
          </select>
        </div>

        {/* Over Views */}
        <section className='border rounded-md bg-white py-5 px-10 justify-between flex items-center'>
          <article className='flex flex-col gap-2 items-center'>
            <AiFillLike className='text-5xl' />

            <p>0 likes</p>
          </article>

          <article className='flex flex-col gap-2 items-center'>
            <BsFilePdf className='text-5xl' />

            <div className='flex flex-col capitalize'>0 new letters</div>
          </article>
        </section>

        {/* 3 Column stats */}
        <div className='grid grid-cols-3 gap-5'>
          <article className='border rounded-md bg-white p-5 flex items-center gap-6'>
            <FaUsers className='text-5xl' />

            <div className='flex flex-col capitalize'>
              <h6 className='text-xl font-medium'>0</h6>
              <p>followers</p>
            </div>
          </article>

          <article className='border rounded-md bg-white p-5 flex items-center gap-6'>
            <HiUserAdd className='text-5xl' />

            <div className='flex flex-col capitalize'>
              <h6 className='text-xl font-medium'>0</h6>
              <p>Networks</p>
            </div>
          </article>

          <article className='border rounded-md bg-white p-5 flex items-center gap-6'>
            <HiUserAdd className='text-5xl' />

            <div className='flex flex-col capitalize'>
              <h6 className='text-xl font-medium'>0</h6>
              <p>Followings</p>
            </div>
          </article>
        </div>

        {/* MAIN Content including shortcuts / GRAPHS */}
        <div className='flex gap-5 relative mb-5'>
          {/* SHORTCUTS */}
          <div className='sticky top-0 left-0 self-start flex flex-col gap-5'>
            <div className='flex flex-col capitalize'>
              <label htmlFor='filter-1' className='flex flex-col gap-2'>
                <span className='font-medium text-base'>
                  Showing Statics of
                </span>
                <select
                  id='filter-1'
                  className='py-2 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                  <option value='agenda'>agenda</option>
                </select>
              </label>
            </div>

            <ShortcutsBox />
          </div>

          {/* GRAPHS BOX */}
          <section className='border rounded-md flex-1 p-5 self-start bg-white'>
            <h2 className='text-5xl font-semibold py-5 mb-5'>Agenda Stats</h2>

            {/* Filters */}
            <div className='flex gap-3 w-full justify-end'>
              <label htmlFor='filter-1' className='flex flex-col'>
                <span className='font-medium text-base'> Filter by time </span>
                <select
                  id='filter-1'
                  className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                  <option value='5'>last 7 days</option>
                  <option value='10'>last month</option>
                  <option value='25'>3 months</option>
                  <option value='25'>All</option>
                </select>
              </label>

              <label htmlFor='graphFilter' className='flex flex-col'>
                <span className='font-medium text-base'>Select Graph Type</span>
                <select
                  id='graphFilter'
                  value={graphTypeVal}
                  onChange={(e) => {
                    
                    setGraphTypeVal(e.target.value as Graph)
                  }}
                  className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                  {GraphType.map((el) => (
                    <option key={el.name} value={el.name}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* GRAPHS */}
            {graphTypeVal && (
              <div className='mt-5'>
                <div className='m-auto w-[80%] aspect-square'>
                  {graphTypeVal === 'AREA' && <CusAreaChart />}
                  {graphTypeVal === 'LINE' && <CusLineChart />}
                  {graphTypeVal === 'PIE' && <CusPieChart />}
                  {graphTypeVal === 'BAR' && <CusBarChart />}
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  )
}

export default AdminAccountStatsPage
