import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { Tickettype, ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { Modal } from '@/components/modal/modal'
import { Input } from '@/components/Input'
import { Attachments } from '@/utils/typesUtils'
import { BsFolderFill, BsX } from 'react-icons/bs'
import { GenerateId, convertFileToBase64 } from '@/utils/utility'
import { FaSignature } from 'react-icons/fa6'
import Image from 'next/image'
import { SaveTicketManually } from '@/redux_store/ticket/ticketApi'

interface ManageEmployessFormProps {
  onClose: () => void
  submitting: any
  heading: string
  edit?: boolean
}

export interface FormFields {
  name: string
  email: string
  mobile: string
  address: string
  ticket_category: string
  categoryid: string
  subject: string
  description: string
  leaderid: string
  attachments: any
  id: string,
  signature: any
}

export const TicketForm: FC<ManageEmployessFormProps> = ({ onClose, submitting, heading, edit, }) => {
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const [signature, setSignature] = useState("");
  const [loader, setLoader] = useState(false);
  const [signatureDoc, setSignatureDoc] = useState("");
  const { leaderOptions } = cusSelector((state) => state.common);
  const [attachmentsDoc, setAttachmentsDoc] = useState<Attachments[]>([]);
  const { register, handleSubmit, reset, formState: { errors, isValid }, setValue } = useForm<FormFields>({})
  const addAttachmentsHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setAttachmentsDoc((lst) => {
        const oldData = [...lst];
        oldData.push({
          file: file as any,
          id: GenerateId(),
          type: file.type,
        });
        return oldData;
      });
    }
  };
  const formSubmitHandler = (data: FormFields) => {
    tryCatch(
      async () => {
        setLoader(true)
        if (attachmentsDoc?.length == 0) {
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: "Add attachment" }))
          return
        }
        const formData = new FormData();
        formData.append("name", data?.name || "");
        formData.append("email", data?.email || "");
        formData.append("mobile", data?.mobile || "");
        formData.append("address", data?.address || "");
        formData.append("ticket_category", data?.ticket_category || "");
        formData.append("categoryid", data?.categoryid || "");
        formData.append("subject", data?.subject || "");
        formData.append("description", data?.description || "");
        formData.append("leaderid", userDetails?.leaderId || "");
        if (attachmentsDoc?.length > 0) {
          for (let i = 0; i < attachmentsDoc?.length; i++) {
            const element = attachmentsDoc?.[i]?.file
            formData.append("attachments", element as any)
          }
        } else {
          formData.append("attachments", data?.attachments || [] as any)
        }
        if (data?.signature) {
          formData.append("signature", data?.signature || null as any)
        }
        const response = await SaveTicketManually(formData);
        if (response?.success) {
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          submitting()
          onClose()
          reset();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  }


  return (
    <Modal heading={heading} onClose={onClose}>
      <form className='flex flex-col py-3 gap-4 max-[550px]:px-4' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
        <section className='grid px-7 gap-5 grid-cols-2 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
          <Input
            errors={errors}
            id={"name" as any}
            register={register as any}
            title="User Full Name"
            type="text"
            required
            validations={{
              required: 'name is required',
            }}
          />

          <Input
            errors={errors}
            id={"email" as any}
            register={register as any}
            title="E-mail"
            type="email"
            required
            validations={{
              required: 'email is required',
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message:
                  "Please enter a valid email EX: something@example.com",
              },
            }}
          />

          <Input
            errors={errors}
            id={"mobile" as any}
            register={register as any}
            title="Mobile No."
            type="number"
            required
            validations={{
              required: 'phone number is required',
              validate: {
                notAValidNo(val) {
                  return (
                    val.toString().length === 10 ||
                    "please enter a valid phone no"
                  );
                },
              }
            }}
          />


          <Input
            errors={errors}
            id={"address" as any}
            register={register as any}
            title="Address"
            type="text"
            required
            validations={{
              required: "address is required",
            }}
          />
        </section>
        <div className='w-full bg-zinc-200 h-[1px] mt-3' />
        <section className='grid px-7 gap-5 grid-cols-2 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
          <Input
            errors={errors}
            id={"ticket_category" as any}
            selectField={{
              title: "select ticket type",
              options: Tickettype,
            }}
            register={register as any}
            title="Ticket Type"
            type="select"
            required
            validations={{
              required: "ticket type is required",
            }}
          />

          <Input
            errors={errors}
            id={"categoryid" as any}
            selectField={{
              title: "Select Category",
              options: leaderOptions?.categories?.map((el: any) => ({ id: el?.id, value: el.category })),
            }}
            register={register as any}
            title="Category"
            type="select"
            required
            validations={{
              required: "Category is required",
            }}
          />

          <Input
            errors={errors}
            id={"subject" as any}
            register={register as any}
            title="Subject"
            type="text"
            fullWidth
            required
            validations={{
              required: 'subject is required',
            }}
          />
          <Input
            errors={errors}
            id={"description" as any}
            register={register as any}
            title="Description"
            type="textarea"
            required
            fullWidth
            validations={{
              required: 'description is required',
            }}
          />
          <label
            htmlFor="attachment"
            className={`flex flex-col gap-2 w-max`}
          >
            <span className="capitalize font-[500]">Attachment <strong className='text-red-500'>*</strong></span>

            <input
              type="file"
              id="attachment"
              multiple
              onChange={addAttachmentsHandler}
              className="hidden"
            />
            <div className="flex items-center cursor-pointer gap-2 capitalize">
              <BsFolderFill className="text-2xl" />{" "}
              {attachmentsDoc.length === 0
                ? "No file selected"
                : `${attachmentsDoc.length} file selected`}
            </div>
          </label>
          <label
            htmlFor="signature"
            className={`flex flex-col gap-2 w-max cursor-pointer`}
          >
            <span className="capitalize font-[500] flex items-center gap-2">
              Upload Signature
            </span>
            {!signature && (
              <FaSignature className="text-2xl" />
            )}
            <input
              type="file"
              id="signature"
              className="hidden"
              accept="image/*"
              {...register("signature" as any, {
                async onChange(e: ChangeEvent<HTMLInputElement>) {
                  if (e.target.files) {
                    const file = (e.target.files as FileList)[0] as any
                    if (!file) return;
                    if (!file.type.includes("image")) return;
                    if (file) {
                      const signatureFile = await convertFileToBase64(file);
                      setSignature(signatureFile);
                      setValue("signature", file);
                      setSignatureDoc(file as any);
                    }
                  }
                },
                validate: {
                  notAImg(file) {
                    if (file) {
                      const type = (file as FileList)[0]?.type;
                      if (!type) return true;
                      return (
                        type.includes("image") ||
                        "Only Image files are allowed."
                      );
                    }
                  },
                },
              })}
            />
            {signature && (
              <div className="relative w-max">
                <Image
                  src={signature}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-20 aspect-square object-cover object-center bg-white"
                />

                <button
                  type="button"
                  onClick={() => {
                    setSignature("");
                    setValue("signature", "");
                  }}
                  className="absolute top-0 right-[-20%] rounded-full bg-gray-100 z-10 hover:scale-110 transition-all"
                >
                  <BsX className="text-xl" />
                </button>
              </div>
            )}
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
            disabled={loader}
            className='rounded-full capitalize px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500]'>
            {loader ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
