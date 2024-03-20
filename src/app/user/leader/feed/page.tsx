'use client'
import { LeaderTimeLinePage } from '@/components/otherleader/TimeLinePage'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { FC } from 'react'

const CitizenProfileFeedPage: FC = () => {
  return (
    <section className='w-full relative'>
      <div className='flex gap-5'>
        {/* LEFT FEED */}
        <div className='flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]'>
          <ShortcutsBox />
        </div>
        <LeaderTimeLinePage />
      </div>
    </section>
  )
}

export default CitizenProfileFeedPage
