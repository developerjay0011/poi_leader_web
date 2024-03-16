import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { ErrorMessage } from '@hookform/error-message'
import { Savedby } from '@/constants/common'
import { SaveCategory, getCategory } from '@/redux_store/agenda/agendaApi'
import { agendaAction } from '@/redux_store/agenda/agendaSlice'
import { Modal } from '@/components/modal/modal'
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
export const CategoryFrom: FC<ManageTemplateFormProps> = ({ submitting, tempHeader, status, onClose, err, heading, isEdit }) => {
  const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm<TemplateFormFields>({})
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const formSubmitHandler = async (data: TemplateFormFields) => {
    const body = {
      id: isEdit ? isEdit.id : null,
      "leaderid": userDetails?.leaderId,
      "category": data?.category,
      isactive: data.isactive == "true" ? true : false,
      ...Savedby()
    };
    const response = await SaveCategory(body);
    if (response?.success) {
      const data = await getCategory(userDetails?.leaderId as string);
      dispatch(agendaAction.storeCategories(data));
      dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
      onClose()
      reset();
    } else {
      dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
    }

  }
  useEffect(() => {
    if (isEdit) {
      setValue("category", isEdit?.category)
      setValue("isactive", isEdit?.isactive)
    }
  }, [])

  return (
    <Modal heading={heading} onClose={onClose}  >
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
    </Modal>
  )
}
