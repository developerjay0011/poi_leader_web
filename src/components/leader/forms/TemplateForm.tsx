import { FC, useEffect, useRef, useState } from 'react'
import { motion as m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { BiX } from 'react-icons/bi'
import JoditEditor from 'jodit-react'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { getLetterTemplates, saveLetterTemplate } from '@/redux_store/letter/letterApi'
import { letterActions } from '@/redux_store/letter/letterSlice'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import dynamic from 'next/dynamic';
interface ManageTemplateFormProps {
  tempHeader: string
  status: string
  submitting: boolean
  onClose: () => void
  submitHandler: () => void
  heading: string
  err: string
  isEdit: any
}

interface TemplateFormFields {
  tempHeader: string
  status: string
}
const Editor = dynamic(() => import('./Editor'), {
  ssr: false
})
export const ManageTemplateForm: FC<ManageTemplateFormProps> = ({
  submitting,
  tempHeader,
  status,
  onClose,
  err,
  heading,
  isEdit
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<TemplateFormFields>({
    defaultValues: {
      status,
      tempHeader,
    },
  })
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();

  const formSubmitHandler = async (data: TemplateFormFields) => {
    const body = {
      id: isEdit ? isEdit.id : null,
      leaderid: leaderProfile?.id || "",
      template_name: data.tempHeader,
      template_html: content,
      isactive: data.status == "1" ? true : false,
      saved_by_type: userDetails?.usertype.replace('emerging ', ""),
      saved_by: leaderProfile?.id

    };

    const response = await saveLetterTemplate(body);
    if (response?.success) {
      const Data = await getLetterTemplates(leaderProfile?.id as string);
      dispatch(letterActions.storeLetterTemplate(Data))
      dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
    } else {
      dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
    }
    onClose()
    reset();
  }

  const [content, setContent] = useState('')
  useEffect(() => {
    if (isEdit) {
      setValue("tempHeader", isEdit.template_name)
      setValue("status", isEdit.isactive ? "1" : "0")
      setContent(isEdit.template_html)
    }
  }, [])
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 z-10 w-full backdrop-blur-[2px] h-full overflow-y-scroll main_scrollbar'>
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

          </h2>

          <form
            className='flex flex-col gap-2 mt-14'
            onSubmit={handleSubmit(formSubmitHandler)}
            noValidate>
            <div className='grid grid-cols-2 gap-5'>
              <div className='col-span-2'>
                <Editor
                  value={content}
                  onChange={(val: any) => setContent(val)}
                />
              </div>

              <label htmlFor='status' className='flex flex-col gap-1'>
                <span>
                  Template Name<strong className='text-red-600'>*</strong>
                </span>
                <input
                  id='tempHeader'
                  className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
                  {...register('tempHeader', {
                    // VALIDATIONS
                    required: {
                      value: true,
                      message: 'Name is required',
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
                  className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 capitalize'
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
                className='py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize hover:bg-orange-100 transition-all'>
                Close
              </button>
              <button
                type='submit'
                disabled={submitting}
                className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] hover:bg-orange-600 transition-all'>
                {submitting ? 'submitting...' : heading}
              </button>
            </div>
          </form>
        </m.div>
      </m.div>
    </>
  )
}
