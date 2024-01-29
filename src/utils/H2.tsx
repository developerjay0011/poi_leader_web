import { FC, ReactNode } from 'react'

interface H2Props {
  title: string
  children: ReactNode
}

export const H2: FC<H2Props> = ({ children, title }) => {
  return (
    <>
      <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize'>
        {title}

        <span className='block ml-auto'>{children}</span>
      </h2>
    </>
  )
}
