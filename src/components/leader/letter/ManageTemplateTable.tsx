import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { StatusBtn } from '@/utils/StatusBtn'
import { FaEdit } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';

interface AssemblyConstituencyTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
}

export const ManageTemplateTable: FC<AssemblyConstituencyTableProps> = ({ searchStr, handleEdit, handleDelete }) => {
  const { letter_templete } = cusSelector((state) => state.letter);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
  const [id, setid] = useState("")
  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = letter_templete?.filter(
        function (item) {
          const itemData = item?.["template_name"] ? item?.["template_name"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return letter_templete
    };
  }

  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left py-2 pl-2 border text-center'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border text-center'>
              Template Header
            </th>
            {/* <th className='font-semibold text-left py-2 px-2 border text-center'>
              Template
            </th> */}
            <th className='font-semibold text-left py-2 px-2 border text-center'>Status</th>
            <th className='font-semibold text-center py-2 pl-2 border printHide'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{searchFilterFunction(searchStr)?.length > 0 ? (
          searchFilterFunction(searchStr)?.map((el, i) => (
            <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>
              <td className='py-2 pl-2 border-r align-text-top text-center'>
                {i + 1}
              </td>
              <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                {el.template_name}
              </td>
              {/* <td className='capitalize max-w-96 text-left py-2 pl-2 border-r text-center align-text-top'>
                {el.template_html}
              </td> */}
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
          <ErrorTableRow colNo={4} />
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
