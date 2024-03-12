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
}

export const LetterForm: FC<LetterFormProps> = ({ errors, register, states, }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const { letter_templete } = cusSelector((state) => state.letter);
  const { ticket } = cusSelector((state) => state.ticket);
  const dispatch = cusDispatch()
  useEffect(() => {
    (async () => {
      const data = await getTickets(userDetails?.leaderId as string);
      dispatch(ticketActions.storeTicket(data));
    })();
  }, [userDetails, dispatch]);
  return (
    <>
      <LetterSelectField
        error={errors}
        id='ticketId'
        title='Select Ticket'
        selectOptions={ticket?.map((el) => ({
          id: el.ticketid,
          val: el.ticketid,
        }))}
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
        selectOptions={states.map((el) => ({
          id: el.id,
          val: el.state,
        }))}
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

      <LetterInputField
        error={errors}
        id='date'
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
      // readonly
      />

      <Line />

      <LetterInputField
        error={errors}
        id='fileNo'
        title='File Number'
        type='text'
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

      <LetterTextarea
        error={errors}
        id='to'
        title='To'
        rows={2}
        register={register}
        required
        validations={{ required: 'To is required' }}
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
