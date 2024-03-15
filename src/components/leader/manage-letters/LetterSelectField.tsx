import { FC, useEffect, useState } from 'react'
import { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { LetterFormFields } from '../pages/CreateLetterpage'

interface LetterSelectFieldProps {
  error: FieldErrors<LetterFormFields>
  id: keyof LetterFormFields
  register: UseFormRegister<LetterFormFields>
  validations?: RegisterOptions<LetterFormFields, keyof LetterFormFields>
  title: string
  required?: boolean
  disabled?:boolean
  selectOptions: { id: string; val: string }[]
}
export const LetterSelectField: FC<LetterSelectFieldProps> = ({ error, id, register, title, selectOptions, required, validations, disabled }) => {
  return (
    <>
      <label htmlFor={id} className='w-full flex gap-3 items-center'>
        <span className='capitalize w-1/5'>
          {title}
          {required && <strong className='text-red-600'>*</strong>}
        </span>
        <div className='flex flex-col gap-2 flex'>
          <select
            disabled={disabled}
            id={id}
            className={`border border-gray-400 px-3 py-2 rounded-md focus:bg-gray-100  capitalize outline-none transition-all 
            ${error[id] ? 'bg-red-100 border-red-400 focus:bg-red-100' : ''
              }`}
            {...register(id, validations)}
          >
            <option value=''>{title}</option>
            {selectOptions?.map((el) => (
              <option key={el.id} value={el.id}>
                {el.val}
              </option>
            ))}
          </select>

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
