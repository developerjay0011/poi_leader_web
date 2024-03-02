'use client'
import { FC, useState } from 'react'
import { MdDelete, MdEdit, MdInfo, MdPreview } from 'react-icons/md'
import { PollInfoChart } from '@/components/posts/polls/PollInfoChart'
import { AnimatePresence } from 'framer-motion'
import { ManagePollsForm } from '@/components/leader/forms/ManagePollsForm'
import { PollDetails } from '@/utils/typesUtils'
import { PollsPreview } from './PollsPreview'
import { dateTimeConverter } from '@/utils/utility'

interface PollTableRowProps extends PollDetails {
  index: number
  handleDelete:(id:string)=>void
}

export const PollTableRow: FC<PollTableRowProps> = (props) => {
  const [showEditPollForm, setShowEditPollForm] = useState(false)
  const [showPollChart, setShowPollChart] = useState(false)
  const [showPollPreview, setShowPollPreview] = useState(false)

  const curDate = dateTimeConverter(new Date().toString(), 0)

  return (
    <>
      <tr className='text-center last_noti border-dashed'>
        <td className='text-left py-3'>{props.index}</td>
        <td className='text-left py-3'>{props.title}</td>
        <td className='py-3'>
          <div className='flex w-max items-center gap-2 m-auto cursor-pointer'>
            <MdPreview
              className='text-2xl'
              onClick={() => setShowPollPreview(true)}
            />
            {props.publishDate > curDate && (
              <>
                <MdEdit
                  className='text-2xl'
                  onClick={() => setShowEditPollForm(true)}
                />
                <MdDelete className='text-2xl' onClick={() => props.handleDelete(props.id)} />
              </>
            )}

            <MdInfo
              className='text-2xl'
              onClick={() => { console.log(props.poll_options),setShowPollChart(true)}}
            />
          </div>
        </td>
      </tr>

      <AnimatePresence mode='wait'>
        {showPollChart && (
          <PollInfoChart pollDetails={props} onClose={() => setShowPollChart(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditPollForm && (
          <ManagePollsForm
            onClose={() => setShowEditPollForm(false)}
            submitting={false}
            heading='Edit poll'
            edit={true}
            {...props}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPollPreview && (
          <PollsPreview
            onClose={() => setShowPollPreview(false)}
            pollDetails={props}
          />
        )}
      </AnimatePresence>
    </>
  )
}
