import { FC, useEffect, useRef, useState } from 'react'
import { motion as m } from 'framer-motion'
import { cusSelector } from '@/redux_store/cusHooks'
import ReactToPrint from 'react-to-print'
import { getImageUrl } from '@/config/get-image-url'
import moment from 'moment'


interface PDFPreviewCPProps {
  onClose: () => void
  heading: string
  to: any
  subject: string
  description: string
  signature: string
  attachments: number
  letterdetails: any
}

export const PDFPreviewCP: FC<PDFPreviewCPProps> = ({
  onClose,
  heading,
  description,
  subject,
  to,
  signature,
  attachments,
  letterdetails

}) => {
  const { userDetails }: any = cusSelector((st) => st.auth)
  const { leaderProfile }: any = cusSelector((st) => st.leader)
  const letterDiv = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState('')
  useEffect(() => {
    const temp = `<div style=" width:20cm; margin: 20px 20px 20px 20px;height: 29.7cm;   justify-content: 'center';align-items: 'center';">
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${letterdetails?.category == "request" ? `req-` : 'comp no-' + letterdetails?.ticket_code}&nbsp;</span></strong></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Date : ${moment(letterdetails?.created_date).format('DD/MM/YYYY')}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>To&nbsp;</strong></span></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>${userDetails.name}&nbsp;</strong></span></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>${leaderProfile?.leadertype == "leader" ? leaderProfile?.political_info?.designation : leaderProfile?.political_info?.post_in_party}&nbsp;</strong></span></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Subject: ${subject}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Dear Sir/Ma'am,</span></strong></p>

    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${description}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><br></p>
    <p style="text-align: right;"><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Your Sincerely,</span></strong></p>

    <p><img src="signature (2).png" alt="" width="300"></p>
    ${signature ? `<div dir="ltr" style="background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt; text-align: right;display:flex;align-self:flex-end">
    <img src="${getImageUrl(signature)}" alt="" width="138" style="margin-left: auto; margin-right: 0; display:flex;align-self:flex-end">
</div>` : ""} 
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${letterdetails?.citizen_detail?.citizen_name}&nbsp;</span></strong></p>
    <p style="text-align: right;">${letterdetails?.citizen_detail?.citizen_address}&nbsp;</p>
    ${letterdetails?.citizen_detail?.citizen_state ? `<p style="text-align: right;">${letterdetails?.citizen_detail?.citizen_state}&nbsp;</p>` : ""}
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>

</div>`




    setContent(temp)
  }, [])
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 flex items-center z-[200] justify-center w-full h-[100dvh]'>
        <section className='absolute top-0 left-0 z-[205] main_scrollbar w-full h-full flex justify-center py-5 bg-black bg-opacity-30 backdrop-blur-[4px]'>
          <m.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='bg-white relative h-max flex flex-col gap-5'>
            {/* <div className='flex justify-between items-start'>
              <h4 className='text-3xl font-semibold'>{heading} Preview</h4>

              <button type='button' onClick={onClose}>
                <BiX className='text-4xl' />
              </button>
            </div> */}
            <div className='flex flex-col w-full h-full overflow-hidden gap-[1cm] p-[1cm]'>
              <div className='letter_preview bg-white' ref={letterDiv}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
            {/* PDF Preview */}


            {/* CTA's */}
            <div className='flex items-center gap-3 justify-end px-3 border-t py-4'>
              <button
                type='button'
                onClick={onClose}
                className='rounded capitalize px-6 py-2 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-orange-50 font-[500]'>
                Close
              </button>

              <ReactToPrint
                trigger={() => (
                  <button
                    type='button'
                    className='rounded capitalize px-6 py-2 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-orange-50 font-[500]'>
                    print
                  </button>
                )}
                content={() => letterDiv.current}
              />
            </div>
          </m.div>
        </section>
      </m.div>
    </>
  )
}
