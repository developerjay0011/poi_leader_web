import { DirectoryPage } from '@/components/leader/pages/DirectoryPage'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { FC } from 'react'

const Page: FC = () => {
  return (
    <section className='flex gap-5'>
      <ProfileShortcutsBox />
      <section className="flex-1">
        <DirectoryPage />
      </section>
    </section>
  )
}

export default Page
