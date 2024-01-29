'use client'
import { useState } from 'react'
import { bgIMG, userImg } from '@/utils/utility'
import Image from 'next/image'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Network } from '@/components/peoples/Network'

const AdminProfileNetworksPage = () => {
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  return (
    <>
      <PeoplesComponentWrapper
        heading='groups'
        searchStr={searchString}
        setSearchStr={changeSearchString}>
        <ul className='grid grid-cols-4 gap-5 max-[950px]:grid-cols-3 max-[700px]:grid-cols-2 max-[450px]:grid-cols-1'>
          <Network backgroundImg={bgIMG} displayImg={userImg} />
        </ul>
      </PeoplesComponentWrapper>
    </>
  )
}

export default AdminProfileNetworksPage
