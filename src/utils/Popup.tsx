import { FC } from 'react'
import { motion as m } from 'framer-motion'
import { BiCheckCircle, BiX } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'

interface PopupProps {
  title: string
  status: 'success' | 'fail'
  onClose?: () => void
}
export const Popup: FC<PopupProps> = ({ title, status, onClose }) => {
  const statusClasses =
    status === 'success'
      ? ' bg-green-100 border-green-300 text-green-500 '
      : ' border-red-300 text-red-500 bg-red-100 '

  return (
    <>
      <m.div
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: 500 }}
        className={`fixed z-50 bottom-8 right-10 w-96 border font-medium rounded shadow-md py-4 px-6 capitalize ${
          onClose ? 'pr-10' : ''
        } flex gap-3 items-center ${statusClasses}`}>
        {status === 'success' && <BiCheckCircle className='text-3xl' />}
        {status === 'fail' && <BsExclamationCircle className='text-3xl' />}
        {title}
        {status === 'fail' && (
          <button className='absolute top-2 right-2' onClick={onClose}>
            <BiX className='text-2xl' />
          </button>
        )}
      </m.div>
    </>
  )
}
