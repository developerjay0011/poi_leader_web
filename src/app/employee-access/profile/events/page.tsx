import { EventPage } from '@/components/leader/pages/EventPage'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { FC } from 'react'

const AdminProfileEventsPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
        <ProfileShortcutsBox />
        <section className="flex-1">
          <EventPage />
        </section>
      </section>
    </>
  )
}

export default AdminProfileEventsPage
