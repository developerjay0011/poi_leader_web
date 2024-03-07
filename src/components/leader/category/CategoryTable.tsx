import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { StatusBtn } from '@/utils/StatusBtn'
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';

interface AssemblyConstituencyTableProps {
  searchStr: string
  handleDelete: (id: string) => void
  handleEdit: (value: any) => void
}

export const CategoryTable: FC<AssemblyConstituencyTableProps> = ({
  searchStr, handleEdit, handleDelete
}) => {
  const { categories } = cusSelector((state) => state.agenda);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
  const [id, setid] = useState("")
  const searchFilterData = categories?.filter((el: any) => searchStr ? el?.template_name === searchStr : el)


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
        <tbody>{searchFilterData?.length > 0 ? (
          searchFilterData?.map((el: any, i: number) => (
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
