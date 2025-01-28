import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { saveGroup } from '@/redux_store/group/groupAPI'
import { Input } from '@/components/Input'
import { Modal } from '@/components/modal/modal'

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
    } else {
      setValue("status", 'Active')
    }
  }, [isEdit])

  return (
    <Modal heading={isEdit?.id as string ? "Add Group" : "Add Group"} onClose={() => { setShowModal(false), setIsEdit(false); }}>
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
          <button className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize" onClick={() => { setShowModal(false), setIsEdit(false); }}>
            close
          </button>
          <button className="rounded-full px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize" type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal >
  )
}
