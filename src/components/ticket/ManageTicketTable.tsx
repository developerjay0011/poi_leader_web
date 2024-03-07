import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { motion as m } from "framer-motion";

import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';
import { IoMdEye } from 'react-icons/io';
import { TicketTimeLine } from './TicketTimeLine';
import TicketTineLineForm from './TicketTineLineForm';

interface ManageTicketTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
}

export const ManageTicketTable: FC<ManageTicketTableProps> = ({
  searchStr, handleEdit, handleDelete
}) => {
  const { ticket } = cusSelector((state) => state.ticket);
  const [showStatus, setShowStatus] = useState(false)
  const [timeline, setTimeline] = useState<any>([])
  const [addMileStone, setAddMileStone] = useState(false)
  const [ticketdata, setticketdata] = useState<any>()
  const searchFilterData = ticket?.filter((el: any) => searchStr ? el?.ticketid.includes(searchStr) : el)

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
                <button
                  className='hover:scale-110 transition-all ease-out duration-200 active:scale-100'
                  onClick={() => { setticketdata(el), setShowStatus(true), setTimeline(el?.status) }}>
                  <IoMdEye
                    className='text-2xl'

                  />
                </button>
              </td>

            </tr>

          ))
        ) : (
          <ErrorTableRow colNo={8} />
        )}</tbody>
      </table>
      {/* <AnimatePresence>
        {showDeleteConfirmPopup && (
          <ConfirmDialogBox
            onCancel={() => setShowDeleteConfirmPopup(false)}
            noAllowed={false}
            onOk={() => { handleDelete(id), setShowDeleteConfirmPopup(false) }}
          />
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {showStatus && (
          <TicketTimeLine
            timeline={timeline}
            onClose={() => setShowStatus(false)}
            onAddMileStone={() => { setShowStatus(false), setAddMileStone(true) }}
            ticketdata={ticketdata}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {addMileStone && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
              }`}
          >
            <div
              className="bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20"
              onClick={() => setAddMileStone(false)}
            />
            <m.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center"
            >
              <h2 className="mt-4 mb-8 text-3xl">Add Status</h2>

              <TicketTineLineForm isedit={false} ticketdata={ticketdata} data={null} onCancel={() => setAddMileStone(false)} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
