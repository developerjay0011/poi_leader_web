import { FC, useEffect } from 'react'
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
import { LetterInputField } from '../manage-letters/LetterInputField'
import { LetterSelectField } from '../manage-letters/LetterSelectField'
import { LetterTextarea } from '../manage-letters/LetterTextarea'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { getTickets } from '@/redux_store/ticket/ticketApi'
import { ticketActions } from '@/redux_store/ticket/ticketSlice'
import { LetterFormFields } from '../pages/CreateLetterpage'
import { Savedby } from '@/constants/common'
import { watch } from 'fs'

interface LetterFormProps {
  register: UseFormRegister<LetterFormFields>
  errors: FieldErrors<LetterFormFields>
  watch: UseFormWatch<LetterFormFields>
  setValue: UseFormSetValue<LetterFormFields>
  getValues: UseFormGetValues<LetterFormFields>
  states: { id: string; state: string }[]
  appendField: UseFieldArrayAppend<LetterFormFields>
  removeField: UseFieldArrayRemove
  attachments: FieldArrayWithId<LetterFormFields>[]
  ticketdata:any
}

export const LetterForm: FC<LetterFormProps> = ({ errors, register, states,setValue,ticketdata,watch }) => {
  const { letter_templete } = cusSelector((state) => state.letter);
  const { ticket } = cusSelector((state) => state.ticket);
  const { location } = cusSelector((state) => state.location);
  const { userDetails }: any = cusSelector((state) => state.auth);
  const { filestype }: any = cusSelector((state) => state.file);

  
  useEffect(() => {
    setValue("location", userDetails?.employee_detail.location)
  }, [userDetails])
  return (
    <>
      <LetterSelectField
        error={errors}
        id='ticketId'
        title='Select Ticket'
        disabled={ticketdata}
        selectOptions={ticket?.map((el: any) => ({ id: el.ticketid, val: el.ticket_code, }))}
        register={register}
        required
        validations={{ required: 'ticketid is required' }}
      />
      <Line />
      <LetterSelectField
        error={errors}
        register={register}
        id='location'
        title='location'
        disabled={Savedby().saved_by_type != "leader"}
        selectOptions={location?.map((el: any) => ({ id: el.id, val: el.location, })) }
        required
        validations={{ required: 'Location is required' }}
      />
      <Line />

      <LetterSelectField
        error={errors}
        id='letterType'
        title='letter type'
        selectOptions={letter_templete?.map((el) => ({
          id: el.id,
          val: el.template_name,
        }))}
        register={register}
        required
        validations={{ required: 'letter type is required' }}
      />

      <Line />

      {/* <LetterSelectField
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
      /> */}

      {/* <Line /> */}

      {Savedby().saved_by_type &&
        <LetterInputField
          error={errors}
          id='date'
          title='Date'
          type='date'
          register={register}
          required
          validations={{ required: 'Date is required' }}
          disabled={Savedby().saved_by_type != "leader"}
        />
      }


      <Line />

      <LetterInputField
        error={errors}
        id='idNo'
        title='ID No'
        type='text'
        register={register}
        required
        validations={{ required: 'IdNo is required' }}
      // readonly
      />

      <Line />

      <LetterSelectField
        error={errors}
        register={register}
        id='fileNo'
        title='File Number'
        selectOptions={filestype?.map((el: any) => ({
          id: el?.id, val: el?.file_name + "-" + el?.file_number,
        }))}
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
        register={register}
        id='to'
        title='To'
        selectOptions={filestype?.find((el: any) => el.id == watch("fileNo"))?.to?.map((el: any) => ({
          id: el?.ministryid, val: el?.name + "-" + el?.designation,
        }))}
        required
        validations={{ required: 'File number is required' }}
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
