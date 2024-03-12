import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC, useState } from 'react'

import { StatusBtn } from '@/utils/StatusBtn'
import { BiEdit } from 'react-icons/bi';
import { Savedby, ToastType } from '@/constants/common';
import { SaveCategory, getCategory } from '@/redux_store/agenda/agendaApi';
import { commonActions } from '@/redux_store/common/commonSlice';
import { agendaAction } from '@/redux_store/agenda/agendaSlice';
import { generateCategoricalChart } from 'recharts/types/chart/generateCategoricalChart';

interface AssemblyConstituencyTableProps {
  searchStr: string
  handleEdit: (value: any) => void
}

export const CategoryTable: FC<AssemblyConstituencyTableProps> = ({ searchStr, handleEdit }) => {
  const { categories } = cusSelector((state) => state.agenda);
  const { userDetails } = cusSelector((st) => st.auth);
  const dispatch = cusDispatch();
  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = categories?.filter(
        function (item) {
          const itemData = item?.["category"] ? item?.["category"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return categories
    };
  }



  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left py-2 pl-2 border text-center'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border text-center'>category</th>
            <th className='font-semibold text-left py-2 px-2 border text-center'>Status</th>
            <th className='font-semibold text-center py-2 pl-2 border printHide'>Actions</th>
          </tr>
        </thead>
        <tbody>{searchFilterFunction(searchStr)?.length > 0 ? (
          searchFilterFunction(searchStr)?.map((el: any, i: number) => {
            return (
              <tr key={i} className={`bg-white border-b border-gray-300 transition-all`}>
                <td className='pl-2 border-r align-text-top text-center'>
                  {i + 1}
                </td>
                <td className='capitalize text-left py-2 pl-2 border-r text-center align-text-top'>
                  {el.category}
                </td>
                <td className='text-center py-2 pl-2 border printHide'>
                  <StatusBtn
                    status={el.isactive ? '1' : '0'}
                    clickHandler={async () => {
                      const body = {
                        id: el.id,
                        "leaderid": userDetails?.leaderId,
                        "category": el.category,
                        isactive: !el.isactive,
                        ...Savedby()
                      };
                      const response = await SaveCategory(body);
                      if (response?.success) {
                        const data = await getCategory(userDetails?.leaderId as string);
                        dispatch(agendaAction.storeCategories(data));
                        dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
                      } else {
                        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
                      }
                    }}
                    inProgress={false}
                  />
                </td>
                <td className='text-center py-2 pl-2 border printHide'>
                  <button
                    className='hover:scale-110 transition-all ease-out duration-200 active:scale-100'
                    onClick={() => handleEdit(el)}>
                    <BiEdit className='text-2xl' />
                  </button>
                </td>
              </tr>
            )
          })
        ) : (
          <ErrorTableRow colNo={4} />
        )}</tbody>
      </table>
    </>
  )
}
