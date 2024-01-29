'use client'
import { FC } from 'react'
import { PollTableRow } from './PollTableRow'
import { GenerateId } from '@/utils/utility'

interface PollsTableProps {}
export const PollsTable: FC<PollsTableProps> = () => {
  return (
    <>
      <table>
        <thead className='border-b-2 capitalize text-lg'>
          <tr>
            <th className='text-left py-2'>#</th>
            <th className='text-left py-2'>Poll Title</th>
            <th className='py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <PollTableRow
            access='open'
            id={GenerateId()}
            imgOptions={[{ id: GenerateId(), media: '', text: '18', votes: 0 }]}
            index={1}
            options={[]}
            pollType='image'
            publishDate='2023-08-10T10:40'
            title='what is your age?'
            expiresAt={'2023-08-25T00:00'}
          />
        </tbody>
      </table>
    </>
  )
}
