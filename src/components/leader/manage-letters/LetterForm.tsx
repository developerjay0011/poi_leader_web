import { FC } from 'react'
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
  FieldArrayWithId,
} from 'react-hook-form'
import { LetterFormFields } from '@/app/user/letter/add-letter/AddLetterPage'
import { LetterInputField } from './LetterInputField'
import { LetterSelectField } from './LetterSelectField'
import { LetterTextarea } from './LetterTextarea'

interface LetterFormProps {
  register: UseFormRegister<LetterFormFields>
  errors: FieldErrors<LetterFormFields>
  watch: UseFormWatch<LetterFormFields>
  setValue: UseFormSetValue<LetterFormFields>
  getValues: UseFormGetValues<LetterFormFields>
  states: { stateId: string; stateName: string }[]
  appendField: UseFieldArrayAppend<LetterFormFields>
  removeField: UseFieldArrayRemove
  attachments: FieldArrayWithId<LetterFormFields>[]
}

export const LetterForm: FC<LetterFormProps> = ({
  errors,
  register,
  states,
}) => {
  return (
    <>
      <LetterSelectField
        error={errors}
        register={register}
        id='location'
        title='location'
        selectOptions={states.map((el) => ({
          id: el.stateId,
          val: el.stateName,
        }))}
        required
        validations={{ required: 'Location is required' }}
      />
      <Line />

      <LetterSelectField
        error={errors}
        id='letterType'
        title='letter type'
        selectOptions={[
          { id: 'doLetter', val: 'do letter' },
          { id: 'letter', val: 'letter' },
        ]}
        register={register}
        required
        validations={{ required: 'letter type is required' }}
      />

      <Line />

      <LetterSelectField
        error={errors}
        id='language'
        title='Select Language'
        selectOptions={[
          { id: 'hindi', val: 'hindi' },
          { id: 'english', val: 'english' },
        ]}
        register={register}
        required
        validations={{ required: 'Language is required' }}
      />

      <Line />

      <LetterInputField
        error={errors}
        id='language'
        title='Date'
        type='date'
        register={register}
        required
        validations={{ required: 'Date is required' }}
      />

      <Line />

      <LetterInputField
        error={errors}
        id='idNo'
        title='ID No'
        type='text'
        register={register}
        required
        validations={{ required: 'IdNo is required' }}
        readonly
      />

      <Line />

      <LetterSelectField
        error={errors}
        id='fileNo'
        title='File Number'
        selectOptions={[{ id: '0', val: 'A-1' }]}
        register={register}
        required
        validations={{ required: 'File number is required' }}
      />

      <Line />

      <LetterTextarea
        rows={2}
        error={errors}
        id='from'
        register={register}
        title='From'
        required
        placeholder=''
        validations={{ required: 'From is required' }}
      />

      <Line />

      <LetterSelectField
        error={errors}
        id='to'
        title='To'
        selectOptions={[{ id: '0', val: 'A-1' }]}
        register={register}
        required
        validations={{ required: 'To is required' }}
      />

      <Line />

      <LetterTextarea
        error={errors}
        rows={2}
        id='subject'
        register={register}
        title='From'
        required
        placeholder=''
        validations={{ required: 'Subject is required' }}
      />

      <Line />

      <LetterTextarea
        rows={2}
        error={errors}
        id='reference'
        register={register}
        title='Refrence'
      />

      <Line />

      <LetterInputField
        error={errors}
        id='contactNo'
        title='Contact No'
        type='text'
        register={register}
        required
        validations={{
          required: 'Contact No is required',
          valueAsNumber: true,
        }}
      />

      <Line />

      <LetterSelectField
        error={errors}
        id='envelopeType'
        title='Envelope Type'
        selectOptions={[
          { id: 'ph', val: 'PH' },
          { id: 'ncsc', val: 'NCSC' },
          { id: 'byHand', val: 'by Hand' },
          { id: 'byPost', val: 'by Post' },
        ]}
        register={register}
        required
        validations={{ required: 'Envelope type is required' }}
      />

      <Line />
    </>
  )
}

export const Line = () => <div className='w-full h-[2px] bg-gray-200' />
