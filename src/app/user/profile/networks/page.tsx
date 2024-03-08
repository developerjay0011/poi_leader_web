'use client'
import { useEffect, useState } from 'react'
import { bgIMG, userImg } from '@/utils/utility'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Network } from '@/components/peoples/Network'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { tryCatch } from '@/config/try-catch'
import { DeleteGroups, getGroups, getSingleGroup } from '@/redux_store/group/groupAPI'
import { groupActions } from '@/redux_store/group/groupSlice'
import { MembersTable } from '@/components/leader/forms/MembersTable'
import { GroupForm } from '@/components/leader/forms/GroupForm'
const AdminProfileNetworksPage = () => {
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  const [showModal, setShowModal] = useState(false)
  const [groupdetails, setGroupdetails] = useState({}) as any
  const [showMember, setShowMember] = useState(false)
  const [isEdit, setIsEdit] = useState({}) as any
  const { userDetails } = cusSelector((st) => st.auth);
  const { groups } = cusSelector((state) => state.group);
  const dispatch = cusDispatch();
  useEffect(() => {
    (async () => { getGroup() })();
  }, [dispatch, userDetails?.leaderId]);
  const getGroup = () => {
    tryCatch(
      async () => {
        const response = await getGroups(userDetails?.leaderId as string);
        if (Array.isArray(response)) dispatch(groupActions.storeGroups(response));
      })
  }
  const getSingleGroupDetails = (groupid: string) => {
    tryCatch(
      async () => {
        const body = { leaderid: userDetails?.leaderId, groupid: groupid }
        const response = await getSingleGroup(body);
        setGroupdetails(response)
      })
  }

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = groups?.filter(
        function (item) {
          const itemData = item?.["name"] ? item?.["name"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return groups
    };
  }





  return (
    <>
      <PeoplesComponentWrapper
        heading='groups'
        searchStr={searchString}
        setSearchStr={changeSearchString}
        rightButton={
          <div className="flex items-center justify-end">
            <button
              className={`self-right text-sm transition-all px-5 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
              onClick={() => setShowModal(true)}
            >
              Create group
            </button>
          </div>
        }
      >
        <ul className="grid grid-cols-5 gap-2 max-[1300px]:grid-cols-4 max-[750px]:grid-cols-3 max-[750px]:gap-1 max-[550px]:grid-cols-2 max-[450px]:grid-cols-1">
          {searchFilterFunction(searchString)?.length > 0 &&
            searchFilterFunction(searchString)?.map((item: any, index: number) => {
              return (
                <Network
                  onMemberClick={() => { getSingleGroupDetails(item.id), setShowMember(true) }}
                  item={item}
                  DeleteGroups={() => { DeleteGroups({ "leaderid": userDetails?.leaderId, "ids": [item?.id] }); getGroup() }}
                  setIsEdit={() => {
                    setIsEdit(item);
                    setShowModal(true)
                  }}
                  key={index} created_date={item?.created_date} member={item.members} name={item.name} backgroundImg={bgIMG} displayImg={userImg} />
              )
            })}
        </ul>
        {showMember && (
          <MembersTable
            showMember={showMember}
            setShowMember={setShowMember}
            groupdetails={groupdetails}
            getSingleGroupDetails={getSingleGroupDetails}
            getGroup={getGroup}
          />
        )}
        {showModal && (
          <GroupForm
            setShowModal={setShowModal}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            getGroup={getGroup}
          />
        )}
      </PeoplesComponentWrapper >
    </>
  )
}

export default AdminProfileNetworksPage
