import { FC } from 'react'

export const ErrorTableRow: FC<{ colNo: number }> = ({ colNo }) => {
  return (
    <>
      <tr className='bg-white border-b border-l border-r'>
        <td colSpan={colNo} className='p-3 text-center text-xl font-[600]'>
          ❗No Data Found
        </td>
      </tr>
    </>
  )
}
