'use client'
import { FC } from 'react'
import { BsFillPatchExclamationFill } from 'react-icons/bs'
import { motion as m } from 'framer-motion'

interface ConfirmDialogBoxProps {
  onOk: () => void
  onCancel: () => void
  noAllowed: boolean
}

export const ConfirmDialogBox: FC<ConfirmDialogBoxProps> = ({
  onCancel,
  onOk,
  noAllowed,
}) => {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${
          noAllowed ? 'cursor-not-allowed' : ''
        }`}>
        <div
          className='bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20'
          onClick={onCancel}
        />
        <m.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className='shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center'>
          <BsFillPatchExclamationFill className='text-[10rem] text-red-500 m-auto' />

          <h2 className='mt-8 text-3xl'>Are You sure ?</h2>

          <div className='flex items-center mt-8 gap-5'>
            <button
              className={`py-2 px-5 text-md uppercase bg-red-600 text-white rounded-md ${
                noAllowed ? 'cursor-not-allowed' : ''
              }`}
              onClick={onCancel}>
              close
            </button>
            <button
              className={`py-2 px-5 text-md uppercase bg-teal-700 text-white rounded-md ${
                noAllowed ? 'cursor-not-allowed' : ''
              }`}
              onClick={onOk}>
              {noAllowed ? 'processing..' : 'ok'}
            </button>
          </div>
        </m.div>
      </m.div>
    </>
  )
}
