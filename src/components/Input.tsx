import { UserDetails } from '@/utils/typesUtils'
import { ErrorMessage } from '@hookform/error-message'
import { FC, HTMLInputTypeAttribute, useState } from 'react'
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface InputProps {
  errors: FieldErrors<UserDetails> | any
  id: any
  register: any
  validations?: RegisterOptions<UserDetails, keyof UserDetails>
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
  readOnly?: boolean
  fullWidth?: boolean
  multiple?: boolean
  min?: {}
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
  rows,
  readOnly,
  fullWidth,
  disabled,
  multiple = false,
  min
}) => {
  const [isPassword, setIsPassword] = useState(type === 'password')
  const mins = min ? { min: min } : {}
  const InputFieldType =
    type === 'select' || type === 'textarea' || type === 'file' ? type : 'normal'

  const INPUT = {
    textarea: (
      <textarea
        disabled={disabled}
        readOnly={readOnly || false}
        id={id}
        {...register(id, {
          ...validations,
          required: {
            value: required ? true : false,
            message: 'Field is required',
          },
        })}
        rows={rows || 4}
        placeholder={placeholder}
        className={`w-full num_inp text-base py-3 px-3 rounded-md outline-none border resize-none ${errors[id]
          ? 'bg-red-100 text-red-500 border-red-400'
          : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
          }`}
      />
    ),
    normal: (
      <div className='relative'>
        <input
          disabled={disabled}
          readOnly={readOnly || false}
          {...mins}
          id={id}
          type={type === 'password' ? (isPassword ? 'password' : 'text') : type} // conditionaly setting type of input field and then also consitionally setting type in case of password.
          {...register(id, {
            ...validations,
            required: {
              value: required ? true : false,
              message: 'Field is required',
            },
          })}
          placeholder={placeholder}
          className={`w-full num_inp py-2 text-base px-3 rounded-md outline-none border ${errors[id]
            ? 'bg-red-100 text-red-500 border-red-400'
            : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
            }`}
        />

        {type === 'password' && (
          <span
            onClick={() => setIsPassword((lst) => !lst)}
            className={`cursor-pointer absolute top-1/2 translate-y-[-50%] right-3 ${errors[id] ? 'text-red-500' : ''
              }`}>
            {isPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        )}
      </div>
    ),
    file: (
      <div className='relative'>
        <input
          disabled={disabled}
          readOnly={readOnly || false}
          id={id}
          type={type === 'password' ? (isPassword ? 'password' : 'text') : type} // conditionaly setting type of input field and then also consitionally setting type in case of password.
          {...register(id, {
            ...validations,
            required: {
              value: required ? true : false,
              message: 'Field is required',
            },
          })}
          placeholder={placeholder}
          className={`w-full num_inp py-2 text-base px-3 rounded-md outline-none border ${errors[id]
            ? 'bg-red-100 text-red-500 border-red-400'
            : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
            }`}
          multiple={multiple}
        />

        {type === 'password' && (
          <span
            onClick={() => setIsPassword((lst) => !lst)}
            className={`cursor-pointer absolute top-1/2 translate-y-[-50%] right-3 ${errors[id] ? 'text-red-500' : ''
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
          id={id}
          key={id}
          multiple={multiple}
          {...register(id, {
            ...validations,
            required: {
              value: required ? true : false,
              message: 'Field is required',
            },
          })}
          className={`w-full capitalize num_inp text-base py-2 px-2 rounded-md outline-none border ${errors[id]
            ? 'bg-red-100 text-red-500 border-red-400'
            : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
            }`}>
          <option value=''>
            {selectField.options.length > 0
              ? selectField.title
              : `No ${selectField.title.split(' ').at(-1)} Found !!`}
          </option>
          {selectField.options.map((el) => (
            <option value={el.id} key={el.id}>
              {el.value}
            </option>
          ))}
        </select>
      ) : (
        <></>
      ),
  }

  return (
    <label
      htmlFor={id}
      className={`flex flex-col gap-1 w-full ${fullWidth && 'col-span-full'}`}>
      <span className='font-semibold'>
        {title} {required && <strong className='text-red-500'>*</strong>}
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
