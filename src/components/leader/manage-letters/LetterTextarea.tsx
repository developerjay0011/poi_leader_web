import { FC } from 'react'
import { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { LetterFormFields } from '../pages/CreateLetterpage'

interface LetterInputFieldProps {
  error: FieldErrors<LetterFormFields>
  id: keyof LetterFormFields
  register: UseFormRegister<LetterFormFields>
  validations?: RegisterOptions<LetterFormFields, keyof LetterFormFields>
  title: string
  required?: boolean
  placeholder?: string
  rows?: number
  columns?: number
}

export const LetterTextarea: FC<LetterInputFieldProps> = ({
  error,
  id,
  register,
  validations,
  title,
  required,
  placeholder,
  columns,
  rows,
}) => {
  return (
    <>
      <label htmlFor={id} className='flex gap-4 items-center w-full'>
        <span className='capitalize block w-1/5'>
          {title}
          {required && <strong className='text-red-600'>*</strong>}
        </span>
        <div className='flex flex-col gap-1 w-1/2'>
          <textarea
            className={`w-full border border-gray-400 text-l px-3 py-2 rounded-md focus:bg-gray-100 resize-none outline-none transition-all ${error[id] ? 'bg-red-100 border-red-400 focus:bg-red-100' : ''
              }`}
            {...register(id, validations)}
            placeholder={placeholder}
            rows={rows}
            cols={columns}></textarea>
          <ErrorMessage
            name={id}
            errors={error}
            as={'span'}
            className='text-red-500 text-sm first-letter:capitalize'
          />
        </div>
      </label>
    </>
  )
}
