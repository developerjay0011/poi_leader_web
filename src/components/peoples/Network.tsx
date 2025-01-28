import moment from 'moment'
import { FC } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';

interface NetworkProps {
  backgroundImg: string
  displayImg: string
  name: string
  member: [],
  created_date: string
  onMemberClick: () => void
  DeleteGroups: () => void
  setIsEdit: () => void
  item: any,
  selectGroup: any,
  setSelectGroup: any
}

export const Network: FC<NetworkProps> = ({ backgroundImg, displayImg, name, member, created_date, onMemberClick, DeleteGroups, item, setIsEdit, setSelectGroup, selectGroup }) => {
  var ischecked = selectGroup?.filter((items: any) => items?.id == item?.id)?.length > 0
  return (

    <li onClick={(e) => { e.preventDefault(); onMemberClick() }} className='bg-gray-50 cursor-pointer border rounded-md overflow-hidden w-full shadow-sm py-2 px-3'>
      <div className='flex flex-col'>
        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>Name:  </span>
          <span className='text-[13px]'>{name}</span>
        </p>
        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>member: </span>
          <span className='text-[13px]'>{member?.length}</span>
        </p>

        <p className='capitalize flex items-center gap-3 text-[14px]'>
          <span className='font-[600]'>since: </span>
          <span className='text-[13px]'>{moment(created_date).format('MMM YYYY')}</span>
        </p>

        <div className='flex items-center gap-3 self-end mt-2'>
          <input type="checkbox"
            className='text-[18px] cursor-pointer'
            onClick={(e) => { e.stopPropagation(); }}
            checked={ischecked}
            onChange={() => {
              var selected = [...selectGroup]
              if (selected?.filter((items: any) => items?.id == item?.id)?.length > 0) {
                selected = selected?.filter((items: any) => items?.id != item?.id)
                setSelectGroup(selected)
              } else {
                selected.push(item)
                setSelectGroup(selected)
              }
            }} />
          <FaPlus onClick={(e) => { e.preventDefault(); onMemberClick() }} className='text-[15px] cursor-pointer' />
          <MdEdit className='text-[18px] cursor-pointer' onClick={(e) => { e.stopPropagation(); setIsEdit() }} />
          <MdDelete className='text-[18px] cursor-pointer' onClick={(e) => { e.stopPropagation(); DeleteGroups() }} />
        </div>
      </div>
    </li>
  )
}
