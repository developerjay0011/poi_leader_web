import { FC, HTMLInputTypeAttribute, useState } from 'react'
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { LeaderFormFields } from './AddLeaderPage'

interface InputProps {
  errors: FieldErrors<LeaderFormFields>
  id: keyof LeaderFormFields
  register: UseFormRegister<LeaderFormFields>
  validations?: RegisterOptions<LeaderFormFields, keyof LeaderFormFields>
  title: string | JSX.Element
  required?: boolean
  disabled?: boolean
  placeholder?: string
  type: HTMLInputTypeAttribute | 'select' | 'textarea'
  selectField?: {
    options: { id: string; value: string }[]
    title: string
  }
  rows?: number
  fullWidth?: boolean
}

export const Input: FC<InputProps> = ({
  errors,
  id,
  register,
  validations,
  required,
  placeholder,
  title,
  type,
  selectField,
  disabled,
  rows,
  fullWidth,
}) => {
  const [isPassword, setIsPassword] = useState(type === 'password')

  const InputFieldType =
    type === 'select' || type === 'textarea' ? type : 'normal'

  const INPUT = {
    normal: (
      <div className='relative'>
        <input
          readOnly={disabled}
          aria-disabled={disabled}
          id={id}
          type={type === 'password' ? (isPassword ? 'password' : 'text') : type} // conditionaly setting type of input field and then also consitionally setting type in case of password.
          {...register(id, validations)}
          placeholder={placeholder}
          className={`w-full num_inp text-base py-2 px-3 rounded-md outline-none border ${
            errors[id]
              ? 'bg-red-100 text-red-500 border-red-400'
              : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
          }`}
        />

        {type === 'password' && (
          <span
            onClick={() => setIsPassword((lst) => !lst)}
            className={`cursor-pointer absolute top-1/2 translate-y-[-50%] right-3 ${
              errors[id] ? 'text-red-500' : ''
            }`}>
            {isPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        )}
      </div>
    ),
    select:
      type === 'select' && selectField ? (
        <select
          disabled={disabled}
          aria-disabled={disabled}
          id={id}
          {...register(id, validations)}
          className={`w-full capitalize text-base py-2 px-3 rounded-md outline-none border ${
            errors[id]
              ? 'bg-red-100 text-red-500 border-red-400'
              : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
          }`}>
          <option value=''>
            {selectField?.options?.length > 0
              ? selectField.title
              : `No ${selectField.title.split(' ').at(-1)} Found !!`}
          </option>
          {selectField?.options?.map((el) => (
            <option value={el.id} key={el.id}>
              {el.value}
            </option>
          ))}
        </select>
      ) : (
        <></>
      ),
    textarea: (
      <textarea
        readOnly={disabled}
        aria-disabled={disabled}
        {...register(id, validations)}
        id={id}
        placeholder={placeholder || ''}
        className={`resize-none w-full text-base py-2 px-3 rounded-md outline-none border ${
          errors[id]
            ? 'bg-red-100 text-red-500 border-red-400'
            : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
        }`}
        rows={rows || 3}></textarea>
    ),
  }

  return (
    <label
      htmlFor={id}
      className={`flex flex-col gap-2 ${fullWidth && 'col-span-full'}`}>
      <span className='font-medium'>
        {title} {required && <strong className='text-red-500'>*</strong>}{' '}
      </span>

      {INPUT[InputFieldType as keyof typeof INPUT]}

      <ErrorMessage
        as={'span'}
        errors={errors}
        name={id}
        className='text-sm text-red-500'
      />
    </label>
  )
}
