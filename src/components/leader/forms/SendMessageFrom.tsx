import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { ErrorMessage } from '@hookform/error-message'
import { Modal } from '@/components/modal/modal'
import { Input } from '@/components/Input'
interface SendMessageProps {
  onClose: () => void
  heading: string
}
interface MessageProps {
  message: any,
  attachments: any,
}
export const SendMessage: FC<SendMessageProps> = ({ onClose, heading }) => {
  const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm<MessageProps>({})
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const formSubmitHandler = async (data: MessageProps) => {
    const body = {};
    // if (response?.success) {
    //   const data = await getCategory(userDetails?.leaderId as string);
    //   dispatch(agendaAction.storeCategories(data));
    //   dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
    // } else {
    //   dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
    // }
    onClose()
    reset();
  }

  return (
    <Modal heading={heading} onClose={onClose} >
      <form className='flex flex-col py-5  px-7  gap-4 max-[550px]:px-4' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
        <Input
          errors={errors}
          id="message"
          placeholder="Enter message"
          register={register}
          title="Message"
          type="textarea"
          required
          validations={{
            required: "message is required",
          }}
        />

        {/* <Input
          errors={errors}
          id="attachments"
          placeholder="attachments"
          register={register}
          title="Attachments"
          type="file"
        /> */}


        <div className='w-full bg-zinc-200 h-[1px] mt-3' />
        <div className='flex self-end gap-2 max-[580px]:self-stretch max-[580px]:flex-wrap'>
          <button
            onClick={onClose}
            className='py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize'
            type='button'>
            close
          </button>
          <button type='submit' className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
            {'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
