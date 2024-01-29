import { FC } from 'react'
import { BiX } from 'react-icons/bi'

interface StatusFilterBoxProps {
  resetFunc: () => void
  filterStatusVal: string
  changeFilterStatusFn: (val: string) => void
}

export const StatusFilterBox: FC<StatusFilterBoxProps> = ({
  resetFunc,
  changeFilterStatusFn,
  filterStatusVal,
}) => {
  const statusTitle = filterStatusVal === '0' ? 'deactive' : 'active'
  const statusClasses =
    filterStatusVal === '0'
      ? ' bg-red-50 border-red-500 text-red-500 '
      : ' bg-green-50 border-green-500 text-green-500 '

  return (
    <label htmlFor='status' className='flex items-center gap-2'>
      <span className='capitalize'>status</span>
      {filterStatusVal && (
        <span
          className={`border ${statusClasses} font-semibold rounded-md py-1 pl-3 pr-1 text-[14px] flex items-center gap-2 capitalize`}>
          {statusTitle}
          <BiX className='text-xl cursor-pointer' onClick={resetFunc} />
        </span>
      )}
      {!filterStatusVal && (
        <select
          id='status'
          className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all'
          value={filterStatusVal}
          onChange={(e) => changeFilterStatusFn(e.target.value)}>
          <option value=''>all</option>
          <option value='1'>active</option>
          <option value='0'>deactive</option>
        </select>
      )}
    </label>
  )
}
