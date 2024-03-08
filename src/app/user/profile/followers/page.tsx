'use client'
import { useState } from 'react'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { user2Img } from '@/utils/utility'
import { Follower } from '@/components/peoples/Follower'
import { cusSelector } from '@/redux_store/cusHooks'

const AdminFollowersPage = () => {
  const { followers } = cusSelector((state) => state.leader);
  const [searchString, setSearchString] = useState('')

  const changeSearchString = (val: string) => setSearchString(val)
  return (
    <PeoplesComponentWrapper
      heading='followers'
      searchStr={searchString}
      setSearchStr={changeSearchString}
      rightButton={null}
    >
      <ul className='grid grid-cols-4 gap-2 mb-3'>
        {followers.length && followers.map((item: any, index: number) => (
          <Follower item={item} key={index} name={item.name} displayImg={item.image} />
        ))
        }
      </ul>
    </PeoplesComponentWrapper>
  )
}

export default AdminFollowersPage
