'use client'
import { FC } from 'react'
import { cusSelector } from '@/redux_store/cusHooks'


export const Rejectedfrom: FC = () => {
  const { reasons } = cusSelector((state) => state.leader)
  return (
    <>
      <div className='grid grid-cols-0 gap-x-2 gap-y-2'>

        <h2 className='text-1xl font-semibold col-span-full mb-2 flex gap-2 '>
          Application Status :<h2 className='text-red-600'>   {" "} Rejected</h2>
        </h2>
        {reasons?.map((item) => item.remark && (
          <p key={item.id}>
            - {item.remark}
          </p>
        ))}

        <div className='mt-3'>
          {reasons?.length > 0 && (
            <p className='text-sm text-neutral-500'>
              You may revise and resubmit your application.
            </p>
          )}
        </div>

      </div>
    </>
  )
}
