'use client'
import { FC, useState } from 'react'
import { MdDelete, MdEdit, MdInfo, MdPreview } from 'react-icons/md'
import { PollInfoChart } from '@/components/posts/polls/PollInfoChart'
import { AnimatePresence } from 'framer-motion'
import { ManagePollsForm } from '@/components/leader/forms/PollsForm'
import { PollsPreview } from './PollsPreview'
import { ErrorTableRow } from '@/utils/ErrorTableRow'
import { cusSelector } from '@/redux_store/cusHooks'
import moment from 'moment'

interface PollTableRowProps {
  handleDelete: (id: string) => void
  polls: any
}

export const PollTableRow: FC<PollTableRowProps> = ({ polls, handleDelete }) => {
  const [showEditPollForm, setShowEditPollForm] = useState(false)
  const [showPollChart, setShowPollChart] = useState(false)
  const [showPollPreview, setShowPollPreview] = useState(false)
  const [polldata, setPolldata] = useState({})
  const currentTime = moment();

  const SetpollDATA = (pollitem: any) => {
    setPolldata({
      access: pollitem?.access,
      id: pollitem?.id,
      imgOptions: pollitem?.poll_options,
      poll_options: pollitem?.poll_options,
      pollType: pollitem?.polltype,
      publishDate: pollitem?.publish_date,
      title: pollitem?.title,
      expiresAt: pollitem?.close_date,
      view_access: pollitem?.view_access,
      votes_by: pollitem?.votes_by,
    })
  }


  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold capitalize text-center p-2 border max-w-[5px]'>
              S.No
            </th>
            <th className='font-semibold capitalize border p-2 text-left'>
              Poll Title
            </th>
            <th className='font-semibold capitalize text-center p-2 border max-w-[50px]'>
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {polls?.length > 0 ? (
            polls?.map((el: any, i: any) => {
              const targetDateTime = moment(el?.publish_date)
              const hasPassed = !currentTime.isAfter(targetDateTime);
              return (
                <>
                  <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>
                    <td className='capitalize text-left p-2 border-r text-center align-text-top max-w-[5px]'>
                      {i + 1}.
                    </td>
                    <td className='capitalize text-left p-2 border-r align-text-top'>
                      {el.title}
                    </td>
                    <td className='text-center p-2 border items-center justify-center max-w-[50px]'>
                      <div className='flex w-max items-center gap-2 m-auto cursor-pointer'>
                        <MdPreview
                          className='text-2xl'
                          onClick={() => { SetpollDATA(el); setShowPollPreview(true) }}
                        />
                        {hasPassed && (
                          <>
                            <MdEdit
                              className='text-2xl'
                              onClick={() => { SetpollDATA(el); setShowEditPollForm(true) }}
                            />
                            <MdDelete className='text-2xl' onClick={() => { SetpollDATA(el); handleDelete(el.id) }} />
                          </>
                        )}

                        <MdInfo
                          className='text-2xl'
                          onClick={() => { SetpollDATA(el); setShowPollChart(true) }}
                        />
                      </div>
                    </td>
                  </tr>
                </>
              )
            })
          ) : (
            <ErrorTableRow colNo={8} />
          )}
        </tbody>
      </table>

      <AnimatePresence mode='wait'>
        {showPollChart && (
          <PollInfoChart pollDetails={polldata} onClose={() => setShowPollChart(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showEditPollForm && (
          <ManagePollsForm
            onClose={() => setShowEditPollForm(false)}
            submitting={false}
            heading='Edit poll'
            edit={true}
            {...polldata}
          />
        )}
      </AnimatePresence>



      <AnimatePresence>
        {showPollPreview && (
          <PollsPreview
            onClose={() => setShowPollPreview(false)}
            pollDetails={polldata}
          />
        )}
      </AnimatePresence>
    </>
  )
}
