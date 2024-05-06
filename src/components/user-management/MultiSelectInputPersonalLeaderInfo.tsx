/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useRef, useEffect } from 'react'
import { BiSolidDownArrow, BiX } from 'react-icons/bi'
import { Shortarray } from '../Input'

interface MultiSelectInputProps {
  id: string
  options: {
    val: string
    id: string
  }[]
  required?: boolean
  title: string
  setValue: (val: { val: string; id: string }[]) => void
  limit: number
  defaultValues: {
    val: string
    id: string
  }[]
}

export const MultiSelectInputPersonalLeaderInfo: FC<MultiSelectInputProps> = ({
  required,
  title,
  options,
  id,
  setValue,
  limit,
  defaultValues,
}) => {
  const searchInpRef = useRef<HTMLInputElement>(null)
  const selectMenuRef = useRef<HTMLSelectElement>(null) // Ref for Multi-Select INP
  const [showOptions, setShowOptions] = useState(false) // To toggle whether to show or hide select field
  const [multiSelectSearchStr, setMultiSelectSearchStr] = useState('') // To enable search functionality
  const [selectedFields, setSelectedFields] = useState<
    {
      val: string
      id: string
    }[]
  >(defaultValues) // Store all the values user selected from Multi-Select field

  // Filtering options when user starting writing in search input field
  const filteredOptions = options.filter((el) =>
    el.val.toLowerCase().includes(multiSelectSearchStr)
  )
  let listdata = Shortarray(filteredOptions, "val") as any[]

  useEffect(() => {
    selectedFields.length > 0 ? setValue(selectedFields) : setValue([])
  }, [selectedFields])

  return (
    <>
      <label className='flex flex-col gap-2 relative' htmlFor={id}>
        <span className='capitalize font-[500]'>
          {title}
          {required && <strong className='text-rose-500'>*</strong>}
        </span>
        <div
          className={`relative overflow-hidden w-full border py-[.7rem] outline-none rounded-md text-base transition-all border-slate-300 bg-slate-100 flex items-center flex-wrap ${selectedFields.length > 0
            ? 'bg-white pr-4 pl-2'
            : 'bg-slate-100 px-4'
            }`}>
          {/* Displaying Selected values */}
          {selectedFields.length > 0 && (
            <div className='flex items-center gap-2 mr-1 flex-wrap'>
              {selectedFields.map((el) => (
                <span
                  key={el.id}
                  className='flex capitalize pl-3 pr-1 w-max bg-slate-100 items-center gap-1 border border-slate-300 rounded text-[14px]'>
                  {el.val}
                  <BiX
                    className='text-lg cursor-pointer'
                    onClick={() =>
                      // Removing fields on user demand
                      setSelectedFields((lst) => {
                        const oldData = [...lst]

                        const index = oldData.findIndex(
                          (val) => val.id === el.id
                        )

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
            placeholder={title}
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
            <button
              type='button'
              onClick={() => setShowOptions((lst) => !lst)}
              className='h-full bg-gray-100 absolute top-0 right-0 px-1 shadow-md'>
              <BiSolidDownArrow className='text-[14px] text-slate-600 cursor-pointer' />
            </button>
          )}
        </div>

        {showOptions && (
          <select
            id={id}
            multiple
            ref={selectMenuRef}
            onKeyUp={(e) => {
              const id = (e.target as HTMLSelectElement).value

              const val = (e.target as HTMLSelectElement).querySelector(
                `option[value="${id}"]`
              )?.textContent as string

              // Adding values to the array when user press enter while having focus on some option | Also checking for value length and if there is any ID or not.
              if (e.key === 'Enter' && val.length > 0 && id) {
                setSelectedFields((lst) => {
                  const oldData = [...lst]

                  if (
                    !oldData.some((el) => el.id === id) &&
                    oldData.length < limit
                  )
                    oldData.push({ id, val })

                  return oldData
                })
                setShowOptions(false)
                setMultiSelectSearchStr('')
                searchInpRef.current?.focus() // moving focus back to input field
              }
            }}
            onClick={(e) => {
              const id = (e.target as HTMLSelectElement).value

              const val = (e.target as HTMLSelectElement).textContent as string

              // Adding values to the array when user select option by clicking on particular option | Also checking for value length and if there is any ID or not.
              if (val.length > 0 && id) {
                setSelectedFields((lst) => {
                  const oldData = [...lst]

                  if (
                    !oldData.some((el) => el.id === id) &&
                    oldData.length < limit
                  )
                    oldData.push({ id, val })

                  return oldData
                })
                setShowOptions(false)
                setMultiSelectSearchStr('')
              }
            }}
            className='absolute top-full left-0 w-full outline-none rounded-md shadow-md border z-[100]'>
            {listdata?.length > 0 &&
              listdata?.map((el: any) => (
                <option
                  value={el.id}
                  className='py-1 px-3 hover:bg-zinc-300'
                  key={el.id}>
                  {el.val}
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
