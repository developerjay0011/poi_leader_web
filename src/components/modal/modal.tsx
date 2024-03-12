import { FC, ReactNode } from 'react'
import { AnimatePresence, motion as m } from 'framer-motion'
import { BiX } from 'react-icons/bi'
interface ManageTemplateFormProps {
    onClose: () => void
    children: ReactNode
    heading: string
}

export const Modal: FC<ManageTemplateFormProps> = ({ onClose, children, heading }) => {

    return (
        <AnimatePresence mode="wait">
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed top-0 left-0 w-full h-[100dvh] z-10 '>
                <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center main_scrollbar`}>
                    <m.section
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='absolute top-3 right-3 z-40'>
                            <BiX className='text-3xl' />
                        </button>
                        <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                            {heading}
                        </h3>
                        {children}
                    </m.section>
                </div>
            </m.div>
        </AnimatePresence>
    )
}
