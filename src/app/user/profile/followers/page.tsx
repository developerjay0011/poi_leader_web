'use client'
import { useState } from 'react'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { user2Img } from '@/utils/utility'
import { BsThreeDots } from 'react-icons/bs'
import { Follower } from '@/components/peoples/Follower'

const AdminFollowersPage = () => {
  const [searchString, setSearchString] = useState('')

  const changeSearchString = (val: string) => setSearchString(val)
  return (
    <PeoplesComponentWrapper
      heading='followers'
      searchStr={searchString}
      setSearchStr={changeSearchString}>
      <ul className='grid grid-cols-4 gap-2 mb-3'>
        <Follower displayImg={user2Img} />
      </ul>
    </PeoplesComponentWrapper>
  )
}

export default AdminFollowersPage
