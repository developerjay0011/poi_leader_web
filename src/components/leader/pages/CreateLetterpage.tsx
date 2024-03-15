'use client'
import { FC, useRef, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import { useForm, useFieldArray, set } from 'react-hook-form'
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
import { useSearchParams } from 'next/navigation'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { getImageUrl } from '@/config/get-image-url'
const Editor = dynamic(() => import('../../../components/leader/forms/Editor'), {
    ssr: false
})
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
    const { register, formState: { errors }, handleSubmit, setValue, getValues, watch, control, } = useForm<LetterFormFields>({ defaultValues: { language: 'english' }, })
    const { leaderOptions } = cusSelector((state) => state.common);
    const { letter_templete } = cusSelector((state) => state.letter);
    const { filestype } = cusSelector((state) => state.file);
    const { leaderProfile } = cusSelector((state) => state.leader);

    const [letterData, setLeaderData] = useState<any>();
    const [letterFormat, setLetterFormat] = useState("");
    const { userDetails, }:any = cusSelector((state) => state.auth);
    const { usertype, } = cusSelector((state) => state.access);
    const { ticket } = cusSelector((state) => state.ticket);
    const searchParams = useSearchParams();
    const ticket_id = searchParams.get('id') as string
    const ticket_data = ticket_id && ticket?.length > 0 ? ticket?.find((item: any) => item?.ticketid == ticket_id) : null
    const dispatch = cusDispatch();
    const letterRef = useRef<HTMLDivElement>(null)
    const { fields, append, remove } = useFieldArray({ name: 'attachments', control, })
    const formSubmitHandler = (data: LetterFormFields) => {
        setLeaderData(data)
        let lettertype = filestype?.find((el: any) => el.id == data?.fileNo)
        let fileno = lettertype?.file_name + "-" + lettertype?.file_number + "(" + data?.idNo + ")"
        let todata = lettertype?.to?.find((el: any) => el.ministryid == data?.to)
        console.log(lettertype?.to)
        let to = `${todata?.name}\n${todata?.ministry_name}(${todata?.designation})`
        var letter_format = (letter_templete.find((item) => item?.id == data?.letterType)?.template_html || "")
        var letter_formats = letter_format?.replaceAll("${FILENUMBER}", fileno)?.replaceAll("${DATE}", data?.date)?.replaceAll("${LOCATION}", data?.location)?.replaceAll("${TO}", to)?.replaceAll("${FROM}", data?.from)?.replaceAll("${PHONE}", data?.contactNo)?.replaceAll("${IDNO}", data?.idNo)?.replaceAll("${IMAGE}", "https://www.fillhq.com/wp-content/uploads/2021/08/autodraw-11_2_2022.png")
        setLetterFormat(letter_formats)
    }
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

    useEffect(() => {
        (async () => {
            if (ticket_id) {
                setValue("ticketId", ticket_id)
                setValue("date", moment().format("YYYY-MM-DD"))
            }
        })();
    }, [ticket_id, ticket?.length]);


        const temp = `<div style=" width:20cm; margin: 20px 20px 20px 20px;height: 29.7cm;   justify-content: 'center';align-items: 'center';">
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${ticket_data?.category == "request" ? `req-` : 'comp no-' + ticket_data?.ticket_code}&nbsp;</span></strong></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Date : ${moment(ticket_data?.created_date).format('DD/MM/YYYY')}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>To&nbsp;</strong></span></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>${userDetails?.name}&nbsp;</strong></span></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>${leaderProfile?.leadertype == "leader" ? leaderProfile?.political_info?.designation : leaderProfile?.political_info?.post_in_party}&nbsp;</strong></span></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Subject: ${ticket_data?.subject}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Dear Sir/Ma'am,</span></strong></p>

    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${ticket_data?.description}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><br></p>
    <p style="text-align: right;"><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Your Sincerely,</span></strong></p>
    <p><img src="signature (2).png" alt="" width="300"></p>
    <p dir="ltr" style="line-height: 1.8; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt; padding: 0pt 0pt 3pt; text-align: right;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><img src="${getImageUrl(ticket_data?.signature)}" alt="" width="138" style="float: right;" height="92"></strong></p>
    <p><br></p>

    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;"><br></span></strong></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;"><br></span></strong></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${ticket_data?.citizen_detail?.citizen_name}&nbsp;</span></strong></p>
    <p style="text-align: right;">${ticket_data?.citizen_detail?.citizen_address}&nbsp;</p>
    <p style="text-align: right;">${ticket_data?.citizen_detail?.citizen_state}&nbsp;</p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>

</div>`

    return usertype && (
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
                        <section className='py-0 px-6 flex flex-col gap-6 '>
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
                                ticketdata={ticket_data}
                            />
                        </section>

                        {/* LETTER PREVIEW */}
                        <section className='flex flex-col gap-10'>
                            {/* LETTER PREVIEW BOX */}
                            <div className='letter_template min-h-[1122px] border border-cyan-600 shadow-inner flex justify-center items-center   '>
                                {/* LETTER */}

                                <Editor
                                    className='h-full w-full'
                                    value={letterFormat}
                                    onChange={(val: any) => setLetterFormat(val)}
                                />
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
                    <div className='flex flex-row'>
                        {
                            letterFormat &&
                            <div className='min-h-[1122px] border border-cyan-600 shadow-inner flex justify-center items-center w-[50%]  '>
                                <div className='letter_template  p-10' ref={letterRef}>
                                    <div dangerouslySetInnerHTML={{ __html: letterFormat }} />
                                </div>
                            </div>
                        }
                    
                    <div className='min-h-[1122px] border border-cyan-600 shadow-inner flex   '>
                        <div className='letter_template w-[50%] p-10' >
                                <div dangerouslySetInnerHTML={{ __html: temp }} />
                        </div>
                        </div>
                    </div>
                    
                </form>
            </m.section>
        </>
    )
}

