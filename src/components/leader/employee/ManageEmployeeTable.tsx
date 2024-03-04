import { cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { StatusBtn } from '@/utils/StatusBtn'
import { FaEdit } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';

interface ManageEmployeeTableProps {
  searchStr: string
  handleEdit: (value: any) => void
}

export const ManageEmployeeTable: FC<ManageEmployeeTableProps> = ({ searchStr, handleEdit }) => {
  const { employees } = cusSelector((state) => state.employee);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
  const [id, setid] = useState("")
  const searchFilterData = employees?.filter((el: any) => searchStr ? el?.fullname === searchStr : el)


  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left py-2 pl-2 border'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Name
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Phone No.
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Location
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Status
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {searchFilterData?.length > 0 ? (
            searchFilterData?.map((el: any, i: number) => {
              return (
                <tr key={i} className={`bg-white py-2 border-b border-gray-300 transition-all`}>
                  <td className='border-r align-text-center text-center'>
                    {i + 1}.
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.fullname}
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.phoneno}
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.location}
                  </td>
                  <td className='text-center border printHide'>
                    <StatusBtn
                      status={el.isactive ? '1' : '0'}
                      clickHandler={() => { }}
                      inProgress={false}
                    />
                  </td>
                  <td className='py-2 pl-2 border printHide'>
                    <button className='hover:scale-110 transition-all ease-out duration-200 active:scale-100' onClick={() => handleEdit(el)}>
                      <BiEdit className='text-2xl' />
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <ErrorTableRow colNo={6} />
          )}
        </tbody>
      </table>
      <AnimatePresence>
        {showDeleteConfirmPopup && (
          <ConfirmDialogBox
            onCancel={() => setShowDeleteConfirmPopup(false)}
            noAllowed={false}
            onOk={() => { setShowDeleteConfirmPopup(false) }}
          />
        )}
      </AnimatePresence>
    </>
  )
}