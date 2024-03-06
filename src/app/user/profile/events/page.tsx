import { DirectoryPage } from '@/components/leader/pages/DirectoryPage'
import { EventPage } from '@/components/leader/pages/EventPage'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { FC } from 'react'

const AdminProfileEventsPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
        {/* <div className='w-max' >
          <ShortcutsBox />
        </div> */}
        <ProfileShortcutsBox />
        <section className='flex-grow bg-white border rounded-md self-start'>
          <div className='flex-grow self-start'>
            <EventPage />
          </div>
        </section>
      </section>
    </>
  )
}

export default AdminProfileEventsPage
