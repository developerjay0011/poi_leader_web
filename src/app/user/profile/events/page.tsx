import { EventPage } from '@/components/leader/pages/EventPage'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { FC } from 'react'

const AdminProfileEventsPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
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
