import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { FC } from 'react'

const AdminProfileEventsPage: FC = () => {
  return (
    <>
      <section className='flex gap-5'>
        <div className='w-max'>
          <ShortcutsBox />
        </div>

        <section className='flex-grow bg-white border rounded-md self-start'>
          <section className='flex justify-between flex-col'>
            <div className='flex justify-between'>
              <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize'>
                Events
              </h2>
            </div>

            <div className='w-[96%] h-[1px] bg-zinc-200 m-auto' />
          </section>
        </section>
      </section>
    </>
  )
}

export default AdminProfileEventsPage
