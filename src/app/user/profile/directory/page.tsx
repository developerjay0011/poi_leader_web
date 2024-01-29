import { DirectoryPage } from '@/components/leader/pages/DirectoryPage'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { FC } from 'react'

const Page: FC = () => {
  return (
    <section className='flex gap-5'>
      <div className='self-start max-[800px]:hidden'>
        <ShortcutsBox />
      </div>

      <div className='flex-grow self-start'>
        <DirectoryPage />
      </div>
    </section>
  )
}

export default Page
