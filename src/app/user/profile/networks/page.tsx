'use client'
import { useEffect, useState } from 'react'
import { bgIMG, userImg } from '@/utils/utility'
import Image from 'next/image'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Network } from '@/components/peoples/Network'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { tryCatch } from '@/config/try-catch'
import { getGroups } from '@/redux_store/group/groupAPI'
import { groupActions } from '@/redux_store/group/groupSlice'

const AdminProfileNetworksPage = () => {
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { groups } = cusSelector((state) => state.group);

  const dispatch = cusDispatch();

  useEffect(() => {
    (async () => {

      tryCatch(
        async () => {
          const response = await getGroups(leaderProfile?.id as string);
          console.log("dresponse", response)
          dispatch(groupActions.storeGroups(response));
        })

    })();
  }, []);

  return (
    <>
      <PeoplesComponentWrapper
        heading='groups'
        searchStr={searchString}
        setSearchStr={changeSearchString}>
        <button
          className={`text-sm transition-all absolute top-[20px] right-2 mt-20 px-5 py-1 rounded-full capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
          // onClick={() => setIsAgenda(true)}
        >
          Create Group
        </button>
        <ul className='grid grid-cols-4 gap-5 max-[950px]:grid-cols-3 max-[700px]:grid-cols-2 max-[450px]:grid-cols-1'>
          <div className="overflow-y-scroll flex-1 main_scrollbar">
            <ul className="flex flex-col">
              {groups.length > 0 &&
                groups.map((item: any,index:number) => {
                  return (
                    <Network key={index} created_date={item?.created_date} member={item.members} name={item.name} backgroundImg={bgIMG} displayImg={userImg} />
                  )
                })}
            </ul>
          </div>
         
        </ul>
      </PeoplesComponentWrapper>
    </>
  )
}

export default AdminProfileNetworksPage
