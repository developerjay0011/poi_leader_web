import { FC, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { AnimatePresence, motion as m } from 'framer-motion'
import moment from 'moment'
import { FaFileAlt } from "react-icons/fa";
import { getImageUrl } from '@/config/get-image-url';
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import toast from 'react-hot-toast';
import {

  TimeLineDetails
} from '@/utils/typesUtils'
import { deleteTimeLine, getAgenda } from '@/redux_store/agenda/agendaApi';
import { agendaAction } from '@/redux_store/agenda/agendaSlice';
import TimeLineForm from '../TineLineForm';
import { tryCatch } from '@/config/try-catch';
import { commonActions } from '@/redux_store/common/commonSlice';
import { ToastType } from '@/constants/common';

interface AgendaTimelineProps {
  onClose: () => void
  onAddMileStone: () => void
  title: string
  timeline: TimeLineDetails[]
  agendaid: string
  status: string
}

export const DevelopmentAgendaTimeLine: FC<AgendaTimelineProps> = ({
  onClose,
  onAddMileStone,
  title,
  timeline,
  agendaid,
  status
}) => {
  const [editTimeLine, setEditTimeLine] = useState(false);
  const [editData, setEditData] = useState<TimeLineDetails>();
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
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
              {title} timeline
            </h3>

            <ul className='py-8 px-10'>

              {timeline?.map((el: any, i: number) => (
                <TimeLineData
                  id={el.id}
                  key={el.milestone}
                  status={el?.status}
                  details={el?.description}
                  title={el?.milestone}
                  created_date={el?.created_date}
                  attachments={el?.attachments}
                  agendaid={agendaid}
                  index={i}
                  timeline={timeline}
                  edithandler={() => { setEditTimeLine(true), setEditData(el) }}
                />
              ))}
              {status != "completed" &&
                <div className='flex justify-center col-span-full gap-2'>
                  <button
                    className={`text-sm mt-3 align-center transition-all px-5 py-1 rounded-full capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                    onClick={() => onAddMileStone()}
                  >
                    Add Milestone
                  </button>
                </div>
              }

              {<AnimatePresence mode="wait">
                {editTimeLine && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""}`}>
                    <div className='bg-black bg-opacity-20 backdrop-blur-[2px] w-full h-full main_scrollbar overflow-y-scroll'>
                      <m.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className='m-auto my-5 bg-white relative overflow-hidden rounded shadow-md w-[40%] max-[1600px]:w-1/2 max-[1050px]:w-[70%] max-[750px]:w-[85%] max-[600px]:w-[95%] max-[600px]:my-3'>
                        <button
                          type='button'
                          onClick={() => setEditTimeLine(false)}
                          className='absolute top-3 right-3 z-40'>
                          <BiX className='text-3xl' />
                        </button>
                        <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                          Edit Milestone
                        </h3>
                        <div className="py-5 px-5">
                          <TimeLineForm data={editData} isedit={true} agendaid={agendaid} onCancel={() => setEditTimeLine(false)} />
                        </div>
                      </m.div>
                    </div>
                  </m.div>
                )}

              </AnimatePresence>}
            </ul>

          </m.div>

        </div>
      </m.div>
    </>
  )
}
export const FileOpen: FC<AgendaTimelineProps> = ({
  onClose,
  title,
  timeline
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
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
              {title} timeline
            </h3>
          </m.div>
        </div>
      </m.div>
    </>
  )
}
interface TimeLineDataProps {
  details: string
  title: string
  status: string
  created_date: string
  attachments: string[]
  agendaid: string
  id: string
  edithandler: () => void,
  timeline: any
  index: number
}

const colors = {

  0: {
    line: 'border-zinc-400',
    dot: 'bg-zinc-400',
  },
  1: {
    line: 'border-green-500',
    dot: 'bg-green-500',
  },
}

const TimeLineData: FC<TimeLineDataProps> = ({ index, timeline, details, title, status, created_date, attachments, id, agendaid, edithandler }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const deletehandler = async () => {
    tryCatch(
      async () => {
        const response = await deleteTimeLine(id, userDetails?.leaderId as string, agendaid as string);
        if (response?.success) {
          const agendaData = await getAgenda(userDetails?.leaderId as string);
          dispatch(agendaAction.storeAgendas(agendaData))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }

      })
  }
  return (
    <>
      <li className={`${timeline?.length - 1 > index && colors[status == "completed" ? 1 : 0].line} ${timeline?.length - 1 > index ? 'last_timeline' : 'last_timeline border-white'}`}>
        <div
          id='dot'
          className={`w-4 aspect-square rounded-full ${colors[status == "completed" ? 1 : 0].dot} absolute top-0 left-0 translate-x-[-62%]`}
        />

        <div className='flex items-start gap-3 ml-5 flex-row-reverse'>
          {attachments?.map((el) => (
            <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
              <FaFileAlt />
            </a>
          ))}
          {status != "completed" && <a onClick={() => { deletehandler() }}  ><BsTrash3Fill /></a>}
          {status != "completed" && <a onClick={() => { edithandler() }} ><FaEdit /></a>}
          <div className='flex flex-col w-full'>
            <h4 className='font-medium capitalize'>{title} </h4>
            <p className='text-[15px] text-gray-600'>{moment(created_date).format('DD MMM, yyyy')}</p>
            <p className='text-[15px] text-gray-600'>{details}</p>
          </div>
        </div>
      </li>
    </>
  )
}
