import { FC } from 'react'

interface WebsiteInfoBoxProps {
  dataCount: number
  title: string
  icon: JSX.Element
}

export const WebsiteInfoBox: FC<WebsiteInfoBoxProps> = ({
  dataCount,
  title,
  icon,
}) => {
  return (
    <article className='flex flex-col gap-2 items-center'>
      {icon}
      <h4 className='font-semibold text-md capitalize'>{title}</h4>
      <p className='text-5xl font-[300]'>{dataCount}</p>
    </article>
  )
}
