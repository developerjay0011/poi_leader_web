import { EventPage } from '@/components/leader/pages/EventPage'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { FC } from 'react'

const AdminProfileEventsPage: FC = () => {
  return (
    <>
      <section className="flex-1">
        <EventPage />
      </section>
    </>
  )
}

export default AdminProfileEventsPage
