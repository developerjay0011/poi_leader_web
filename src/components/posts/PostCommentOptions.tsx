'use client'
import { FC, useState } from 'react'
import { BsTrash3Fill } from 'react-icons/bs'
import { MdReport } from 'react-icons/md'
import { AnimatePresence, motion as m } from 'framer-motion'
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox'
import { cusSelector } from '@/redux_store/cusHooks'

interface PostCommentOptionsProps {
  deleteCommentHandler: () => void
  onClose: () => void
  userId: string
}

export const PostCommentOptions: FC<PostCommentOptionsProps> = ({
  deleteCommentHandler,
  onClose,
  userId,
}) => {
  const { userDetails } = cusSelector((st) => st.UI)
  const [showConfirmBox, setShowConfirmBox] = useState(false)

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col items-start z-50 bg-white rounded-sm shadow-lg absolute top-5 right-0'>
        <button className='flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all'>
          <MdReport className='text-xl' /> report
        </button>
        {userId === userDetails?.id && (
          <button
            onClick={() => {
              setShowConfirmBox(true)
            }}
            className='flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all'>
            <BsTrash3Fill /> delete
          </button>
        )}
      </m.div>

      <AnimatePresence mode='wait'>
        {showConfirmBox && (
          <ConfirmDialogBox
            noAllowed={false}
            onCancel={() => {
              setShowConfirmBox(false)
              onClose()
            }}
            onOk={deleteCommentHandler}
          />
        )}
      </AnimatePresence>
    </>
  )
}
