'use client'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { Savedby, ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { Modal } from '@/components/modal/modal'
import { Input } from '@/components/Input'
import { SaveFile } from '@/redux_store/filetype/filetypeApi'
import { ImageMultiSelectIP } from '@/utils/MultiSelectIP'

interface FileTypeFormProps {
  onClose: () => void
  submitting: boolean
  heading: string
  edit?: boolean
  details: any
  getFiles: any
}

export interface FormFields {
  "id": string,
  "leaderid": string
  "file_name": string,
  "file_number": string,
  "file_location": string,
  "to": any,
  "saved_by_type": string,
  "saved_by": string
}

export const FileTypeForm: FC<FileTypeFormProps> = ({ onClose, submitting, heading, edit, details, getFiles }) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const { location } = cusSelector((state) => state.location);
  const { leaderOptions } = cusSelector((state) => state.common);
  const [officer, setofficer] = useState([])
  const { register, handleSubmit, reset, formState: { errors, isValid }, setValue } = useForm<FormFields>({})
  const officers = () => {
    var list = []
    if (leaderOptions?.ministries) {
      const modifiedData = leaderOptions?.ministries.map(item => ({
        ...item,
        officers: item.officers.map((officer: any) => ({
          ...officer,
          ministryid: item.id,
          ministry_name: item.name
        }))
      }))
      list = modifiedData.reduce((acc, curr) => {
        return acc.concat(curr.officers);
      }, []);
    }
    setofficer(list)
  }
  const setToFieldValue = (val: any) => { setValue("to", val) };
  const dispatch = cusDispatch();
  const formSubmitHandler = (data: FormFields) => {
    tryCatch(
      async () => {
        var body: any = {
          leaderid: userDetails?.leaderId,
          "file_name": data?.file_name,
          "file_number": data?.file_number,
          "file_location": data?.file_location,
          "to": data?.to?.map((item: any) => ({
            "ministryid": item?.ministryid,
            "officerid": item?.id,
          })),
          ...Savedby()
        };
        if (details?.id) {
          body.id = details?.id
        }
        const response = await SaveFile(body);
        if (response?.success) {
          getFiles()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          onClose()
          reset();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  }

  useEffect(() => {
    officers()
    if (edit) {
      reset({
        "file_name": details?.file_name,
        "file_number": details?.file_number,
        "file_location": details?.file_location,
      })
    }
  }, [reset, leaderOptions?.ministries])



  return (
    <Modal heading={heading} onClose={onClose}>
      <form className='flex flex-col py-5 gap-4 max-[550px]:px-4' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
        <section className='grid px-7 gap-5 grid-cols-2 gap-y-5 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>

          <Input
            register={register}
            errors={errors}
            title="File Name"
            type="text"
            id={"file_name"}
            required
            validations={{ required: "File Name is required", }}
          />

          <Input
            register={register}
            errors={errors}
            title="File Number"
            type="text"
            id={"file_number"}
            required
            validations={{ required: "File Number is required", }}
          />

          <Input
            register={register}
            errors={errors}
            title="File Location"
            type="select"
            id={"file_location"}
            required
            validations={{ required: "file location is required", }}
            selectField={{
              title: "select location",
              options: location.map((el: any) => ({ id: el?.location, value: el?.location })),
            }}
          />
          <ImageMultiSelectIP
            title={"officer"}
            svalue={Array.isArray(details?.to) ? details?.to?.map((item: any) => ({
              ...item,
              id: item?.officerid
            })) : []}
            placeholder="select officer"
            options={officer.map((el: any) => el)}
            setValue={(value: any) => { setToFieldValue(value) }}
          />

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
