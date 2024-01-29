'use client'
import { FC, useState, useEffect } from 'react'
import { ConfirmDialogBox } from './ConfirmDialogBox'
import { AnimatePresence } from 'framer-motion'

interface StatusBtnProps {
  status: string
  clickHandler: (status: string) => void
  inProgress: boolean
}

export const StatusBtn: FC<StatusBtnProps> = ({
  clickHandler,
  status,
  inProgress,
}) => {
  const [showConfirmBox, setShowConfirmBox] = useState(false)

  const changeStatus = () => {
    if (status === '0') clickHandler('1')
    else clickHandler('0')
  }

  useEffect(() => {
    if (!inProgress) setShowConfirmBox(false)
  }, [inProgress])

  const closeModal = () => setShowConfirmBox(false)
  const showModal = () => setShowConfirmBox(true)

  return (
    <>
      <button
        onClick={showModal}
        className={`text-white rounded-full py-0.5 px-4 text-[13px] capitalize enable_transition ${
          status === '0'
            ? 'bg-red-600 hover:bg-red-500'
            : 'bg-green-600 hover:bg-green-500'
        }`}>
        {status === '0' && 'deactive'}
        {status === '1' && 'active'}
      </button>
      <AnimatePresence mode='wait'>
        {showConfirmBox && (
          <ConfirmDialogBox
            onOk={changeStatus}
            onCancel={closeModal}
            noAllowed={inProgress}
          />
        )}
      </AnimatePresence>
    </>
  )
}
