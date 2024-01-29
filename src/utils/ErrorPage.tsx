import Link from 'next/link'
import { FC } from 'react'

interface ErrorPageProps {
  title: string
  redirectLink: string
  redirectText: string
}
export const ErrorPage: FC<ErrorPageProps> = ({
  redirectLink,
  redirectText,
  title,
}) => {
  return (
    <>
      <section className='w-full h-[100dvh] bg-cyan-50 flex items-center justify-center'>
        <div className='flex flex-col gap-3 items-center text-cyan-800'>
          <h1 className='text-8xl font-[300]' style={{ letterSpacing: '2px' }}>
            OOPS<span style={{ letterSpacing: '0' }}>!!!</span>
          </h1>
          <p className='text-md uppercase font-normal'>{title}</p>
          <Link
            href={redirectLink}
            className='text-xl uppercase font-semibold underline mt-10'>
            {redirectText}
          </Link>
        </div>
      </section>
    </>
  )
}
