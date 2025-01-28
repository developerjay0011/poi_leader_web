import { UserDetails } from '@/utils/typesUtils'
import { ErrorMessage } from '@hookform/error-message'
import { FC, HTMLInputTypeAttribute, useState } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'
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
  min?: any
  max?: any
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
  min,
  max
}) => {
  const [isPassword, setIsPassword] = useState(type === 'password')
  const mins = min ? { min: min } : {}
  const maxs = max ? { max: max } : {}
  const InputFieldType = type === 'select' || type === 'textarea' || type === 'file' ? type : 'normal'
  let listdata = Shortarray(selectField?.options) as any[]

  const commonStyles = `w-full text-base h-[40px] px-3 rounded-md outline-none border 
                        ${errors[id] ? 'bg-red-100 text-red-500 border-red-400'
      : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'}`;


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
          {...maxs}
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
          className={commonStyles}
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
          className={commonStyles + "flex justify-center item-center py-1"}
          multiple={multiple}
        />
        {type === 'password' && (
          <span onClick={() => setIsPassword((lst) => !lst)} className={`cursor-pointer absolute top-1/2 translate-y-[-50%] right-3 ${errors[id] ? 'text-red-500' : ''}`}>
            {isPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        )}
      </div>
    ),
    select: type === 'select' && selectField ? (
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
        className={`${commonStyles}`}>
        <option value=''>
          {listdata?.length > 0 ? selectField.title : `No ${selectField.title.split(' ').at(-1)} Found !!`}
        </option>
        {listdata?.map((el) => (
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
      <span className='font-semibold capitalize'>
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

export const Shortarray = (selectOptions: any, key = "value") => {
  const clonedOptions = Array.isArray(selectOptions) ? [...selectOptions] : [] as any[]
  const listdata = Array.isArray(clonedOptions) && clonedOptions?.length > 0 ? clonedOptions?.sort((a, b) => a?.[key].localeCompare(b?.[key])) : [];
  return Array.isArray(listdata) ? listdata : []
}
