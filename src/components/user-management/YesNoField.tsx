import { ErrorMessage } from '@hookform/error-message'
import { FC } from 'react'
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { LeaderFormFields } from './AddLeaderPage'


interface YesNoFieldProps {
  errors: FieldErrors<LeaderFormFields>
  register: UseFormRegister<LeaderFormFields>
  question: string
  id: keyof LeaderFormFields
  required?: boolean
  validations?: RegisterOptions<LeaderFormFields, keyof LeaderFormFields>
  fullWidth?: boolean
}

export const YesNoField: FC<YesNoFieldProps> = ({
  errors,
  id,
  question,
  register,
  validations,
  fullWidth,
  required,
}) => {
  return (
    <div className={`flex flex-col ${fullWidth && 'col-span-full'}`}>
      <div className={`flex ${fullWidth ? 'gap-5 mt-3' : 'flex-col gap-2'}`}>
        <span className='font-medium'>
          {question}? {required && <strong className='text-red-500'>*</strong>}
        </span>

        <div
          className={`flex ${
            fullWidth ? 'gap-5' : 'gap-10'
          } items-center flex-1`}>
          <label htmlFor={'yes' + id} className='flex gap-2 items-center'>
            <input
              type='radio'
              className='checkbox hidden'
              {...register(id, validations)}
              id={'yes' + id}
              value={'yes'}
            />
            <span className='select-none w-5 aspect-square rounded-full inline-block relative border-cyan-600 border-4 cursor-pointer after:bg-cyan-600 after:w-4/6 after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0' />{' '}
            <span className='font-medium'>Yes</span>
          </label>

          <label htmlFor={'no' + id} className='flex gap-2 items-center'>
            <input
              type='radio'
              className='checkbox hidden'
              {...register(id, validations)}
              id={'no' + id}
              value={'no'}
            />
            <span className='select-none w-5 aspect-square rounded-full inline-block relative border-cyan-600 border-4 cursor-pointer after:bg-cyan-600 after:w-4/6 after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0' />{' '}
            <span className='font-medium'>No</span>
          </label>
        </div>
      </div>
      <ErrorMessage
        as={'span'}
        errors={errors}
        name={id}
        className='text-sm text-red-500'
      />
    </div>
  )
}
