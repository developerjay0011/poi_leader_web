import { FC } from 'react'
import { RegisterOptions, UseFormRegister, FieldErrors } from 'react-hook-form'
import { LetterSettingsFormFields } from './LetterSettingsForm'

interface LetterSettingsInputFieldProps {
  error: FieldErrors<LetterSettingsFormFields>
  id: keyof LetterSettingsFormFields
  register: UseFormRegister<LetterSettingsFormFields>
  validations?: RegisterOptions<
    LetterSettingsFormFields,
    keyof LetterSettingsFormFields
  >
  title: string
  required?: boolean
  readonly?: boolean
  unit: string
}

export const LetterSettingsInputField: FC<LetterSettingsInputFieldProps> = ({
  id,
  register,
  title,
  readonly,
  validations,
  unit,
}) => {
  return (
    <>
      <label htmlFor={id} className='flex gap-3 w-max items-center px-3'>
        <span className='capitalize block text-sm'>{title}</span>
        <div className='flex items-center gap-2'>
          <input
            id={id}
            type='text'
            {...register(id, validations)}
            readOnly={readonly}
            className='border py-2 px-3 focus:bg-gray-100 text-sm rounded-md outline-none focus:border-gray-400'
          />
          <span className='uppercase text-sm'>{unit}</span>
        </div>
      </label>
    </>
  )
}
