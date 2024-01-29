import { ErrorTableRow } from '@/utils/ErrorTableRow'
import { FC } from 'react'

interface DirectoryTableProps {
  searchStr: string
}

export const DirectoryTable: FC<DirectoryTableProps> = ({ searchStr }) => {
  return (
    <>
      <table className='w-full mt-5'>
        <thead className='text-left'>
          <tr className='bg-orange-500 text-orange-50'>
            <th className='p-2 font-medium'>S.No</th>
            <th className='p-2 font-medium'>Name</th>
            <th className='p-2 font-medium'>Phone No</th>
            <th className='p-2 font-medium'>Email</th>
            <th className='p-2 font-medium'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          <ErrorTableRow colNo={5} />
        </tbody>
      </table>
    </>
  )
}
