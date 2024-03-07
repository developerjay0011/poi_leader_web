import { FC, useEffect, useState } from 'react'
import { AnimatePresence, motion as m } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { PollType } from '@/utils/typesUtils'
import { BiMinusCircle, BiPlusCircle, BiX } from 'react-icons/bi'
import { GenerateId, dateTimeConverter } from '@/utils/utility'
import { ImagePlusTextInput } from './ImagePlusTextInput'
import { PollsPreview } from '@/components/posts/polls/PollsPreview'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { getPolls, savePolls } from '@/redux_store/polls/pollsApi'
import { commonActions } from '@/redux_store/common/commonSlice'
import { Savedby, ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { pollActions } from '@/redux_store/polls/pollSlice'

interface ManagePollsFormProps {
  onClose: () => void
  submitting: boolean
  heading: string
  edit?: boolean
  title?: string
  pollType?: PollType
  poll_options?: { text: string; id: string; votes: number }[]
  imgOptions?: { text: string; image: string; id: string; votes: number }[]
  publishDate?: string
  access?: string
  expiresAt?: string
  id?: string
  view_access?: string
}

export interface NewPollsFormFields {
  title: string
  pollType: PollType
  poll_options: { text: string; id: string; votes: number }[]
  imgOptions: { text: string; image: string; id: string; votes: number }[]
  publishDate: string
  access: string
  expiresAt: string
  view_access: string
  votes_by: any[]
}

export const ManagePollsForm: FC<ManagePollsFormProps> = ({
  onClose,
  submitting,
  heading,
  edit,
  access,
  expiresAt,
  imgOptions,
  poll_options,
  pollType,
  publishDate,
  view_access,
  title,
  id
}) => {
  // MIN Publish Date and time limit
  const minDateLimit = dateTimeConverter(new Date().toISOString(), 0)
  const [showPreview, setShowPreview] = useState(false)
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const { register, handleSubmit, control, watch, setValue, getValues, reset, formState: { errors, isValid }, } = useForm<NewPollsFormFields>({ defaultValues: { publishDate, expiresAt, access, imgOptions, poll_options, pollType, title, view_access }, })
  const { fields, append, remove } = useFieldArray({ name: 'poll_options', control, })
  const { fields: imgFields, append: addImgField, remove: removeImgField, } = useFieldArray({ name: 'imgOptions', control, })
  const formSubmitHandler = (data: NewPollsFormFields) => {
    tryCatch(
      async () => {
        const body = {
          id: edit ? id : null,
          leaderid: userDetails?.leaderId || "",
          title: data?.title,
          polltype: data?.pollType,
          access: data?.access,
          view_access: data?.view_access,
          poll_options: data?.poll_options,
          publish_date: data?.publishDate,
          close_date: data?.expiresAt,
          ...Savedby()
        };
        const response = await savePolls(body);
        if (response?.success) {
          // setIsEdit(false);
          const Data = await getPolls(userDetails?.leaderId as string);
          dispatch(pollActions.storePoll(Data))
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

    }
  }, [])

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-10 '>
        <div
          className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll main_scrollbar flex justify-center ${fields.length > 4 || imgFields.length > 4 ? 'max-[650px]:py-5' : ''
            }`}>
          <m.section
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='z-30 border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-5 border-b font-semibold text-3xl capitalize'>
              {heading}
            </h3>

            {/* {err.isErr && (
            <span className='text-red-500 px-5 capitalize font-medium'>
              {err.errTxt}
            </span>
          )} */}

            <form
              className='flex flex-col px-7 py-5 mt-5 gap-5 max-[550px]:px-4'
              noValidate
              onSubmit={handleSubmit(formSubmitHandler)}>
              <section className='grid gap-5 grid-cols-2 gap-y-7 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
                <label htmlFor='title' className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>
                    title
                    {<strong className='text-rose-500'>*</strong>}
                  </span>
                  <input
                    id='title'
                    type='text'
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
                    {...register('title', { required: 'title is required' })}
                  />
                  <ErrorMessage
                    name={'title'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>

                <label htmlFor='pollType' className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>
                    poll type
                    {<strong className='text-rose-500'>*</strong>}
                  </span>
                  <select
                    id='pollType'
                    {...register('pollType', {
                      required: 'Poll type is required',
                      onChange(e) {
                        if (e.target.value === 'text') {
                          append({ text: '', id: GenerateId(), votes: 0 })
                          removeImgField()
                        }
                        if (e.target.value === 'image') {
                          addImgField({
                            image: '',
                            text: '',
                            id: GenerateId(),
                            votes: 0,
                          })
                          remove()
                        }
                      },
                    })}
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 capitalize'>
                    <option value=''> select poll type </option>
                    <option value='text'> text </option>
                    <option value='image'>text + image</option>
                  </select>
                  <ErrorMessage
                    name={'title'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>

                <label htmlFor='allowAccess' className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>
                    Allow Access
                    <strong className='text-rose-500'>*</strong>
                  </span>
                  <select
                    id='allowAccess'
                    {...register('access', {
                      required: 'acess is required',
                    })}
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 capitalize'>
                    <option value=''> Allow Access </option>
                    <option value='open'> Open to all </option>
                    <option value='followers'>followers</option>
                    <option value='network'>networks</option>
                  </select>
                  <ErrorMessage
                    name={'access'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>
                <label htmlFor='view_access' className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>
                    Result Access
                    <strong className='text-rose-500'>*</strong>
                  </span>
                  <select
                    id='view_access'
                    {...register('view_access', {
                      required: 'Result access is required',
                    })}
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 capitalize'>
                    <option value=''> Allow Access </option>
                    <option value='private'>Private</option>
                    <option value='public'>Public</option>
                  </select>
                  <ErrorMessage
                    name={'view_access'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>
                <label htmlFor='publishDate' className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>Publish Date</span>
                  <input
                    type='datetime-local'
                    id='publishDate'
                    min={minDateLimit}
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
                    {...register('publishDate')}
                  />
                  <ErrorMessage
                    name={'publishDate'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>

                <label
                  htmlFor='expiresDate'
                  className={`flex flex-col gap-2 ${(fields.length > 0 || imgFields.length > 0) &&
                    'col-span-full'
                    }`}>
                  <span className='capitalize font-[500]'>
                    Poll Close date
                    <strong className='text-rose-500'>*</strong>
                  </span>
                  <input
                    type='datetime-local'
                    id='expiresDate'
                    min={minDateLimit}
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400'
                    {...register('expiresAt', {
                      required: 'Poll close date is required',
                    })}
                  />
                  <ErrorMessage
                    name={'publishDate'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>

                {watch('pollType') === 'text' && (
                  <label
                    htmlFor='poll_options'
                    key={GenerateId()}
                    className={`flex flex-col gap-3 col-span-full`}>
                    <span className='capitalize font-[500] flex items-center'>
                      poll poll_options
                      {<strong className='text-rose-500'>*</strong>}
                      {fields.length < 5 && (
                        <button
                          type='button'
                          onClick={() =>
                            append({ text: '', id: GenerateId(), votes: 0 })
                          }
                          className='text-rose-500 text-3xl ml-2'>
                          <BiPlusCircle />
                        </button>
                      )}
                    </span>
                    {fields.map((el, i) => (
                      <>
                        <div className='flex items-center gap-1' key={el.id}>
                          <input
                            type='text'
                            id={el.id}
                            placeholder={'option ' + (i + 1)}
                            className='border w-full border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 placeholder:capitalize'
                            {...register(`poll_options.${i}.text`, {
                              required: `option ${i} is required`,
                            })}
                          />
                          {i !== 0 && (
                            <span
                              onClick={() => remove(i)}
                              className='text-orange-500 text-3xl'>
                              <BiMinusCircle />
                            </span>
                          )}
                        </div>
                      </>
                    ))}
                  </label>
                )}

                {watch('pollType') === 'image' && (
                  <label
                    htmlFor='poll_options'
                    key={GenerateId()}
                    className={`flex flex-col gap-3 col-span-full`}>
                    <span className='capitalize font-[500] flex items-center'>
                      poll poll_options
                      {<strong className='text-rose-500'>*</strong>}
                      {imgFields.length < 5 && (
                        <button
                          type='button'
                          onClick={() =>
                            addImgField({
                              image: '',
                              text: '',
                              id: GenerateId(),
                              votes: 0,
                            })
                          }
                          className='text-rose-500 text-3xl ml-2'>
                          <BiPlusCircle />
                        </button>
                      )}
                    </span>
                    {imgFields.map((el, i) => (
                      <ImagePlusTextInput
                        id={el.id}
                        index={i}
                        register={register}
                        remove={removeImgField}
                        key={el.id}
                        setValue={setValue}
                        image={getValues(`imgOptions.${i}.image`)}
                      />
                    ))}
                  </label>
                )}
              </section>

              <div className='w-full bg-zinc-200 h-[1px] mt-3' />

              <div className='flex self-end gap-2 max-[580px]:self-stretch max-[580px]:flex-wrap'>
                <button
                  onClick={onClose}
                  className='py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize'
                  type='button'>
                  close
                </button>
                <button
                  disabled={!isValid}
                  onClick={() => setShowPreview(true)}
                  className='py-2 px-5 rounded-full capitalize border border-orange-500 text-orange-500 bg-orange-100 hover:bg-orange-500 hover:text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] disabled:border-none'
                  type='button'>
                  preview
                </button>

                {!edit && watch('publishDate') !== minDateLimit && (
                  <button
                    type='submit'
                    disabled={!isValid || submitting}
                    className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
                    {submitting ? 'saving..' : 'schedule'}
                  </button>
                )}

                {!edit && watch('publishDate') === minDateLimit && (
                  <button
                    type='submit'
                    disabled={!isValid || submitting}
                    className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
                    {submitting ? 'saving..' : 'publish now'}
                  </button>
                )}

                {edit && (
                  <button
                    type='submit'
                    disabled={!isValid || submitting}
                    className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
                    {submitting ? 'saving..' : 'save changes'}
                  </button>
                )}
              </div>
            </form>
          </m.section>
        </div>
      </m.div>

      <AnimatePresence>
        {showPreview && (
          <PollsPreview
            onClose={() => setShowPreview(false)}
            pollDetails={getValues()}
          />
        )}
      </AnimatePresence>
    </>
  )
}
