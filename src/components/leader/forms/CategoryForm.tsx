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
import { ErrorMessage } from '@hookform/error-message'
import { Savedby } from '@/constants/common'
import { SaveCategory, getCategory } from '@/redux_store/agenda/agendaApi'
import { agendaAction } from '@/redux_store/agenda/agendaSlice'
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
  category: string
  isactive: string
}
const Editor = dynamic(() => import('./Editor'), {
  ssr: false
})
export const CategoryFrom: FC<ManageTemplateFormProps> = ({
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
  })
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();

  const formSubmitHandler = async (data: TemplateFormFields) => {
    const body = {
      id: isEdit ? isEdit.id : null,
      "leaderid": userDetails?.leaderId,
      "category": data?.category,
      isactive: data.isactive == "1" ? true : false,
      ...Savedby()
    };
    const response = await SaveCategory(body);
    if (response?.success) {
      const data = await getCategory(userDetails?.leaderId as string);
      dispatch(agendaAction.storeCategories(data));
      dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
    } else {
      dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
    }
    onClose()
    reset();
  }

  useEffect(() => {
    if (isEdit) {
      setValue("category", isEdit?.category)
      setValue("isactive", isEdit?.isactive)
    }
  }, [])
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-10 '>
        <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center main_scrollbar`}>
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
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
              {heading}
            </h3>
            <form
              className='flex flex-col py-5 gap-4 max-[550px]:px-4'
              noValidate
              onSubmit={handleSubmit(formSubmitHandler)}>
              <section className='grid px-7 gap-5 grid-cols-2 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
                <label htmlFor='fullname' className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>
                    category
                    {<strong className='text-rose-500'>*</strong>}
                  </span>
                  <input
                    id='category'
                    type='text'
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md  transition-all focus:bg-slate-200 focus:border-slate-400'
                    {...register('category', { required: 'category is required' })}
                  />
                  <ErrorMessage
                    name={'category'}
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
