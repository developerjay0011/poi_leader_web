
import { cusSelector } from '@/redux_store/cusHooks';
import { DeleteFile } from '@/redux_store/filetype/filetypeApi';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { sliceData } from '@/utils/TableWrapper';
import { FC } from 'react'
import { BiEdit, BiSolidTrashAlt } from 'react-icons/bi';

interface FiletypeTableProps {
  searchStr: string
  handleEdit: (value: any) => void
  getFiles: any
  curPageNo?: any
  filterDataCount?: any
  filestypes: any
}

export const FiletypeTable: FC<FiletypeTableProps> = ({ searchStr, handleEdit, getFiles, curPageNo, filterDataCount, filestypes }) => {
  const { userDetails }: any = cusSelector((state) => state.auth);
  const { location } = cusSelector((state) => state.location);
  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b py-3 border-gray-300'>
            <th className='border-r align-text-center text-center max-w-[50px]'>S.No</th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              file name
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              file number
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              file location
            </th>
            <th className='font-semibold capitalize text-left py-2 pl-2 border'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filestypes?.length > 0 ? (
            filestypes?.map((el: any, i: number) => {
              return (
                <tr key={i} className={`bg-white py-3 border-b border-gray-300 transition-all`}>
                  <td className='border-r align-text-center text-center max-w-[50px]'>
                    {el.sr}.
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.file_name}
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.file_number}
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {location?.map((el: any) => ({ id: el?.id, value: el?.location }))?.find((item) => item?.id == el?.file_location) && location?.map((el: any) => ({ id: el?.id, value: el?.location }))?.find((item) => item?.id == el?.file_location)?.value}
                  </td>
                  <td className='py-2 pl-2 border printHide'>
                    <button className='hover:scale-110 transition-all ease-out duration-200 active:scale-100' onClick={() => handleEdit(el)}>
                      <BiEdit className='text-2xl' />
                    </button>
                    <button className='hover:scale-110 transition-all ease-out duration-200 ml-2 active:scale-100' onClick={async () => {
                      await DeleteFile({
                        id: el?.id,
                        leaderid: userDetails?.leaderId
                      })
                      getFiles()
                    }}>
                      <BiSolidTrashAlt className='text-2xl' />
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <ErrorTableRow colNo={10} />
          )}
        </tbody>
      </table>
    </>
  )
}
