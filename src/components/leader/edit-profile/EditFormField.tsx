import { FC, HTMLInputTypeAttribute } from 'react'
import { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form'
import { UserDetails1 } from '@/utils/typesUtils'

interface EditFormInputFieldProps {
  id: keyof UserDetails1
  errors: FieldErrors<UserDetails1>
  fieldType: 'input' | 'select'
  type: HTMLInputTypeAttribute
  title: string
  placeholder?: string
  register: UseFormRegister<UserDetails1>
  required?: boolean
  validations?: RegisterOptions<UserDetails1, keyof UserDetails1>
}

export const EditFormInputField: FC<EditFormInputFieldProps> = ({ errors, required, fieldType, id, register, title, type, placeholder, validations, }) => {
  const INPUT = {
    input: (
      <input
        type={type}
        id={id}
        placeholder={placeholder || ''}
        className={`w-full border py-[.7rem] px-4 outline-none rounded-md text-base transition-all read-only:bg-slate-200 read-only:border-slate-300 read-only:capitalize read-only:text-slate-500 ${type === 'number' && 'num_inp'
          } ${errors[id]
            ? 'bg-red-100 text-red-500 border-red-500'
            : 'border-slate-300 bg-slate-100 focus:bg-slate-200 focus:border-slate-400'
          }`}
        {...register(id, validations)}
      />
    ),
    select: <></>,
  }

  return (
    <label htmlFor={id} className='flex flex-col gap-2'>
      <span className='capitalize font-[500]'>
        {title} {required && <strong className='text-red-500'>*</strong>}{' '}
      </span>
      {INPUT[fieldType]}
    </label>
  )
}
