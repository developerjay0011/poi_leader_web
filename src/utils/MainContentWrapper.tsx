import { FC, ReactNode } from 'react'

interface MainContentWrapperProps {
  children: ReactNode
}

export const MainContentWrapper: FC<MainContentWrapperProps> = ({
  children,
}) => {
  return (
    <>
      <section className='m-auto my-10 w-[70%] overflow-y-scroll main_scrollbar'>
        {children}
      </section>
    </>
  )
}
