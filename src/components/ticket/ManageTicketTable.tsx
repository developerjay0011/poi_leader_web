import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useEffect, useState } from 'react'
import { motion as m } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import { IoMdEye } from 'react-icons/io';
import { TicketTimeLine } from './TicketTimeLine';
import TicketTineLineForm from './TicketTineLineForm';
import { PDFPreviewCP } from '@/utils/PDFPreviewCP';
import moment from 'moment';
import { BiX } from 'react-icons/bi';
import { SlEnvolopeLetter } from "react-icons/sl";
import { getTickets, saveTicketStatus } from '@/redux_store/ticket/ticketApi';
import { ticketActions } from '@/redux_store/ticket/ticketSlice';
import { tryCatch } from '@/config/try-catch';
import Link from 'next/link';
import { Savedby } from '@/constants/common';
import { getImageUrl, setusername } from '@/config/get-image-url';
import { sliceData } from '@/utils/TableWrapper';

interface ManageTicketTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
  ticket: any
  ischecked: any
  setIschecked: any
  curPageNo?: any
  filterDataCount?: any
}
const FORM_HEADINGS = {
  request: "Raise a Request",
  complaint: "Raise a Complaint",
  suggestion: "Create a Suggestion",
};
export const ManageTicketTable: FC<ManageTicketTableProps> = ({ searchStr, handleEdit, handleDelete, ticket, ischecked, setIschecked, curPageNo, filterDataCount }) => {
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { userDetails }: any = cusSelector((state) => state.auth);
  const [showStatus, setShowStatus] = useState(false)
  const [timeline, setTimeline] = useState<any>([])
  const [addMileStone, setAddMileStone] = useState(false)
  const [ticketdata, setticketdata] = useState<any>()
  const [showPreview, setShowPreview] = useState(false);
  const dispatch = cusDispatch();




  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold capitalize text-center p-2 border'>
              S.No
            </th>
            <td className='capitalize text-left p-2 border-r text-center align-text-top'>
              <input type="checkbox"
                className='text-[20px] cursor-pointer'
                onClick={(e) => { e.stopPropagation(); }}
                checked={ticket?.length > 0 && ischecked?.length == ticket?.length}
                disabled={ticket?.length == 0}
                onChange={() => {
                  if (ticket?.length > 0) {
                    if (ischecked?.length == ticket?.length) {
                      setIschecked([])
                    } else {
                      setIschecked(ticket)
                    }
                  }
                }} />
            </td>
            <th className='font-semibold capitalize text-center border max-w-[100px]'>
              Date
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Category
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Ticket Code
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Subject
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Description
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              Status
            </th>
            <th className='font-semibold capitalize text-center p-2 border'>
              action
            </th>
          </tr>
        </thead>
        <tbody>{ticket?.length > 0 ? (
          ticket?.map((el: any, i: any) => {
            const formSubmitHandler = async () => {
              tryCatch(
                async () => {
                  const formData = new FormData();
                  formData.append("id", "");
                  formData.append("leaderid", userDetails?.leaderId || "");
                  formData.append("ticketid", el?.ticketid || "");
                  formData.append("category", el?.ticket_category || "");
                  formData.append("status", 'read');
                  formData.append("description", "");
                  formData.append("created_by", userDetails?.id || '');
                  formData.append("created_by_name", Savedby()?.saved_by_type == "leader" ? setusername(leaderProfile) : userDetails?.username);
                  const response = await saveTicketStatus(formData);
                  if (response?.success) {
                    const ticketData = await getTickets(userDetails?.leaderId as string);
                    dispatch(ticketActions.storeTicket(ticketData))
                  }
                })
            };
            return (
              <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>
                <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                  {i + 1}.
                </td>
                <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                  <input type="checkbox"
                    className='text-[20px] cursor-pointer'
                    onClick={(e) => { e.stopPropagation(); }}
                    checked={ischecked?.map((item: any) => item?.ticketid)?.includes(el?.ticketid)}
                    onChange={() => {
                      var selected = [...ischecked]
                      if (selected?.filter((items: any) => items?.ticketid == el?.ticketid)?.length > 0) {
                        selected = selected?.filter((items: any) => items?.ticketid != el?.ticketid)
                        setIschecked(selected)
                      } else {
                        selected.push(el)
                        setIschecked(selected)
                      }
                    }} />
                </td>
                <td className='capitalize text-left  border-r text-center align-text-top max-w-[100px]'>
                  {moment(el?.created_date).format("DD-MM-YYYY hh:mm a")}
                </td>
                <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                  {el?.category}
                </td>
                <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                  {el?.ticket_code}
                </td>
                <td className='capitalize text-left p-2 border-r text-center align-text-top'>
                  {el?.subject}
                </td>
                <td className='capitalize text-left p-2 border-r text-center align-text-top max-w-[300px]'>
                  <p className='text-ellipsis overflow-hidden truncate max-h-[100px]'>{el?.description}</p>
                </td>
                <td className='text-center p-2 border items-center justify-center '>
                  <div className='gap-2 flex justify-center'>
                    <button className='hover:underline text-orange-500  text-[15px] capitalize flex items-center gap-1 justify-center self-center transition-all' onClick={() => { setticketdata(el), setShowStatus(true), setTimeline(el?.status) }}>
                      <strong>{el?.status?.slice(-1).pop()?.status}</strong>
                    </button>
                  </div>
                </td>
                <td className='text-center p-2 border items-center justify-center'>
                  <div className='gap-2 flex justify-center'>
                    <button className='hover:scale-110 transition-all ease-out duration-200 active:scale-100' onClick={() => {
                      if (el?.status?.filter((item: any) => item?.status == 'read')?.length == 0) {
                        formSubmitHandler()
                      }
                      setticketdata(el), setShowPreview(true)
                    }}>
                      <IoMdEye className='text-2xl' />
                    </button>
                    <button className='hover:scale-110 transition-all ease-out duration-200 active:scale-100' >
                      <Link href={(Savedby().saved_by_type == "leader" ? "/user" : "/employee-access") + "/letter/add-letter?id=" + el?.ticketid}>
                        <SlEnvolopeLetter className='text-2xl' />
                      </Link>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })
        ) : (
          <ErrorTableRow colNo={8} />
        )}
        </tbody>
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
            heading={FORM_HEADINGS[ticketdata?.ticket_category].split(" ").at(-1) as string}
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
