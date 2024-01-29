'use client'
import { RegisterOptions, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FC, HTMLInputTypeAttribute, useState } from 'react'
import { LoginFormFields, RegisterFormFields } from '@/utils/typesUtils'
import { ErrorMessage } from '@hookform/error-message'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface LoginFormFieldsProps {
  errors: FieldErrors
  register: UseFormRegister<RegisterFormFields | LoginFormFields>
  id: keyof RegisterFormFields | keyof LoginFormFields
  type: HTMLInputTypeAttribute
  validations?: RegisterOptions
  title: string
  Icon: JSX.ElementType
  iconSize: string
}

export const LPInputField: FC<LoginFormFieldsProps> = ({
  register,
  id,
  title,
  type,
  validations,
  errors,
  Icon,
  iconSize,
}) => {
  const [inpType, setInpType] = useState(type)

  return (
    <label
      htmlFor={id}
      className={`w-full relative flex flex-col last_noti border-blue-200 ${
        errors[id] ? 'border-red-200' : 'border-sky-200'
      }`}>
      <ErrorMessage
        name={id}
        errors={errors}
        as={'span'}
        className='text-red-500 absolute bottom-1 right-2 font-[400] text-[12px]'
      />
      <input
        type={type === 'password' ? inpType : type}
        placeholder=' '
        className={`w-full pt-10 pb-5 pl-16  outline-none transition-all num_inp ${
          errors[id] ? 'errInp' : 'bg-transparent focusEvent'
        }`}
        id={id}
        {...register(id, validations)}
      />
      <Icon
        className={`${iconSize} absolute top-1/2 left-5 translate-y-[-50%] ${
          errors[id] ? 'text-red-500' : 'text-sky-800'
        }`}
      />
      {type === 'password' && (
        <button
          type='button'
          className='absolute top-1/2 translate-y-[-50%] right-5'>
          {inpType === 'text' && (
            <HiEye className='text-xl' onClick={() => setInpType('password')} />
          )}
          {inpType === 'password' && (
            <HiEyeOff className='text-xl' onClick={() => setInpType('text')} />
          )}
        </button>
      )}
      <span
        className={`ml-16  absolute transition-all top-7 translate-y-[-50%] font-semibold text-[14px] capitalize ${
          errors[id] ? 'text-red-500' : 'text-sky-800'
        }`}>
        {title}
      </span>
    </label>
  )
}
