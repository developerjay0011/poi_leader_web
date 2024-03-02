'use client'
import { FC } from 'react'
import { motion as m } from 'framer-motion'
import { BiX } from 'react-icons/bi'
import { CusPieChart } from '@/components/charts/CusPieChart'

interface PollInfoChartProps {
  onClose: () => void
  pollDetails:any
}

export const PollInfoChart: FC<PollInfoChartProps> = ({ onClose, pollDetails }) => {

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed top-0 left-0 h-[100dvh] w-full'>
      <section className='flex justify-center w-full h-full bg-black bg-opacity-30 backdrop-blur-[2px] py-4 items-center'>
        <m.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className='w-max aspect-sqaure bg-white relative z-[50] p-10 rounded-md shadow-md flex flex-col items-center'>
          <button className='absolute top-3 right-3' onClick={onClose}>
            <BiX className='text-3xl' />
          </button>

          {/* Chart */}
          <div className='h-[25rem] aspect-square'>
            <CusPieChart options={pollDetails?.poll_options?.map((item: any) => ({ name: item?.text, value: item?.votes }))  } />
          </div>
        </m.div>
      </section>
    </m.div>
  )
}
