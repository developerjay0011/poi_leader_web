import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { StatusBtn } from '@/utils/StatusBtn'
import { FaEdit } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';

interface ManageTicketTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
}

export const ManageTicketTable: FC<ManageTicketTableProps> = ({
  searchStr, handleEdit, handleDelete
}) => {
  const { ticket } = cusSelector((state) => state.ticket);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
  const [id, setid] = useState("")

  const searchFilterData = ticket?.filter((el: any) =>
    searchStr ?
      el?.ticketid.includes(searchStr)
      : el
  )
  console.log(searchFilterData)

  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Ticket Id
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Ticket Code
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Category
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Subject
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Description
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Date
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Status
            </th>

          </tr>
        </thead>
        <tbody>{searchFilterData?.length > 0 ? (
          searchFilterData?.map((el, i) => (
            <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>

              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el?.ticketid}
              </td>
              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el?.ticket_code}
              </td>

              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el?.category}
              </td>
              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el?.subject}
              </td>
              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el?.description}
              </td>
              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el?.created_date}
              </td>
              <td className='text-center py-2 pl-2 border printHide'>
                {/* {el?.status[0]} */}
              </td>

            </tr>

          ))
        ) : (
          <ErrorTableRow colNo={8} />
        )}</tbody>
      </table>
      <AnimatePresence>
        {showDeleteConfirmPopup && (
          <ConfirmDialogBox
            onCancel={() => setShowDeleteConfirmPopup(false)}
            noAllowed={false}
            onOk={() => { handleDelete(id), setShowDeleteConfirmPopup(false) }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
