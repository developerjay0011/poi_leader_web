import { FC } from 'react'

import { motion as m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { LetterSettingsInputField } from './LetterSettingsInputField'

interface LetterSettingsFormProps {
  onClose: () => void
  // submitHandler: () => void
}

export interface LetterSettingsFormFields {
  a4EngFontSize: string
  a5EngFontSize: string
  a4PageWidth: string
  a4PageHeight: string
  a4TopMargin: string
  a4BottomMargin: string
  a4LeftMargin: string
  a4RightMargin: string
  a5PageWidth: string
  a5PageHeight: string
  a5TopMargin: string
  a5BottomMargin: string
  a5LeftMargin: string
  a5RightMargin: string
}

export const LetterSettingsForm: FC<LetterSettingsFormProps> = ({
  onClose,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LetterSettingsFormFields>({
    defaultValues: {
      a4EngFontSize: '',
      a5EngFontSize: '',
    },
  })

  const formSubmitHandler = (data: LetterSettingsFormFields) => {
  }

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 z-10 w-full backdrop-blur-[2px] h-full'>
        <div
          className='bg-gray-700 opacity-25 h-screen w-full absolute top-0 left-0 z-20'
          onClick={onClose}
        />
        <m.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className='w-2/5 max-lg:w-4/5 max-2xl:w-3/5 mt-4 m-auto shadow-md rounded-md border-cyan-800 border-2 z-30 bg-white relative overflow-hidden'>
          <h2 className='bg-cyan-800 text-cyan-50 py-3 px-5 font-semibold text-xl'>
            Letter Settings
          </h2>

          <form
            className='p-5 flex flex-col'
            noValidate
            onSubmit={handleSubmit(formSubmitHandler)}>
            <h3 className='bg-gray-100 py-2 text-lg px-3'>Font settings</h3>

            <div className='flex flex-col gap-4 w-full mt-4'>
              <LetterSettingsInputField
                error={errors}
                id='a4EngFontSize'
                register={register}
                title='a4 english font size'
                unit='px'
              />
              <Line />

              <LetterSettingsInputField
                error={errors}
                id='a5EngFontSize'
                register={register}
                title='a5 english font size'
                unit='px'
              />
            </div>

            <h3 className='bg-gray-100 py-2 text-lg px-3 mt-3'>
              A4 Page settings
            </h3>

            <div className='flex flex-col gap-4 w-full mt-4'>
              <LetterSettingsInputField
                error={errors}
                id='a4PageWidth'
                register={register}
                title='a4 page width'
                unit='inch'
              />
              <Line />

              <LetterSettingsInputField
                error={errors}
                id='a4PageHeight'
                register={register}
                title='a4 page height'
                unit='inch'
              />
            </div>

            <h3 className='bg-gray-100 py-2 text-lg px-3 mt-3'>
              A5 Page settings &nbsp;
            </h3>

            <div className='flex flex-col gap-4 w-full mt-4'>
              <LetterSettingsInputField
                error={errors}
                id='a5PageWidth'
                register={register}
                title='a5 page width'
                unit='inch'
              />
              <Line />

              <LetterSettingsInputField
                error={errors}
                id='a5PageHeight'
                register={register}
                title='a5 page height'
                unit='inch'
              />

              <div className='flex items-center px-3'>
                <p>a4 page margins (in inches)</p>
              </div>
            </div>

            <div className='h-[1px] bg-gray-200 w-full my-5' />

            <div className='self-end flex gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='py-2 px-4 uppercase text-white bg-cyan-500 text-sm rounded-md'>
                close
              </button>
              <button
                type='submit'
                className='py-2 px-4 uppercase text-white bg-cyan-700 text-sm rounded-md'>
                save
              </button>
            </div>
          </form>
        </m.div>
      </m.div>
    </>
  )
}

const Line = () => <div className='h-[1px] bg-gray-200 w-full' />
