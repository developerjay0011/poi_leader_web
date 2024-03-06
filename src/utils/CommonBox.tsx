import { FC, ReactNode } from 'react'

interface CommonBoxProps {
  title: string
  children: ReactNode
  width?: string
  cusJSX?: JSX.Element[]
  style?: any
}
export const CommonBox: FC<CommonBoxProps> = ({
  title,
  children,
  width,
  cusJSX,
  style = {}
}) => {
  return (
    <>
      <section className={`border rounded-md ${width} bg-white text-sky-950`} style={style}>
        <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize'>
          {title}

          <span className='block ml-auto'>{cusJSX}</span>
        </h2>

        <div className='px-6 w-full overflow-auto'>{children}</div>
      </section>
    </>
  )
}
