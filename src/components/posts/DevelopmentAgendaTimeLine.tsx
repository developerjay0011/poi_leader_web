import { FC } from 'react'
import { BiX } from 'react-icons/bi'
import { motion as m } from 'framer-motion'
import CustomImage from '@/utils/CustomImage'

interface AgendaTimelineProps {
  onClose: () => void
  title: string
}

export const DevelopmentAgendaTimeLine: FC<AgendaTimelineProps> = ({
  onClose,
  title,
}) => {
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
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-5 border-b font-semibold text-3xl capitalize'>
              {title} timeline
            </h3>

            <ul className='py-8 px-10'>
              <TimeLineData
                status={0}
                details='lorem bnkjvnfdjkv kjmkjdnf kjngdlkfsjgf kngkvbnd snjkgvfdskjgvjs gk9jvdfkbgvsn'
                title='acquired raw material'
              />
              <TimeLineData
                status={1}
                details='lorem bnkjvnfdjkv kjmkjdnf kjngdlkfsjgf kngkvbnd snjkgvfdskjgvjs gk9jvdfkbgvsn'
                title='acquired raw material'
              />
              <TimeLineData
                status={1}
                details='lorem bnkjvnfdjkv kjmkjdnf kjngdlkfsjgf kngkvbnd snjkgvfdskjgvjs gk9jvdfkbgvsn'
                title='acquired raw material'
              />
              <TimeLineData
                status={1}
                details='lorem bnkjvnfdjkv kjmkjdnf kjngdlkfsjgf kngkvbnd snjkgvfdskjgvjs gk9jvdfkbgvsn'
                title='acquired raw material'
              />
              <TimeLineData
                status={2}
                details='lorem bnkjvnfdjkv kjmkjdnf kjngdlkfsjgf kngkvbnd snjkgvfdskjgvjs gk9jvdfkbgvsn'
                title='acquired raw material'
              />
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
  status: 0 | 1 | 2
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

const TimeLineData: FC<TimeLineDataProps> = ({ details, title, status }) => {
  return (
    <>
      <li className={`last_timeline ${colors[status].line}`}>
        <div
          id='dot'
          className={`w-4 aspect-square rounded-full ${colors[status].dot} absolute top-0 left-0 translate-x-[-62%]`}
        />

        <div className='flex items-start gap-3 ml-5 flex-row-reverse'>
          <CustomImage
            src=''
            alt=''
            className='w-14 aspect-square rounded-full bg-rose-200'
          />

          <div className='flex flex-col w-full'>
            <h4 className='font-medium capitalize'>{title}</h4>
            <p className='text-[15px] text-gray-600'>{details}</p>
          </div>
        </div>
      </li>
    </>
  )
}
