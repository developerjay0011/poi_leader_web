import { FC, useEffect } from 'react'
import { AnimatePresence, motion as m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { BiX } from 'react-icons/bi'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { getGroups, saveGroup } from '@/redux_store/group/groupAPI'
import { groupActions } from '@/redux_store/group/groupSlice'
import { Input } from '@/components/Input'

interface GroupFormProps {
  setShowModal: (data: any) => void
  setIsEdit: (data: any) => void
  getGroup: () => void
  isEdit: any
}

export interface NewFormFields {
  Name: string
  status: string
}

export const GroupForm: FC<GroupFormProps> = ({ setShowModal, setIsEdit, isEdit, getGroup }) => {
  const dispatch = cusDispatch();
  const statusArr = ['Active', 'Deactive']
  const { userDetails } = cusSelector((state) => state.auth);
  const { register, handleSubmit, setValue, reset, formState: { errors }, } = useForm<NewFormFields>({})
  const formSubmitHandler = async (data: NewFormFields) => {
    tryCatch(
      async () => {
        const body = isEdit?.id ? {
          leaderid: userDetails?.leaderId,
          name: data.Name,
          isactive: data.status == "Active" ? true : false,
          id: isEdit?.id
        } : {
          leaderid: userDetails?.leaderId,
          name: data.Name,
          isactive: data.status == "Active" ? true : false,
        }
        const response = await saveGroup(body);
        if (response?.success) {
          getGroup()
          reset()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
        setShowModal(false)
      })

  }
  useEffect(() => {
    if (isEdit?.id) {
      setValue("Name", isEdit.name)
      setValue("status", isEdit.isactive ? 'Active' : "Deactive")
    }
  }, [isEdit])

  return (
    <AnimatePresence mode="wait">
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""}`}>
        <m.section initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
          <button
            type='button'
            onClick={() => { setShowModal(false), setIsEdit(false); }}
            className='absolute top-3 right-3 z-40'>
            <BiX className='text-3xl' />
          </button>
          <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
            {isEdit?.id as string ? "Add Group" : "Add Group"}
          </h3>

          <form className="grid grid-cols-2 gap-x-4 gap-y-5 px-5 py-3" onSubmit={handleSubmit(formSubmitHandler)} >
            <Input
              errors={errors}
              id="Name"
              placeholder="Name"
              register={register}
              title="Name"
              type="text"
              required
              validations={{ required: "Name is required", }}
            />

            <Input
              register={register}
              errors={errors}
              title="Status"
              type="select"
              id={"status"}
              required
              validations={{
                required: "status is required",
              }}
              selectField={{
                title: "select status",
                options: statusArr.map((el) => ({ id: el, value: el })),
              }}
            />
            <div className='w-full bg-zinc-200 h-[1px] d col-span-full ' />
            <div className="flex justify-end col-span-full gap-2">
              <a className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50" onClick={() => { setShowModal(false), setIsEdit(false); }}>
                close
              </a>
              <button className="rounded-full px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize" type="submit">
                Save
              </button>
            </div>
          </form>
        </m.section>
      </m.div>
    </AnimatePresence>
  )
}
