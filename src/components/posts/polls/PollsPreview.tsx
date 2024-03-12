import { cusSelector } from '@/redux_store/cusHooks'
import { FC } from 'react'
import { PollOption } from './PollOption'
import { NewPollsFormFields } from '@/components/leader/forms/ManagePollsForm'
import { dateConverter } from '@/utils/utility'
import CustomImage from '@/utils/CustomImage'
import { getImageUrl, setusername } from '@/config/get-image-url'
import { Modal } from '@/components/modal/modal'

interface PollsPreviewProps {
  pollDetails: NewPollsFormFields
  onClose: () => void
}

export const PollsPreview: FC<PollsPreviewProps> = ({ onClose, pollDetails, }) => {
  const { userDetails } = cusSelector((st) => st.auth)
  const { leaderProfile } = cusSelector((st) => st.leader)
  return (
    <Modal heading={''} onClose={onClose}>
      <section className='border shadow-sm rounded-md px-5 py-2 bg-white w-full max-[650px]:w-[80%] self-center'>
        <div className='flex items-center gap-3 py-4 text-sky-950 border-b'>
          <CustomImage
            src={getImageUrl(userDetails?.image)}
            alt='user pic'
            className='w-12 aspect-square object-cover object-center rounded-full'
            width={100}
            height={100}
          />

          {/* Info and date of publish */}
          <div>
            <h4 className='font-[600] text-lg text-orange-500'>
              {setusername(leaderProfile)}
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
    </Modal>
  )
}
