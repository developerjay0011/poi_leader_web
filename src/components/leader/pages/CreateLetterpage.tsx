'use client'
import { FC, useRef, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import ReactToPrint from 'react-to-print'
import { BiRightArrowAlt } from 'react-icons/bi'
import { ConnectToAPI, GenerateId } from '@/utils/utility'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import toast from 'react-hot-toast'
import { getLetters, saveLetter } from '@/redux_store/letter/letterApi'
import { letterActions } from '@/redux_store/letter/letterSlice'
import { commonActions } from '@/redux_store/common/commonSlice'
import { Savedby, ToastType } from '@/constants/common'
import { getTickets } from '@/redux_store/ticket/ticketApi'
import { ticketActions } from '@/redux_store/ticket/ticketSlice'
import { LetterForm } from '../forms/LetterForm'

export interface LetterFormFields {
    location: string
    letterType: string
    ticketId: string
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

export const CreateLetterpage: FC = () => {
    const [stateList, setStateList] = useState<{ stateId: string; stateName: string }[]>([])
    const { register, formState: { errors }, handleSubmit, setValue, getValues, watch, control, } = useForm<LetterFormFields>({ defaultValues: { language: 'english' }, })
    const { leaderOptions } = cusSelector((state) => state.common);
    const { letter_templete } = cusSelector((state) => state.letter);
    const [letterData, setLeaderData] = useState<any>();
    const [letterFormat, setLetterFormat] = useState("");
    const { userDetails } = cusSelector((state) => state.auth);


    const formSubmitHandler = (data: LetterFormFields) => {
        setLeaderData(data)
        var letter_format = (letter_templete.find((item) => item?.id == data?.letterType)?.template_html || "")
        var letter_formats = letter_format?.replaceAll("${FILENUMBER}", data?.fileNo)?.replaceAll("${DATE}", data?.date)?.replaceAll("${LOCATION}", data?.location)?.replaceAll("${TO}", data?.to)?.replaceAll("${FROM}", data?.from)?.replaceAll("${PHONE}", data?.contactNo)?.replaceAll("${IDNO}", data?.idNo)?.replaceAll("${IMAGE}", "https://www.fillhq.com/wp-content/uploads/2021/08/autodraw-11_2_2022.png")
        setLetterFormat(letter_formats)
    }

    const { fields, append, remove } = useFieldArray({
        name: 'attachments',
        control,
    })

    const letterRef = useRef<HTMLDivElement>(null) // for letter output
    const { ticket } = cusSelector((state) => state.ticket);

    const dispatch = cusDispatch();

    const handleAdd = async () => {
        if (letterFormat == "") {
            toast.error("please press preview frist")
        } else {
            const ticketData = ticket.find((item) => item.ticketid == letterData?.ticketId)
            const body = {
                leaderid: userDetails?.leaderId || "",
                template_id: letterData?.letterType,
                letter_no: GenerateId(),
                location: letterData?.location,
                language: letterData?.language,
                date: letterData?.date,
                category: ticketData?.category,
                ticket_code: ticketData?.ticket_code,
                id_number: letterData?.idNo,
                file_number: letterData?.fileNo,
                from: letterData?.from,
                to: letterData?.to,
                reference: letterData?.reference,
                contact_no: letterData?.contactNo.toString(),
                envelope_type: letterData?.envelopeType,
                letter_html: letterFormat,
                isactive: true,
                ...Savedby()
            };
            const response = await saveLetter(body);
            if (response?.success) {
                const Data = await getLetters(userDetails?.leaderId as string);
                dispatch(letterActions.storeLetterTemplate(Data))
                dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
                window.location.href = '/user/letter/manage-letter'
            } else {
                dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
            }
        }
    }

    const getTicket = async () => {
        const data = await getTickets(userDetails?.leaderId as string);
        dispatch(ticketActions.storeTicket(data));
    };
    useEffect(() => {
        (async () => {
            getTicket();
        })();
    }, [userDetails?.leaderId, dispatch]);
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
                                <button
                                    onClick={() => { handleAdd() }}
                                    type='button'
                                    className=' bg-cyan-700 py-[.4rem] z-10 capitalize text-white px-5 rounded-md shadow-md flex gap-2  items-center'>
                                    <i className='fa fa-print text-xl' /> Add
                                </button>
                            </div>
                        </section>
                    </div>
                </form>
            </m.section>
        </>
    )
}

