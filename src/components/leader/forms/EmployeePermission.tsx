import { FC, useEffect } from 'react'
import { motion as m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { BiX } from 'react-icons/bi'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { tryCatch } from '@/config/try-catch'
import { AccessField } from '@/components/Access'
import { SavePermission } from '@/redux_store/employee/employeeApi'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'

interface EmployeePermissionFormProps {
  onClose: () => void
  submitting: boolean
  heading: string
}

export const EmployeePermissionForm: FC<EmployeePermissionFormProps> = ({ onClose, submitting, heading, }) => {
  const { employeaccess }: any = cusSelector((state) => state.employee);
  const dispatch = cusDispatch();
  const { register, handleSubmit, reset, formState: { errors, isValid }, setValue, watch, getValues } = useForm({}) as any
  const formSubmitHandler = (data: any) => {
    const idsWithYesValue = Object.entries(data).filter(([key, value]) => value === "yes").map(([key]) => key);
    tryCatch(
      async () => {
        const response = await SavePermission({
          "id": employeaccess?.id,
          "tabs": idsWithYesValue?.filter((item: any) => item != "All"),
          "userid": employeaccess?.eid
        });
        if (response?.success) {
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          onClose()
          reset();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }

      })
  }
  const handleGiveAllAccessChange = () => {
    const All = watch('All')
    if (All == "yes" || All == "no") {
      employeaccess?.accesses?.forEach((item: any) => {
        setValue(item?.tabid, All);
      });
    }
  };
  useEffect(() => {
    employeaccess?.accesses?.forEach((item: any) => { setValue(item?.tabid, item?.ischecked ? "yes" : "no"); });
  }, [employeaccess, setValue])
  useEffect(() => {
    const idsWithYesValue = Object.entries(getValues()).filter(([key, value]) => value === "yes").map(([key]) => key)?.filter((item: any) => item != "All")?.length == employeaccess?.accesses?.length
    const idsWithNoValue = Object.entries(getValues()).filter(([key, value]) => value === "no").map(([key]) => key)?.filter((item: any) => item != "All")?.length == employeaccess?.accesses?.length
    if (idsWithNoValue == true) {
      setValue('All', 'no');
    }
    if (idsWithYesValue == true) {
      setValue('All', 'yes');
    }
  }, [getValues]);

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-10'>
        <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20  flex justify-center item-center`}>
          <m.section
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='z-30 self-center border overflow-y-auto main_scrollbar max-h-[98%] self-start bg-white relative w-1/2 rounded-md shadow-md max-[1450px]:w-[80%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-5 border-b font-semibold text-2xl capitalize'>
              {heading}
            </h3>
            <form
              className='flex flex-col py-5 gap-4 max-[550px]:px-4'
              noValidate
              onSubmit={handleSubmit(formSubmitHandler)}>
              <section className='grid px-7 gap-5 grid-cols-2 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
                <AccessField
                  errors={errors}
                  id={"All" as any}
                  question={"Give All Access"}
                  register={(e): any => {
                    return (
                      handleGiveAllAccessChange(),
                      register(e)
                    )
                  }}
                />
                {employeaccess?.accesses?.map((item: any) =>
                  <AccessField
                    errors={errors}
                    id={item?.tabid}
                    question={item?.tabname}
                    register={register}
                    key={item?.tabid}
                  />
                )}
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
