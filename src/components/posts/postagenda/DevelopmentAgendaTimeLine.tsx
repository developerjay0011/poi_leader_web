import { FC } from 'react'
import { BiX } from 'react-icons/bi'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import { FaFileAlt } from 'react-icons/fa'
import { getImageUrl } from '@/config/get-image-url'
import { dateConverter } from '@/utils/utility'

export type PRIORITY = 0 | 1 | 2
interface AgendaTimelineProps {
  onClose: () => void
  title: string
  timeline: any,
  status: string
}

export const DevelopmentAgendaTimeLine: FC<AgendaTimelineProps> = ({ onClose, title, timeline, status }) => {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-[100]'>
        <div className='bg-black bg-opacity-20 backdrop-blur-[2px] w-full h-full main_scrollbar overflow-y-scroll'>
          <m.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='m-auto my-5 bg-white relative overflow-hidden rounded shadow-md w-[40%] max-[1600px]:w-1/2 max-[1050px]:w-[70%] max-[750px]:w-[85%] max-[600px]:w-[95%] max-[600px]:my-3'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-3 py-3 border-b font-semibold text-2xl capitalize'>
              {title} timeline
            </h3>
            <ul className='py-8 px-10'>
              {timeline?.map((item: any, index: any) =>
                <TimeLineData
                  key={index}
                  status={Number(status) as PRIORITY}
                  details={item?.description}
                  title={item?.milestone}
                  attachments={item?.attachments}
                  created_date={item?.created_date}
                />
              )}
            </ul>
          </m.div>
        </div>
      </m.div>
    </>
  )
}

interface TimeLineDataProps {
  details: string
  title: string
  status: 0 | 1 | 2,
  attachments: any
  key: string,
  created_date: any
}

const colors = {
  0: {
    line: 'border-zinc-400',
    dot: 'bg-zinc-400',
  },
  1: {
    line: 'border-yellow-500',
    dot: 'bg-yellow-500',
  },
  2: {
    line: 'border-green-500',
    dot: 'bg-green-500',
  },
}

const TimeLineData: FC<TimeLineDataProps> = ({ details, title, status, attachments, key, created_date }) => {
  return (
    <>
      <li key={key} className={`last_timeline ${colors[status].line}`}>
        <div
          id='dot'
          className={`w-4 aspect-square rounded-full ${colors[status].dot} absolute top-0 left-0 translate-x-[-62%]`}
        />

        <div className='flex items-start gap-3 ml-5 flex-row-reverse'>
          {attachments?.map((el: any, inedx: any) => (
            <a key={inedx} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download><FaFileAlt /></a>))}
          <div className='flex flex-col w-full'>
            <h4 className='font-medium capitalize'>{title}</h4>
            {created_date && <p className='text-[15px] text-gray-600'>{dateConverter(created_date)}</p>}
            <p className='text-[15px] text-gray-600'>{details}</p>
          </div>
        </div>
      </li>
    </>
  )
}
