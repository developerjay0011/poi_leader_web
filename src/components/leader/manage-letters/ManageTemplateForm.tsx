import { FC, useRef, useState } from 'react'
import { motion as m } from 'framer-motion'
import { useForm } from 'react-hook-form'
// import { ErrObj } from '../../../state/authSlice'
import { BiX } from 'react-icons/bi'
import JoditEditor from 'jodit-react'

interface ManageTemplateFormProps {
  tempHeader: string
  status: string
  submitting: boolean
  onClose: () => void
  submitHandler: () => void
  heading: string
  // err: ErrObj
}

interface TemplateFormFields {
  tempHeader: string
  status: string
}

export const ManageTemplateForm: FC<ManageTemplateFormProps> = ({
  submitting,
  tempHeader,
  status,
  onClose,
  // err,
  heading,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TemplateFormFields>({
    defaultValues: {
      status,
      tempHeader,
    },
  })
  const formSubmitHandler = (data: TemplateFormFields) => {
  }

  const editor = useRef(null)
  const [content, setContent] = useState('')

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 z-10 w-full backdrop-blur-[2px] h-full'>
        <div className='bg-gray-700 opacity-25 h-screen w-full absolute top-0 left-0 z-20' />
        <m.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className='w-1/2 max-lg:w-4/5 max-2xl:w-3/5 mt-6 m-auto shadow-md border rounded-md border-gray-200 py-6 px-7 z-30 bg-white relative'>
          <button
            type='button'
            className='absolute top-2 right-2 hover:scale-110 enable_transition active:scale-100'
            onClick={onClose}>
            <BiX className='text-3xl fill-gray-500' />
          </button>
          <h2 className='text-2xl font-semibold capitalize flex justify-between'>
            {heading}
            {/* {err.isErr && (
              <span className='text-red-600 text-[15px] font-normal lowercase'>
                *{err.errTxt}
              </span>
            )} */}
          </h2>

          <form
            className='flex flex-col gap-2 mt-14'
            onSubmit={handleSubmit(formSubmitHandler)}
            noValidate>
            <div className='grid grid-cols-2 gap-5'>
              <div className='col-span-2'>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={{ readonly: false }}
                  onBlur={(val) => setContent(val)}
                />
              </div>

              <label htmlFor='status' className='flex flex-col gap-1'>
                <span>
                  Template Name<strong className='text-red-600'>*</strong>
                </span>
                <input
                  id='status'
                  className={`w-full border border-gray-400 text-l px-3 py-2 rounded-md focus:bg-gray-100 outline-none transition-all ${errors.tempHeader
                    ? 'bg-red-100 border-red-400 focus:bg-red-100'
                    : ''
                    }`}
                  {...register('tempHeader', {
                    // VALIDATIONS
                    required: {
                      value: true,
                      message: 'status is required',
                    },
                  })}
                />
                {errors.tempHeader && (
                  <span className='text-red-500 text-sm'>
                    {errors.tempHeader.message}
                  </span>
                )}
              </label>

              <label htmlFor='status' className='flex flex-col gap-1'>
                <span>
                  Status<strong className='text-red-600'>*</strong>
                </span>
                <select
                  id='status'
                  className={`w-full border border-gray-400 text-l px-3 py-2 rounded-md focus:bg-gray-100 outline-none transition-all ${errors.status
                    ? 'bg-red-100 border-red-400 focus:bg-red-100'
                    : ''
                    }`}
                  {...register('status', {
                    // VALIDATIONS
                    required: {
                      value: true,
                      message: 'status is required',
                    },
                  })}>
                  <option value=''>none</option>
                  <option value='1'>Active</option>
                  <option value='0'>Deactive</option>
                </select>
                {errors.status && (
                  <span className='text-red-500 text-sm'>
                    {errors.status.message}
                  </span>
                )}
              </label>
            </div>

            <div className='w-full h-px bg-slate-200  my-5' />

            {/* CTA Btns */}

            <div className='self-end flex items-center gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='py-2 px-4 bg-cyan-500 rounded-md uppercase text-sm text-white hover:bg-cyan-600 transition-all'>
                Close
              </button>
              <button
                type='submit'
                disabled={submitting}
                className='py-2 px-4 bg-sky-500 rounded-md uppercase text-sm text-white hover:bg-sky-600 transition-all'>
                {submitting ? 'submitting...' : heading}
              </button>
            </div>
          </form>
        </m.div>
      </m.div>
    </>
  )
}
