import { FC, HTMLInputTypeAttribute } from 'react'
import { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { LetterFormFields } from '../pages/CreateLetterpage'

interface LetterInputFieldProps {
  error: FieldErrors<LetterFormFields>
  id: keyof LetterFormFields
  type: HTMLInputTypeAttribute
  register: UseFormRegister<LetterFormFields>
  validations?: RegisterOptions<LetterFormFields, keyof LetterFormFields>
  title: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
}

export const LetterInputField: FC<LetterInputFieldProps> = ({
  error,
  id,
  type,
  register,
  validations,
  title,
  required,
  readonly,
  disabled = false
}) => {

  return (
    <>
      <label htmlFor={id} className='flex gap-4 items-center w-full'>
        <span className='capitalize block w-1/5'>
          {title}
          {required && <strong className='text-red-600'>*</strong>}
        </span>
        <div className='flex flex-col gap-1'>
          <input
            type={type}
            className={`w-full border border-gray-400 text-l px-3 py-2 rounded-md focus:bg-gray-100 outline-none transition-all ${error[id] ? 'bg-red-100 border-red-400 focus:bg-red-100' : ''
              } ${readonly ? 'bg-gray-100' : ''}`}
            {...register(id, validations)}
            readOnly={readonly}
            disabled={disabled}
          />
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
