import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { AddEditEmployee, GetEmployees } from '@/redux_store/employee/employeeApi'
import { employeeAction } from '@/redux_store/employee/employeeApiSlice'
import { Modal } from '@/components/modal/modal'
import { SaveOfficeLocation } from '@/redux_store/location/locationApi'

interface OfficeLocationFormProps {
  onClose: () => void
  submitting: boolean
  heading: string
  edit?: boolean
  details: any
  GetofficeLocations: any
}

export interface FormFields {
  id: string,
  leaderid: string,
  location: string
  isactive: string
}

export const OfficeLocationForm: FC<OfficeLocationFormProps> = ({ onClose, submitting, heading, edit, details, GetofficeLocations }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm<FormFields>({})
  const formSubmitHandler = (data: FormFields) => {
    tryCatch(
      async () => {
        var body: any = {
          leaderid: userDetails?.leaderId,
          location: data?.location,
        };
        if (details?.id) {
          body.id = details?.id as string
        }
        const response = await SaveOfficeLocation(body);
        if (response?.success) {
          GetofficeLocations()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          onClose()
          reset();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  }

  useEffect(() => {
    if (edit) {
      reset({
        id: details?.id,
        location: details?.location,
      })
    }
  }, [reset])

  return (
    <Modal heading={heading} onClose={onClose}>
      <form
        className='flex flex-col py-5 gap-4 max-[550px]:px-4'
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}>
        <section className='grid px-7 gap-5 grid-cols-1 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
          <label htmlFor='location' className={`flex flex-col gap-2`}>
            <span className='capitalize font-[500]'>
              Location
              {<strong className='text-rose-500'>*</strong>}
            </span>
            <input
              id='location'
              type='text'
              className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
              {...register('location', { required: 'location is required' })}
            />
            <ErrorMessage
              name={'location'}
              errors={errors}
              as={'span'}
              className='text-red-500 text-sm first-letter:capitalize lowercase'
            />
          </label>
          {/* <label htmlFor='allowAccess' className={`flex flex-col gap-2`}>
            <span className='capitalize font-[500]'>
              Status
              <strong className='text-rose-500'>*</strong>
            </span>
            <select
              id='allowAccess'
              {...register('isactive', {
                required: 'acess is required',
              })}
              className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 capitalize'>
              {[{ value: 'true', label: "Active" }, { value: 'false', label: "Deactivate" }].map((item: any, index: number) =>
                <option key={index} value={item?.value}>{item?.label}</option>
              )}
            </select>
            <ErrorMessage
              name={'isactive'}
              errors={errors}
              as={'span'}
              className='text-red-500 text-sm first-letter:capitalize lowercase'
            />
          </label> */}
        </section>

        <div className='w-full bg-zinc-200 h-[1px] mt-3' />

        <div className='flex px-7 self-end gap-2 max-[580px]:self-stretch max-[580px]:flex-wrap'>
          <button
            onClick={onClose}
            className='py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize'
            type='button'>
            close
          </button>
          <button
            type='submit'
            disabled={submitting}
            className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
            {submitting ? 'saving..' : 'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
