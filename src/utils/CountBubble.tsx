import { FC } from 'react'

interface CountBubbleProps {
  count: number
  bgColor: string
  textColor: string
}

export const CountBubble: FC<CountBubbleProps> = ({
  bgColor,
  count,
  textColor,
}) => {
  return (
    <>
      <p
        className={`w-[17px] aspect-square rounded-full flex items-center justify-center text-[10px] ${textColor} ${bgColor} `}>
        <span>{count}</span>
      </p>
    </>
  )
}
