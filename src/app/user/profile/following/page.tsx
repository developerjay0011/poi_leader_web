'use client'
import { useState } from 'react'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { cusSelector } from '@/redux_store/cusHooks'
import { Following } from '@/components/peoples/Following'

const AdminFollowingPage = () => {
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  const { following } = cusSelector((state) => state.leader);

  return (
    <>
      <PeoplesComponentWrapper
        heading='following'
        searchStr={searchString}
        rightButton={null}
        setSearchStr={changeSearchString}>
        <ul className='grid grid-cols-3 max-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5'>
          {following?.length > 0 && following?.map((item: any, index: number) => {
            return (
              <Following item={item} key={index} name={item.name} displayImg={item.image} />
            )
          })}
        </ul>
      </PeoplesComponentWrapper>
    </>
  )
}

export default AdminFollowingPage
