import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'
import { motion as m } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import { IoMdEye } from 'react-icons/io';
import { TicketTimeLine } from './TicketTimeLine';
import TicketTineLineForm from './TicketTineLineForm';
import { PDFPreviewCP } from '@/utils/PDFPreviewCP';
import moment from 'moment';
import { BiX } from 'react-icons/bi';

interface ManageTicketTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
}
const FORM_HEADINGS = {
  request: "Raise a Request",
  complaint: "Raise a Complaint",
  suggestion: "Create a Suggestion",
};
export const ManageTicketTable: FC<ManageTicketTableProps> = ({ searchStr, handleEdit, handleDelete }) => {
  const { ticket } = cusSelector((state) => state.ticket);
  const [showStatus, setShowStatus] = useState(false)
  const [timeline, setTimeline] = useState<any>([])
  const [addMileStone, setAddMileStone] = useState(false)
  const [ticketdata, setticketdata] = useState<any>()
  const searchFilterData = ticket?.filter((el: any) => searchStr ? el?.ticketid.includes(searchStr) : el)
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold capitalize text-center p-2 border'>
              Ticket Id
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Ticket Code
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Category
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Subject
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Description
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Date
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Letter  Preview
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Status
            </th>
          </tr>
        </thead>
        <tbody>{searchFilterData?.length > 0 ? (
          searchFilterData?.map((el: any, i: any) => (
            <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>

              <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                {el?.ticketid}
              </td>
              <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                {el?.ticket_code}
              </td>

              <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                {el?.category}
              </td>
              <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                {el?.subject}
              </td>
              <td className='capitalize text-left p-2 border-r text-center align-text-top max-w-[300px]'>
                <p className='text-ellipsis overflow-hidden truncate max-h-[100px]'>{el?.description}</p>
              </td>
              <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                {moment(el?.created_date).format("DD-MM-YYYY")}
              </td>
              <td className='text-center p-2 border printHide'>
                <button className='hover:scale-110 transition-all ease-out duration-200 active:scale-100' onClick={() => { setticketdata(el), setShowPreview(true) }}>
                  <IoMdEye className='text-2xl' />
                </button>
              </td>
              <td className='text-center p-2 border printHide'>
                <button className='hover:scale-110 transition-all ease-out duration-200 active:scale-100' onClick={() => { setticketdata(el), setShowStatus(true), setTimeline(el?.status) }}>
                  <IoMdEye className='text-2xl' />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <ErrorTableRow colNo={8} />
        )}</tbody>
      </table>
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
            <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center main_scrollbar`}>
              <m.section
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
                <button
                  type='button'
                  onClick={() => { setAddMileStone(false) }}
                  className='absolute top-3 right-3 z-40'>
                  <BiX className='text-3xl' />
                </button>
                <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                  {'Add Status'}
                </h3>
                <TicketTineLineForm isedit={false} ticketdata={ticketdata} data={null} onCancel={() => setAddMileStone(false)} />
              </m.section>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showPreview && (
          <PDFPreviewCP
            onClose={() => setShowPreview(false)}
            heading={FORM_HEADINGS[ticketdata?.category].split(" ").at(-1) as string}
            to={ticketdata?.to}
            description={ticketdata?.description}
            signature={ticketdata?.signature}
            subject={ticketdata?.subject}
            attachments={ticketdata?.attachments}
            letterdetails={ticketdata}
          />
        )}
      </AnimatePresence>

    </>
  )
}
