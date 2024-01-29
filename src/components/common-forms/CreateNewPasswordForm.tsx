'use client'
import { FC, FormEvent, useState } from 'react'
import { motion as m } from 'framer-motion'
import { ErrObj } from '@/utils/typesUtils'

interface CreateNewPasswordFormProps {
  proceedFn: (password: string) => void
}

export const CreateNewPasswordForm: FC<CreateNewPasswordFormProps> = ({
  proceedFn,
}) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [err, setErr] = useState<ErrObj>({ errTxt: '', isErr: false })

  const newPasswordSubmitHandler = (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword)
      return setErr({ errTxt: 'please enter same password', isErr: true })

    proceedFn(password)
  }

  return (
    <>
      <m.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col gap-5 w-full'
        onSubmit={newPasswordSubmitHandler}>
        {err.isErr && (
          <h2 className='text-center text-sm font-[500]'>{err.errTxt}</h2>
        )}
        <label htmlFor='userId' className='flex flex-col gap-2'>
          <span className='max-[500px]:text-[14px]'>Enter New password</span>

          <input
            type='password'
            value={password}
            onChange={(e) => {
              setErr({ errTxt: '', isErr: false })
              setPassword(e.target.value)
            }}
            className='bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600'
          />
        </label>

        <label htmlFor='userId' className='flex flex-col gap-2'>
          <span className='max-[500px]:text-[14px]'>Confirm New password</span>

          <input
            type='text'
            value={confirmPassword}
            onChange={(e) => {
              setErr({ errTxt: '', isErr: false })
              setConfirmPassword(e.target.value)
            }}
            className='bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600'
          />
        </label>

        <div className='flex items-center self-center gap-2 mt-4'>
          <button
            type='submit'
            className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full capitalize'>
            submit
          </button>
        </div>
      </m.form>
    </>
  )
}
