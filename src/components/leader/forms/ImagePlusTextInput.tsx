'use client'
import { FC, useState, ChangeEvent } from 'react'
import { BiMinusCircle, BiX } from 'react-icons/bi'
import { BsCameraFill } from 'react-icons/bs'
import { motion as m } from 'framer-motion'
import {
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { convertFileToBase64 } from '@/utils/utility'
import { NewPollsFormFields } from './ManagePollsForm'
import CustomImage from '@/utils/CustomImage'

interface ImagePlusTextInputProps {
  id: string
  index: number
  register: UseFormRegister<NewPollsFormFields>
  remove: UseFieldArrayRemove
  setValue: UseFormSetValue<NewPollsFormFields>
  image: string
}

export const ImagePlusTextInput: FC<ImagePlusTextInputProps> = ({ id, index, register, remove, setValue, image, }) => {
  const [previewImg, setPreviewImg] = useState(image)

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex items-center gap-4 max-[650px]:gap-2'>
        <label htmlFor={id}>
          <input
            type='file'
            accept='image/*'
            id={id}
            className='hidden'
            {...register(`imgOptions.${index}.image`, {
              async onChange(e: ChangeEvent<HTMLInputElement>) {
                const data = (e.target.files as FileList)[0]

                const convertedData = (await convertFileToBase64(
                  data
                )) as string

                setValue(`imgOptions.${index}.image`, convertedData)
                setPreviewImg(convertedData)
              },
            })}
          />
          {!previewImg && <BsCameraFill className='text-3xl text-zinc-500' />}
          {previewImg && (
            <>
              {/* Preview Img box */}
              <div className='relative'>
                <CustomImage
                  src={previewImg}
                  alt='user dp'
                  width={1000}
                  height={1000}
                  className='w-16 aspect-square object-center object-cover'
                />
                <button
                  type='button'
                  onClick={() => {
                    setPreviewImg('')
                    setValue(`imgOptions.${index}.image`, '')
                  }}
                  className='absolute top-0 right-0 w-4 aspect-square rounded-full bg-opacity-50 bg-black text-white flex items-center justify-center text-lg'>
                  <BiX />
                </button>
              </div>
            </>
          )}
        </label>

        <input
          type='text'
          placeholder={'option ' + (index + 1)}
          className='border w-full border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 placeholder:capitalize'
          {...register(`imgOptions.${index}.text`, {
            required: `option ${index} is required`,
          })}
        />

        {index !== 0 && (
          <span
            onClick={() => remove(index)}
            className='text-orange-500 text-3xl max-[650px]:text-2xl'>
            <BiMinusCircle />
          </span>
        )}
      </m.div>
    </>
  )
}
