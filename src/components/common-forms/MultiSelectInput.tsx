'use client'
import { StaticImageData } from 'next/image'
import { FC, useState, useRef } from 'react'
import { BiSolidDownArrow, BiX } from 'react-icons/bi'
import { Shortarray } from '../Input'

interface MultiSelectInputProps {
  options: {
    value: string
    id: string
    img?: string | StaticImageData
    designation?: string
  }[]
  required?: boolean
  title: string
  placeholder: string
}

export const MultiSelectInput: FC<MultiSelectInputProps> = ({
  required,
  title,
  options,
  placeholder,
}) => {
  const searchInpRef = useRef<HTMLInputElement>(null) // ref for Search INP
  const selectMenuRef = useRef<HTMLSelectElement>(null) // Ref for Multi-Select INP
  const [showOptions, setShowOptions] = useState(false) // To toggle whether to show or hide select field
  const [multiSelectSearchStr, setMultiSelectSearchStr] = useState('') // To enable search functionality
  const [selectedFields, setSelectedFields] = useState<string[]>([]) // Store all the values user selected from Multi-Select field
  const filteredOptions = options.filter((el) => el.value.toLowerCase().includes(multiSelectSearchStr))
  let listdata = Shortarray(filteredOptions) as any[]

  // Filtering options when user starting writing in search input field

  return (
    <>
      <label className='flex flex-col gap-2 relative'>
        <span className='capitalize font-[500]'>
          {title}
          {required && <strong className='text-rose-500'>*</strong>}
        </span>
        <div
          className={`relative w-full border py-[.7rem] outline-none rounded-md text-base transition-all border-slate-300 bg-slate-100 flex items-center flex-wrap ${selectedFields.length > 0
            ? 'bg-white pr-4 pl-2'
            : 'bg-slate-100 px-4'
            }`}>
          {/* Displaying Selected values */}
          {selectedFields.length > 0 && (
            <div className='flex items-center gap-2 mr-1 flex-wrap'>
              {selectedFields.map((el) => (
                <span
                  key={el}
                  className='flex capitalize pl-3 pr-1 w-max bg-slate-100 items-center gap-1 border border-slate-300 rounded text-[14px]'>
                  {el}
                  <BiX
                    className='text-lg cursor-pointer'
                    onClick={() =>
                      // Removing fields on user demand
                      setSelectedFields((lst) => {
                        const oldData = [...lst]

                        const index = oldData.findIndex((val) => val === el)

                        oldData.splice(index, 1)

                        return oldData
                      })
                    }
                  />
                </span>
              ))}
            </div>
          )}
          <input
            type='search'
            ref={searchInpRef}
            value={multiSelectSearchStr}
            placeholder={placeholder}
            className='bg-transparent outline-none flex-1 placeholder:capitalize'
            onKeyDown={(e) => {
              // Moving focus to multi-select input field when user press downarrow on keyboard
              if (e.key === 'ArrowDown') selectMenuRef.current?.focus()
            }}
            onChange={(e) => {
              setMultiSelectSearchStr(e.target.value.toLowerCase())
              if (e.target.value.length > 0) {
                setShowOptions(true)
              } else {
                setShowOptions(false)
              }
            }}
          />

          {multiSelectSearchStr.length === 0 && (
            <BiSolidDownArrow
              onClick={() => setShowOptions((lst) => !lst)}
              className='text-[14px] absolute top-1/2 translate-y-[-50%] right-2 text-slate-600 cursor-pointer'
            />
          )}
        </div>

        {showOptions && (
          <select
            multiple
            ref={selectMenuRef}
            onKeyDown={(e) => {
              const val = (e.target as HTMLSelectElement).value.toLowerCase()

              // Adding values to the array when user press enter while having focus on some option
              if (e.key === 'Enter' && val.length > 0) {
                setSelectedFields((lst) => {
                  const oldData = [...lst]

                  if (!oldData.some((el) => el === val)) oldData.push(val)

                  return oldData
                })
                setShowOptions(false)
                setMultiSelectSearchStr('')
                searchInpRef.current?.focus() // moving focus back to input field
              }
            }}
            onClick={(e) => {
              const val = (e.target as HTMLSelectElement).value.toLowerCase()

              // Adding values to the array when user select option by clicking on particular option
              if (val.length > 0) {
                setSelectedFields((lst) => {
                  const oldData = [...lst]

                  if (!oldData.some((el) => el === val)) oldData.push(val)

                  return oldData
                })
                setShowOptions(false)
                setMultiSelectSearchStr('')
              }
            }}
            className='absolute top-full left-0 w-full outline-none rounded-md shadow-md border z-[100]'>
            {listdata?.length > 0 &&
              listdata?.map((el) => (
                <option
                  value={el.value}
                  className='py-1 px-3 hover:bg-zinc-300'
                  key={el.id}>
                  {el.value}
                </option>
              ))}

            {listdata?.length === 0 && (
              <option className='text-center' value=''>
                No Data found
              </option>
            )}
          </select>
        )}
      </label>
    </>
  )
}
