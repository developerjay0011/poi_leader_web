import { FC } from 'react'

export const ManageTemplateTable: FC = () => {
  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left py-2 pl-2 border'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Template Header
            </th>
            <th className='font-semibold text-left py-2 px-2 border'>
              Template
            </th>
            <th className='font-semibold text-left py-2 px-2 border'>Status</th>
          </tr>
        </thead>
        <tbody>{}</tbody>
      </table>
    </>
  )
}
