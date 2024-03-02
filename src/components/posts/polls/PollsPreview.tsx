import { cusSelector } from '@/redux_store/cusHooks'
import { FC } from 'react'
import { PollOption } from './PollOption'
import { motion as m } from 'framer-motion'
import { NewPollsFormFields } from '@/components/leader/forms/ManagePollsForm'
import { dateConverter } from '@/utils/utility'
import CustomImage from '@/utils/CustomImage'

interface PollsPreviewProps {
  pollDetails: NewPollsFormFields
  onClose: () => void
}

export const PollsPreview: FC<PollsPreviewProps> = ({
  onClose,
  pollDetails,
}) => {
  const { userDetails } = cusSelector((st) => st.UI)

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-10 '>
        <div
          className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center ${
            pollDetails.imgOptions.length > 4 || pollDetails.poll_options.length > 4
              ? 'max-[650px]:py-5'
              : ''
          }`}>
          <section className='border shadow-sm rounded-md px-5 py-2 bg-white w-1/2 max-[650px]:w-[80%] self-center'>
            <div className='flex items-center gap-3 py-4 text-sky-950 border-b'>
              <CustomImage
                src={userDetails?.image as string}
                alt='user pic'
                className='w-12 aspect-square object-cover object-center rounded-full'
                width={100}
                height={100}
              />

              {/* Info and date of publish */}
              <div>
                <h4 className='font-[600] text-lg text-orange-500'>
                  {userDetails?.username}
                </h4>
                <p className='flex items-center capitalize gap-2 text-sm font-[500]'>
                  <span>{dateConverter(pollDetails.publishDate)}</span>
                </p>
              </div>
            </div>

            <div className='flex flex-col gap-5 my-5'>
              {/* TEXT POST */}
              <p className='text-[16px]'>{pollDetails.title}</p>

              <p className='font-medium text-zinc-600'>{pollDetails?.votes_by?.length} votes</p>

              {/* MEDIA */}
              <section className='w-full flex flex-col gap-3'>
                {pollDetails.pollType === 'image' &&
                  pollDetails.imgOptions.map((el, i) => (
                    <PollOption
                      id={el.id}
                      index={i + 1}
                      pollText={el.text}
                      key={el.id}
                      pollImg={el.image}
                    />
                  ))}

                {pollDetails.pollType === 'text' &&
                  pollDetails.poll_options.map((el, i) => (
                    <PollOption
                      id={el.id}
                      index={i + 1}
                      pollText={el.text}
                      key={el.id}
                    />
                  ))}
              </section>
            </div>

            <button
              onClick={onClose}
              className='py-2 px-5 mb-2 rounded-full capitalize border border-orange-500 text-orange-500 bg-orange-100 hover:bg-orange-500 hover:text-orange-50'
              type='button'>
              close
            </button>
          </section>
        </div>
      </m.div>
    </>
  )
}
