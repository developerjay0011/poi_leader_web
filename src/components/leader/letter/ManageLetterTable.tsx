import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { MdDelete } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';
import moment from 'moment';
import { BsFillEyeFill } from 'react-icons/bs';
import { PDFPreviewLeader } from '@/utils/PDFPreviewLeader';

interface ManageLetterTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
  curPageNo?: any
  filterDataCount?: any
  letters: any
}

export const ManageLetterTable: FC<ManageLetterTableProps> = ({ searchStr, handleEdit, handleDelete, curPageNo, filterDataCount, letters }) => {
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
  const [showLetterPreiew, setshowLetterPreiew] = useState(false)
  const [letterdata, setletterdata] = useState("")
  const [id, setid] = useState("")
  const { filestype } = cusSelector((state) => state.file);
  const formSubmitHandler = (item: any) => {
    try {
      let lettertype = filestype?.find((el: any) => el.id == item?.file_number)
      let fileno = lettertype?.file_name + "-" + lettertype?.file_number
      let todata = lettertype?.to?.find((el: any) => el.ministryid == item?.to)
      let to = `${todata?.name}`
      let designation = `${todata?.ministry_name} (${todata?.designation})`
      return ({ fileno, to, designation })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-center py-2 pl-2 border'>S.No</th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              ID Number
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              File Number
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              From
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              To
            </th>
            <th className='font-semibold capitalize text-center py-2 pl-2 border'>
              Reference
            </th>
            <th className='font-semibold text-center py-2 px-2 border'>Date</th>
            <th className='font-semibold text-center py-2 px-2 border'>
              Contact
            </th>
            <th className='font-semibold text-center py-2 px-2 border'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{letters?.length > 0 ? (
          letters?.map((el: any, i: any) => {
            var letterdata = formSubmitHandler(el)
            return (
              <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>
                <td className='py-2 pl-2 border-r align-text-top text-center'>
                  {el.sr}.
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {el?.id_number}
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {letterdata?.fileno}
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {el?.from}
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {letterdata?.to} - {letterdata?.designation}
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {el?.reference}
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {moment(el?.created_date).format("DD/MM/YYYY")}
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {el?.contact_no}
                </td>
                <td className='text-center py-2 pl-2 border printHide'>
                  <button
                    className='hover:scale-110 transition-all ease-out duration-200 active:scale-100'
                    onClick={() => { setletterdata(el?.letter_html), setshowLetterPreiew(true) }}>
                    <BsFillEyeFill className='text-2xl' />
                  </button>
                  <button
                    className='hover:scale-110 transition-all ease-out duration-200 active:scale-100'
                    onClick={() => { setid(el?.id), setShowDeleteConfirmPopup(true) }}>
                    <MdDelete
                      className='text-2xl'

                    />
                  </button>
                </td>
              </tr>

            )
          })
        ) : (
          <ErrorTableRow colNo={10} />
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
      <AnimatePresence>
        {showLetterPreiew && (
          <PDFPreviewLeader
            onClose={() => setshowLetterPreiew(false)}
            letter_html={letterdata}
          />
        )}
      </AnimatePresence>
    </>
  )
}
