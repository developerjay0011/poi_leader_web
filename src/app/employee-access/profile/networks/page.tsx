'use client'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { NetworksPage } from '@/components/leader/pages/NetworksPage'
const AdminProfileNetworksPage = () => {
  return (
    <div className="flex gap-5 w-full">
      <ProfileShortcutsBox />
      <section className="flex-1">
        <NetworksPage />
      </section>
    </div>
  )
}

export default AdminProfileNetworksPage
