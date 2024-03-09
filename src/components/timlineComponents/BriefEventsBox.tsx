import { cusSelector } from '@/redux_store/cusHooks';
import { FC } from 'react'

interface BriefEventsBoxProps { }
export const BriefEventsBox: FC<BriefEventsBoxProps> = () => {
  const { dashboardevents } = cusSelector((state) => state.event);

  // console.log(dashboardevents)
  return dashboardevents?.length > 0 && (
    <>
      <section className={`border rounded-md w-full bg-white text-sky-950 max-h-[25rem] overflow-hidden flex flex-col`}>
        <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize'>
          Events
        </h2>
        <ul className='flex flex-col gap-3 p-4 max-h-[400px] overflow-x-visible overflow-y-scroll main_scrollbar'>
          {dashboardevents?.map((item: any, index: number) =>
            <li key={index} className={`rounded-md border-l-2 border-orange-500 flex flex-col p-4 bg-white shadow gap-3 event_transition`}>
              <h4 className='capitalize text-xl'>{item?.title}</h4>
              {/* <p className='text-sm text_wrap'>{item?.location}</p> */}
              <div className='flex gap-3 flex-col'>
                <p className='text-sm text_wrap'>{item?.description}</p>
              </div>
            </li>

          )}
        </ul>
      </section>
    </>
  )
}
