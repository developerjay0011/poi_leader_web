import { FC, useEffect } from 'react'
import { motion as m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { BiX } from 'react-icons/bi'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { AddEditEmployee, GetEmployees } from '@/redux_store/employee/employeeApi'
import { employeeAction } from '@/redux_store/employee/employeeApiSlice'

interface ManageEmployessFormProps {
  onClose: () => void
  submitting: boolean
  heading: string
  edit?: boolean
  employeedetails: any
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

export const ManageEmployessForm: FC<ManageEmployessFormProps> = ({ onClose, submitting, heading, edit, employeedetails, }) => {
  const { leaderProfile } = cusSelector((state) => state.leader);
  const dispatch = cusDispatch();
  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm<FormFields>({})
  const formSubmitHandler = (data: FormFields) => {
    tryCatch(
      async () => {
        const body = {
          id: employeedetails?.id ? employeedetails?.id : null,
          leaderid: leaderProfile?.id,
          fullname: data?.fullname,
          username: data?.username,
          email: data?.email,
          phoneno: data?.phoneno,
          password: data?.password,
          location: data?.location,
          isactive: data?.isactive == 'true' ? true : false,
        };
        const response = await AddEditEmployee(body);
        if (response?.success) {
          const Data = await GetEmployees(leaderProfile?.id as string);
          dispatch(employeeAction.storeemployees(Data))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
        onClose()
        reset();
      })
  }

  useEffect(() => {
    if (edit) {
      reset({
        id: employeedetails?.id,
        fullname: employeedetails?.fullname,
        username: employeedetails?.username,
        email: employeedetails?.email,
        phoneno: employeedetails?.phoneno,
        password: employeedetails?.password,
        location: employeedetails?.location,
        isactive: String(employeedetails?.isactive),
      })
    }
  }, [reset])

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-10 '>
        <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center`}>
          <m.section
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-5 border-b font-semibold text-3xl capitalize'>
              {heading}
            </h3>
            <form
              className='flex flex-col py-5 gap-4 max-[550px]:px-4'
              noValidate
              onSubmit={handleSubmit(formSubmitHandler)}>
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
                    {[{ value: 'true', label: "Active" }, { value: 'false', label: "Deactivate" }].map((item: any) =>
                      <option value={item?.value}>{item?.label}</option>
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
                  disabled={submitting}
                  className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
                  {submitting ? 'saving..' : 'Submit'}
                </button>
              </div>
            </form>
          </m.section>
        </div>
      </m.div>
    </>
  )
}
