import { FC } from 'react'

interface ManageLetterTableProps {
  searchStr: string
}
export const ManageLetterTable: FC<ManageLetterTableProps> = ({
  searchStr,
}) => {
  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left py-2 pl-2 border'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              ID Number
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              File Number
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              From
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              To
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Subject
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Reference
            </th>
            <th className='font-semibold text-left py-2 px-2 border'>Date</th>
            <th className='font-semibold text-left py-2 px-2 border'>
              Contact
            </th>
            <th className='font-semibold text-left py-2 px-2 border'>
              Attachment
            </th>
            <th className='font-semibold text-left py-2 px-2 border'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{searchStr}</tbody>
      </table>
    </>
  )
}
