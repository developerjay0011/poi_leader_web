'use client'
import { useState } from 'react'
import { bgIMG, userImg } from '@/utils/utility'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Network } from '@/components/peoples/Network'

const AdminFollowingPage = () => {
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  return (
    <>
      <PeoplesComponentWrapper
        heading='following'
        searchStr={searchString}
        setSearchStr={changeSearchString}>
        <ul className='grid grid-cols-4 gap-5'>
          <Network backgroundImg={bgIMG} displayImg={userImg} />
        </ul>
      </PeoplesComponentWrapper>
    </>
  )
}

export default AdminFollowingPage
