'use client'
import { cusSelector } from '@/redux_store/cusHooks'
import Image from 'next/image'
import { FC, FormEvent, useState } from 'react'
import { BiRightArrow } from 'react-icons/bi'

interface NewCommentFormProps {
  CommentHandler: (comment: string) => void
}

export const NewCommentForm: FC<NewCommentFormProps> = ({ CommentHandler }) => {
  const { userDetails } = cusSelector((st) => st.UI)
  const [commentText, setCommentText] = useState('')

  const addNewCommentHandler = (e: FormEvent) => {
    e.preventDefault()

    if (commentText.length === 0) return

    CommentHandler(commentText)

    setCommentText('')
  }

  return (
    <>
      <form
        className='flex items-start py-4 gap-5 mt-2 mb-1 relative max-[400px]:gap-3'
        onSubmit={addNewCommentHandler}>
        <Image
          alt='user dp'
          src={userDetails?.displayPic as string}
          width={1000}
          height={1000}
          className='w-10 aspect-square rounded-full object-center object-cover'
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={5}
          placeholder='share your thoughts'
          className='bg-zinc-100 p-3 outline-none flex-1 resize-none rounded-md placeholder:capitalize'></textarea>

        <button type='submit' className='absolute top-10 right-2'>
          <BiRightArrow />
        </button>
      </form>
    </>
  )
}
