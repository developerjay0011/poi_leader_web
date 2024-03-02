'use client'
import { FC, useRef, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { LetterForm } from '../../../../components/leader/forms/LetterForm'
import ReactToPrint from 'react-to-print'
import { BiRightArrowAlt } from 'react-icons/bi'
import { ConnectToAPI } from '@/utils/utility'
import { cusSelector } from '@/redux_store/cusHooks'

export interface LetterFormFields {
  location: string
  letterType: string
  language: string
  date: string
  idNo: string
  fileNo: string
  from: string
  to: string
  subject: string
  reference: string
  contactNo: string
  envelopeType: string
  attachments: { attachment: string }[]
}

const AddLetterPage: FC = () => {
  const [stateList, setStateList] = useState<
    { stateId: string; stateName: string }[]
  >([])
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
  } = useForm<LetterFormFields>({
    defaultValues: { language: 'english', idNo: '12324' },
  })
  const { leaderOptions } = cusSelector((state) => state.common);
  const { letter_templete } = cusSelector((state) => state.letter);
  const [templateID, setTemplateID] = useState<any>();
  const [letterFormat, setLetterFormat] = useState("");


  const formSubmitHandler = (data: LetterFormFields) => {
    console.log(data)
    setTemplateID(data?.letterType)
    var letter_format =( letter_templete.find((item) => item?.id == data?.letterType)?.template_html || "")
    var letter_formats = letter_format?.replaceAll("${FILENUMBER}", data?.fileNo).replaceAll("${DATE}", data?.date).replaceAll("${TO}", data?.to).replaceAll("${FROM}", data?.from).replaceAll("${PHONE}", data?.contactNo).replaceAll("${IMAGE}", "https://www.fillhq.com/wp-content/uploads/2021/08/autodraw-11_2_2022.png")
    
    setLetterFormat(letter_formats)

  }

  const { fields, append, remove } = useFieldArray({
    name: 'attachments',  
    control,
  })

  const letterRef = useRef<HTMLDivElement>(null) // for letter output



  return (
    <>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeIn' }}
        className='w-[96%] m-auto my-8 border border-gray-300 bg-white rounded-md shadow-md overflow-hidden flex flex-col gap-8'>
        {/* LETTER Form header */}
        <h1 className='bg-cyan-950 text-cyan-50 w-full py-5 px-8 font-bold text-3xl'>
          Create a New Letter
        </h1>

        <form noValidate onSubmit={handleSubmit(formSubmitHandler)}>
          <div className='grid grid-cols-2 gap-5 relative p-5'>
            {/* PREVIEW BTN */}
            <button
              type='submit'
              className='bg-cyan-500 py-2 z-10 uppercase flex items-center gap-2 text-white pl-5 pr-3 rounded-md absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md'>
              Preview <BiRightArrowAlt className='text-2xl' />
            </button>

            {/* LETTER FORM */}
            <section className='py-0 px-6 flex flex-col gap-6'>
              <LetterForm
                errors={errors}
                register={register}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                states={leaderOptions?.states}
                appendField={append}
                removeField={remove}
                attachments={fields}
              />
            </section>

            {/* LETTER PREVIEW */}
            <section className='flex flex-col gap-10'>
              {/* LETTER PREVIEW BOX */}
              <div className='min-h-[1122px] border border-cyan-600 shadow-inner flex justify-center items-center   '>
                {/* LETTER */}
                <div className='letter_template p-10' ref={letterRef}>
                  <div dangerouslySetInnerHTML={{ __html: letterFormat }} />
                </div>
              </div>

              {/* LETTER PREVIEW CTA's */}
              <div className='flex gap-2 items-center'>
                <ReactToPrint
                  trigger={() => (
                    <button
                      type='button'
                      className=' bg-cyan-700 py-[.4rem] z-10 capitalize text-white px-5 rounded-md shadow-md flex gap-2  items-center'>
                      <i className='fa fa-print text-xl' /> Print & Save
                    </button>
                  )}
                  content={() => letterRef.current}
                  onBeforeGetContent={() => {
                    letterRef.current?.classList.add('letter_print')
                    letterRef.current?.classList.remove('letter_template')
                  }}
                  onAfterPrint={() => {
                    letterRef.current?.classList.remove('letter_print')
                    letterRef.current?.classList.add('letter_template')
                  }}
                />
              </div>
            </section>
          </div>
        </form>
      </m.section>
    </>
  )
}

export default AddLetterPage
