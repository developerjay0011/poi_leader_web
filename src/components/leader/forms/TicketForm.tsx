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

interface ManageEmployessFormProps {
  onClose: () => void
  submitting: any
  heading: string
  edit?: boolean
}

export interface FormFields {
  fullname: string
  username: string
  email: string
  id: string,
  leaderid: string,
  phoneno: string
  location: string
  password: string
  isactive: string
}

export const TicketForm: FC<ManageEmployessFormProps> = ({ onClose, submitting, heading, edit, }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm<FormFields>({})
  const formSubmitHandler = (data: FormFields) => {
    tryCatch(
      async () => {
        const body = {

        };
        const response = await AddEditEmployee(body);
        if (response?.success) {
          const Data = await GetEmployees(userDetails?.leaderId as string);
          dispatch(employeeAction.storeemployees(Data))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          onClose()
          reset();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }

      })
  }


  return (
    <Modal heading={heading} onClose={onClose}>
      <form className='flex flex-col py-5 gap-4 max-[550px]:px-4' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
        <section className='grid px-7 gap-5 grid-cols-2 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
          <label htmlFor='fullname' className={`flex flex-col gap-2`}>
            <span className='capitalize font-[500]'>
              Full Name
              {<strong className='text-rose-500'>*</strong>}
            </span>
            <input
              id='fullname'
              type='text'
              className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
              {...register('fullname', { required: 'fullname is required' })}
            />
            <ErrorMessage
              name={'fullname'}
              errors={errors}
              as={'span'}
              className='text-red-500 text-sm first-letter:capitalize lowercase'
            />
          </label>

          <label htmlFor='username' className={`flex flex-col gap-2`}>
            <span className='capitalize font-[500]'>
              User Name
              {<strong className='text-rose-500'>*</strong>}
            </span>
            <input
              id='username'
              type='text'
              className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
              {...register('username', { required: 'username is required' })}
            />
            <ErrorMessage
              name={'username'}
              errors={errors}
              as={'span'}
              className='text-red-500 text-sm first-letter:capitalize lowercase'
            />
          </label>

          <label htmlFor='email' className={`flex flex-col gap-2`}>
            <span className='capitalize font-[500]'>
              E-mail
              {<strong className='text-rose-500'>*</strong>}
            </span>
            <input
              id='email'
              type='text'
              className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message:
                    "Please enter a valid email EX: something@example.com",
                },
              })}
            />
            <ErrorMessage
              name={'email'}
              errors={errors}
              as={'span'}
              className='text-red-500 text-sm first-letter:capitalize lowercase'
            />
          </label>

          <label htmlFor='phoneno' className={`flex flex-col gap-2`}>
            <span className='capitalize font-[500]'>
              Phone no.
              {<strong className='text-rose-500'>*</strong>}
            </span>
            <input
              id='phoneno'
              type='tel'
              pattern='[0-9]{10}'
              className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
              {...register('phoneno', {
                required: 'phone number is required',
                validate: {
                  notAValidNo(val) {
                    return (
                      val.toString().length === 10 ||
                      "please enter a valid phone no"
                    );
                  },
                },
              })}
            />
            <ErrorMessage
              name={'phoneno'}
              errors={errors}
              as={'span'}
              className='text-red-500 text-sm first-letter:capitalize lowercase'
            />
          </label>


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

          <label htmlFor='email' className={`flex flex-col gap-2`}>
            <span className='capitalize font-[500]'>
              Password
              {<strong className='text-rose-500'>*</strong>}
            </span>
            <input
              id='password'
              type='text'
              className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
              {...register('password', {
                required: 'password is required',
                validate: {
                  checkLength(val) {
                    return (
                      val.length >= 8 || "Password must atleast 8 char long"
                    );
                  },
                  checkNum(val) {
                    if (val.split("").some((el: string) => !isNaN(+el)))
                      return true;

                    return "Password should contain atleast one number";
                  },
                  checkSpecialCharacter(val) {
                    const specialChar = `~!@#$%^&*()-_+={}[]|:;"'<>,.`.split(
                      ""
                    );

                    if (
                      val
                        .split("")
                        .some((el: string) => specialChar.includes(el))
                    )
                      return true;

                    return `Password should contain atleast one special character`;
                  },
                },
              })}
            />
            <ErrorMessage
              name={'password'}
              errors={errors}
              as={'span'}
              className='text-red-500 text-sm first-letter:capitalize lowercase'
            />
          </label>

          <label htmlFor='allowAccess' className={`flex flex-col gap-2`}>
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
          </label>

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
            disabled={true}
            className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
            {'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
