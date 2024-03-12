"use client";
import { ProfileShortcutsBox } from "@/components/timlineComponents/ProfileShortcutsBox";
import { AgendaPage } from "@/components/leader/pages/AgendaPage";

const AdminAgendaPage = () => {
  return (
    <section className='flex gap-5'>
      <ProfileShortcutsBox />
      <section className="flex-1">
        <AgendaPage />
      </section>
    </section>);
};

export default AdminAgendaPage;
