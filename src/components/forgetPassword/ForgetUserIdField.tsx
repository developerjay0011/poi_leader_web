'use client'
import { motion as m } from 'framer-motion'
import { FC, FormEvent, useState } from 'react'

interface ForgetUserIdFieldProps {
  proceedFn: (userId: string) => void
  submitting: boolean
}

export const ForgetUserIdField: FC<ForgetUserIdFieldProps> = ({
  proceedFn,
  submitting,
}) => {
  const [userINP, setUserINP] = useState('')

  const userIdSubmitHandler = (e: FormEvent) => {
    e.preventDefault()

    if (userINP.length !== 0) proceedFn(userINP)
  }

  return (
    <>
      <m.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col gap-8 w-full'
        onSubmit={userIdSubmitHandler}>
        <label htmlFor='userId' className='flex flex-col gap-4'>
          <span className='max-[500px]:text-[14px]'>
            Enter your Phone Number
          </span>

          <input
            value={userINP}
            type='text'
            id='userId'
            onChange={(e) => setUserINP(e.target.value)}
            className='bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600'
          />
        </label>

        <div className='flex items-center self-center gap-2'>
          <button
            type='submit'
            disabled={submitting}
            className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400'>
            {submitting ? 'Checking...' : 'Proceed'}
          </button>
        </div>
      </m.form>
    </>
  )
}
