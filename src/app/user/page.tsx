import { BriefProfileInfoBox } from '@/components/timlineComponents/BriefProfileInfoBox'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { TrendingUsers } from '@/components/timlineComponents/TrendingUsers'
import { TimeLinePage } from '@/components/posts/TimeLinePage'
import { BriefEventsBox } from '@/components/timlineComponents/BriefEventsBox'
import { BirthdayNotifications } from '@/components/timlineComponents/BirthdayNotifications'

const AdminHomePage = () => {
  return (
    <>
      <section className='m-auto my-10 w-[75%] relative main_scrollbar max-[1770px]:w-[80%] max-[1570px]:w-[88%] max-[1440px]:w-[95%] max-[1200px]:w-[85%] max-[1000px]:w-[88%] max-md:w-[90%] max-sm:w-[93%] max-sm:my-5'>
        <div className='flex gap-5'>
          {/* LEFT FEED */}
          <div className='flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]'>
            <BirthdayNotifications />
            <TrendingUsers />

            <BriefEventsBox />
          </div>

          <TimeLinePage />

          {/* RIGHT FEED */}
          <div className='w-max flex flex-col self-start gap-5 max-[1200px]:hidden'>
            <BriefProfileInfoBox />
            <ShortcutsBox />
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminHomePage
