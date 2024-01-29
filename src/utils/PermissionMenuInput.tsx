import { FC, ChangeEvent } from 'react'
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md'

interface PermissionMenuInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void
  id: string
  name: string
  defaultChecked?: boolean
}

export const PermissionMenuInput: FC<PermissionMenuInputProps> = ({
  onChange,
  id,
  name,
  defaultChecked,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className='flex items-center cursor-pointer gap-2 w-full'>
        <input
          type='checkbox'
          className='permission_checkbox hidden'
          id={id}
          onChange={(e) => onChange(e, id)}
          defaultChecked={defaultChecked}
        />
        <span className='un_checked_box'>
          <MdOutlineCheckBoxOutlineBlank className='text-2xl text-sky-900' />
        </span>
        <span className='checked_box hidden'>
          <MdOutlineCheckBox className='text-2xl text-sky-900' />
        </span>

        <p className='capitalize text-md font-medium'>{name}</p>
      </label>
    </>
  )
}
