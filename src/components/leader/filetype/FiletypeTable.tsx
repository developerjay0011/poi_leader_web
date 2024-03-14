
import { cusSelector } from '@/redux_store/cusHooks';
import { DeleteFile } from '@/redux_store/filetype/filetypeApi';
import { ErrorTableRow } from '@/utils/ErrorTableRow';
import { FC } from 'react'
import { BiEdit, BiSolidTrashAlt } from 'react-icons/bi';

interface FiletypeTableProps {
  searchStr: string
  handleEdit: (value: any) => void
  getFiles: any
}

export const FiletypeTable: FC<FiletypeTableProps> = ({ searchStr, handleEdit, getFiles }) => {
  const { filestype } = cusSelector((state) => state.file);
  const { userDetails }: any = cusSelector((state) => state.auth);
  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = filestype?.filter(
        function (item) {
          const itemData = item?.["file_name"] ? item?.["file_name"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return filestype
    };
  }


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
          {searchFilterFunction(searchStr)?.length > 0 ? (
            searchFilterFunction(searchStr)?.map((el: any, i: number) => {
              return (
                <tr key={i} className={`bg-white py-3 border-b border-gray-300 transition-all`}>
                  <td className='border-r align-text-center text-center max-w-[50px]'>
                    {i + 1}.
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.file_name}
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.file_number}
                  </td>
                  <td className='capitalize text-left border-r px-2 align-text-center'>
                    {el.file_location}
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
            <ErrorTableRow colNo={6} />
          )}
        </tbody>
      </table>
    </>
  )
}
