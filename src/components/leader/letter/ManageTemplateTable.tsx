import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { StatusBtn } from '@/utils/StatusBtn'
import { FaEdit } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';
import { sliceData } from '@/utils/TableWrapper';

interface AssemblyConstituencyTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
  curPageNo?: any
  filterDataCount?: any
  letter_templetes: any
}

export const ManageTemplateTable: FC<AssemblyConstituencyTableProps> = ({ searchStr, handleEdit, handleDelete, curPageNo, filterDataCount, letter_templetes }) => {
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
  const [id, setid] = useState("")

  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left py-2 pl-2 border text-center w-[100px]'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border text-center'>
              Template Header
            </th>
            {/* <th className='font-semibold text-left py-2 px-2 border text-center'>
              Template
            </th> */}
            <th className='font-semibold text-left py-2 px-2 border text-center w-[200px]'>Status</th>
            <th className='font-semibold text-center py-2 pl-2 border printHide  w-[200px]'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{letter_templetes?.length > 0 ? (
          letter_templetes?.map((el: any, i: any) => (
            <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>
              <td className='py-2 pl-2 border-r align-text-top text-center'>
                {el.sr}.
              </td>
              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el.template_name}
              </td>
              <td className='text-center py-2 pl-2 border printHide'>
                <StatusBtn
                  status={el.isactive ? '1' : '0'}
                  clickHandler={() => { }}
                  inProgress={false}
                />
              </td>
              <td className='text-center py-2 pl-2 border printHide'>
                <button
                  className='hover:scale-110 transition-all ease-out duration-200 active:scale-100'
                  onClick={() => handleEdit(el)}>
                  <BiEdit className='text-2xl' />
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

          ))
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
    </>
  )
}
