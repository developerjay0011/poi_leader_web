'use client'
import { useState } from 'react'
import { bgIMG, userImg } from '@/utils/utility'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Network } from '@/components/peoples/Network'
import { cusSelector } from '@/redux_store/cusHooks'

const AdminFollowingPage = () => {
  const [searchString, setSearchString] = useState('')
  const { groups } = cusSelector((state) => state.group);
  const changeSearchString = (val: string) => setSearchString(val)

  return (
    <>
      <PeoplesComponentWrapper
        heading='following'
        searchStr={searchString}
        setSearchStr={changeSearchString}>
        <ul className='grid grid-cols-4 gap-5'>
          {groups?.length > 0 &&
            groups?.map((item: any, index: number) => {
              return (
                <Network onMemberClick={() => { }} key={index} created_date={item?.created_date} member={item.members} name={item.name} backgroundImg={bgIMG} displayImg={userImg} />
              )
            })}
        </ul>
      </PeoplesComponentWrapper>
    </>
  )
}

export default AdminFollowingPage
