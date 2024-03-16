import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import { DeleteOfficeLocation } from '@/redux_store/location/locationApi';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { sliceData } from '@/utils/TableWrapper';
import { FC } from 'react'
import { BiEdit, BiSolidTrashAlt } from 'react-icons/bi';
import { RiTableAltLine } from "react-icons/ri";

interface OfficelocationTableProps {
  searchStr: string
  handleEdit: (value: any) => void
  GetofficeLocations: any
  curPageNo?: any
  filterDataCount?: any
  locations: any
}

export const OfficelocationTable: FC<OfficelocationTableProps> = ({ searchStr, handleEdit, GetofficeLocations, curPageNo, filterDataCount, locations }) => {
  const { userDetails }: any = cusSelector((state) => state.auth);

  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold capitalize text-center py-2 p-2 border w-[100px]'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Location
            </th>
            <th className='font-semibold  text-center capitalize text-left py-2 pl-2 border max-w-[10px]'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {locations?.length > 0 ? (
            locations?.map((el: any, i: number) => {
              return (
                <tr key={i} className={`bg-white py-2 border-b border-gray-300 transition-all`}>
                  <td className='border-r align-text-center text-center max-w-[10px]'>
                    {i + 1}.
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.location}
                  </td>
                  <td className='py-2 pl-2 border text-center printHide max-w-[10px]'>
                    <button className='hover:scale-110 transition-all ease-out duration-200 active:scale-100' onClick={() => handleEdit(el)}>
                      <BiEdit className='text-2xl' />
                    </button>
                    <button className='hover:scale-110 transition-all ease-out duration-200 ml-2 active:scale-100' onClick={async () => {
                      await DeleteOfficeLocation({
                        id: el?.id,
                        leaderid: userDetails?.leaderId
                      })
                      GetofficeLocations()
                    }}>
                      <BiSolidTrashAlt className='text-2xl' />
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
    </>
  )
}
