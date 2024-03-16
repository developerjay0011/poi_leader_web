import { FC, useRef } from 'react'
import { motion as m } from 'framer-motion'
import ReactToPrint from 'react-to-print'


interface PDFPreviewCPProps {
  onClose: () => void
  letter_html: any
}

export const PDFPreviewLeader: FC<PDFPreviewCPProps> = ({
  onClose,
  letter_html
  
}) => {

  const letterDiv = useRef<HTMLDivElement>(null)

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
            <div  className='flex flex-col w-full h-full overflow-hidden gap-[1cm] p-[1cm]'>
              <div className='letter_preview bg-white p-10' ref={letterDiv}>
                <div dangerouslySetInnerHTML={{ __html: letter_html }} />
              </div>
              </div>
            {/* PDF Preview */}
       

            {/* CTA's */}
            <div className='flex items-center gap-3 justify-end px-3 border-t py-4'>
              <button
                type='button'
                onClick={onClose}
                className='rounded-full capitalize px-6 py-2 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-orange-50 font-[500]'>
                Close
              </button>

              <ReactToPrint
                trigger={() => (
                  <button
                    type='button'
                    className='rounded-full capitalize px-6 py-2 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-orange-50 font-[500]'>
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
