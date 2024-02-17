import { MediaPost } from '@/utils/typesUtils'
import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { FullPost } from './FullPost'
import CustomImage from '@/utils/CustomImage'

export const MoreThan4ColumnImgLayout: FC<{
  onClick: () => void
  media: MediaPost[]
  showFullPost: boolean
  hidePost: () => void
  postId: string
  userId: string
}> = ({ onClick, media, hidePost, showFullPost, postId, userId }) => {
  return (
    <>
      <figure
        className='w-full relative grid grid-cols-2 gap-1'
        onClick={onClick}>
        {media.map((el, i) => {
          if (i < 3) {
            if (el.type === 'image')
              return (
                <CustomImage
                  key={el.id}
                  src={el.media}
                  width={1000}
                  height={1000}
                  alt='user post'
                  className='object-cover object-center w-full h-full'
                />
              )

            if (el.type === 'video')
              return (
                <video
                  key={el.id}
                  src={el.media}
                  className='object-cover object-center w-full h-full'
                  controls
                />
              )
          }

          if (i === 3)
            return (
              <div className='relative' key={el.id}>
                <CustomImage
                  src={el.media}
                  width={1000}
                  height={1000}
                  alt='user post'
                  className='object-cover object-center w-full h-full'
                />
                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-black bg-opacity-40'>
                  <h5 className='font-semibold text-4xl'>
                    +{media.length - 4}
                  </h5>
                </div>
              </div>
            )
        })}
      </figure>

      <AnimatePresence>
        {showFullPost && (
          <FullPost
            onClose={hidePost}
            posts={media}
            postId={postId}
            userId={userId}
          />
        )}
      </AnimatePresence>
    </>
  )
}
