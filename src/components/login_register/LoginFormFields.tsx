import {
  RegisterOptions,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import { FC, HTMLInputTypeAttribute } from 'react'
import { LoginFormFields, RegisterFormFields } from '@/utils/typesUtils'

interface LoginFormFieldsProps {
  errors: FieldErrors
  register: UseFormRegister<RegisterFormFields | LoginFormFields>
  id: keyof RegisterFormFields | keyof LoginFormFields
  type: HTMLInputTypeAttribute
  validations?: RegisterOptions
  title: string
  Icon: JSX.ElementType
}

export const LoginFormF: FC<LoginFormFieldsProps> = ({
  register,
  id,
  title,
  type,
  validations,
  errors,
  Icon,
}) => {
  return (
    <label
      htmlFor={id}
      className={`w-full relative flex flex-col last_noti border-blue-200 ${errors[id] ? 'border-red-200' : 'border-sky-200'
        }`}>
      <input
        type={type}
        placeholder=' '
        className={`w-full pt-10 pb-5 pl-16  outline-none transition-all ${errors[id] ? 'errInp' : 'bg-transparent focusEvent'
          }`}
        id='username'
        {...register(id, validations)}
      />
      <Icon
        className={`text-lg absolute top-1/2 left-5 translate-y-[-50%] ${errors[id] ? 'text-red-500' : 'text-sky-800'
          }`}
      />
      <span
        className={`ml-16  absolute transition-all top-7 translate-y-[-50%] font-semibold text-[14px] capitalize ${errors[id] ? 'text-red-500' : 'text-sky-800'
          }`}>
        {title}
      </span>
    </label>
  )
}
