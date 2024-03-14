import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import { DeleteOfficeLocation } from '@/redux_store/location/locationApi';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC } from 'react'
import { BiEdit, BiSolidTrashAlt } from 'react-icons/bi';
import { RiTableAltLine } from "react-icons/ri";

interface OfficelocationTableProps {
  searchStr: string
  handleEdit: (value: any) => void
  GetofficeLocations: any
}

export const OfficelocationTable: FC<OfficelocationTableProps> = ({ searchStr, handleEdit, GetofficeLocations }) => {
  const { location } = cusSelector((state) => state.location);
  const { userDetails }: any = cusSelector((state) => state.auth);
  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = location?.filter(
        function (item) {
          const itemData = item?.["location"] ? item?.["location"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return location
    };
  }

  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='border-r align-text-center text-center max-w-[50px]'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Location
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {searchFilterFunction(searchStr)?.length > 0 ? (
            searchFilterFunction(searchStr)?.map((el: any, i: number) => {
              return (
                <tr key={i} className={`bg-white py-2 border-b border-gray-300 transition-all`}>
                  <td className='border-r align-text-center text-center max-w-[50px]'>
                    {i + 1}.
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.location}
                  </td>
                  <td className='py-2 pl-2 border printHide'>
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
