'use client'
/* eslint-disable react/display-name */
import Image, { StaticImageData } from 'next/image'
import { MdArrowBack, MdArrowDropDown } from 'react-icons/md'
import Modi from '@/assets/politicians-images/narendar_modi.jpg'
import Kejriwal from '@/assets/politicians-images/ARVIND_KEJRIWAL.jpg'
import { forwardRef, useState, useRef, useEffect } from 'react'
import { GenerateId } from '@/utils/utility'

const Politicians = [
  {
    name: 'narendar modi',
    img: Modi,
    designation: 'prime minister',
    id: GenerateId(),
  },
  {
    name: 'arvind kejriwal',
    img: Kejriwal,
    designation: 'chief minister',
    id: GenerateId(),
  },
]

export default function DummPage() {
  const [showOptions, setShowOptions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    btnRef.current?.focus()
  }, [activeIndex])

  return (
    <>
      <div className='flex flex-col items-center gap-3 bg-gray-900 h-[100dvh] text-white'>
        <h4 className='text-5xl font-bold mt-5 mb-20'>
          Select Option with Custom Options
        </h4>

        <section className='flex items-center border border-gray-600 rounded gap-2 cursor-pointer relative'>
          <p
            className='w-max py-2 pl-4'
            onClick={() => {
              setShowOptions((lst) => !lst)
            }}>
            Custom Select Field
          </p>

          <MdArrowDropDown
            className='text-3xl mr-1'
            onClick={() => {
              setShowOptions((lst) => !lst)
            }}
          />

          <ul
            className={`absolute top-full left-0 w-full border-gray-600 shadow-md rounded ${
              showOptions ? 'border' : ''
            } overflow-hidden flex flex-col`}>
            {showOptions && (
              <>
                {Politicians.map((el, i) => (
                  <CustomOptions
                    {...el}
                    ref={i === activeIndex ? btnRef : null}
                    key={el.id}
                    index={i}
                  />
                ))}
              </>
            )}
          </ul>
        </section>
      </div>
    </>
  )
}

interface CustomOptionsProps {
  name: string
  designation: string
  img: StaticImageData | string
  id: string
  index: number
}

const CustomOptions = forwardRef<HTMLButtonElement, CustomOptionsProps>(
  ({ designation, img, name, id, index }, ref) => {
    return (
      <button
        type='button'
        className='flex items-center hover:bg-gray-800 p-2 gap-3 focus:bg-gray-800 focus:outline-none'
        ref={ref}>
        <Image
          src={img}
          alt='Display pic'
          className='w-10 aspect-square rounded-full object-cover object-center'
        />

        <div className='flex flex-col items-center text-sm'>
          <h6 className='font-medium capitalize'>{name}</h6>
          <p className='text-gray-300 capitalize'>{designation}</p>
        </div>
      </button>
    )
  }
)
