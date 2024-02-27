'use client'
import { useEffect, useState } from 'react'
import { bgIMG, userImg } from '@/utils/utility'
import Image from 'next/image'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Network } from '@/components/peoples/Network'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { tryCatch } from '@/config/try-catch'
import { getGroups, getSingleGroup, saveGroup } from '@/redux_store/group/groupAPI'
import { groupActions } from '@/redux_store/group/groupSlice'
import { AnimatePresence } from 'framer-motion'
import { Input } from '@/components/Input'
import { motion as m } from "framer-motion";
import { UserDetails } from '@/utils/typesUtils'
import { useForm } from 'react-hook-form'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { FaEdit } from 'react-icons/fa'
import { BsTrash3Fill } from 'react-icons/bs'
import { ErrorTableRow } from '@/utils/ErrorTableRow'

const AdminProfileNetworksPage = () => {
  const [searchString, setSearchString] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [showMember, setShowMember] = useState(false)

  const [selectedMembers, setSelectedMembers] = useState([])
  const statusArr = [ 'Active', 'Deactive']
  const [loader, setLoader] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const changeSearchString = (val: string) => setSearchString(val)
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { groups } = cusSelector((state) => state.group);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserDetails>();
  const dispatch = cusDispatch();

  useEffect(() => {
    (async () => {

      getGroup()

    })();
  }, [dispatch,leaderProfile]);
  const getGroup = () => {
    tryCatch(
      async () => {
        const response = await getGroups(leaderProfile?.id as string);
        dispatch(groupActions.storeGroups(response));
      })
  }
  const getSingleGroupDetails = (groupid : string) => {
    tryCatch(
      async () => {
       const body = { leaderid: leaderProfile?.id,groupid:groupid }
        const response = await getSingleGroup(body);
        setSelectedMembers(response?.members)

      })
  }
  
  const formSubmitHandler = async (data: UserDetails) => {
    tryCatch(
      async () => {
        const body = {
          leaderid: leaderProfile.id,
          name: data.Name,
          isactive: data.status == "Active" ?true:false
        }

        const response = await saveGroup(body);
        if (response?.success) {
          setLoader(!loader)
          getGroup()
          reset()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
        setShowModal(false)
      })
    
  }
  return (
    <>
      <PeoplesComponentWrapper
        heading='groups'
        searchStr={searchString}
        setSearchStr={changeSearchString}>
        <div className="py-1 px-7 max-[650px]:px-3 flex items-center justify-between">
          <label htmlFor="filter" className="flex items-center gap-2">
         
          </label>

          <button
            className={`text-sm mt-5 transition-all px-5 py-1 rounded-full capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
            onClick={() => setShowModal(true)}
          >
            Create group
          </button>
        </div>

        <section className="px-7 pb-8 max-[650px]:px-3">
          <ul className="grid grid-cols-5 gap-2 max-[1300px]:grid-cols-4 max-[750px]:grid-cols-3 max-[750px]:gap-1 max-[550px]:grid-cols-2 max-[450px]:grid-cols-1">
              {groups.length > 0 &&
                groups.map((item: any,index:number) => {
                  return (
                    <Network onMemberClick={() => { getSingleGroupDetails(item.id),setShowMember(true)}} key={index} created_date={item?.created_date} member={item.members} name={item.name} backgroundImg={bgIMG} displayImg={userImg} />
                  )
                })}
            </ul>
        </section>

        {/* Create Group From  */}
        <AnimatePresence mode="wait">
          {showModal && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
                }`}
            >
              <div
                className="bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20"
              // onClick={onCancel}
              />
              <m.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center"
              >
                <h2 className="mt-4 mb-8 text-3xl">Add Group</h2>

                <form
                  className="grid grid-cols-1 gap-x-4 gap-y-5"
                  onSubmit={handleSubmit(formSubmitHandler)}
                >
                  <Input
                    errors={errors}
                    id="Name"
                    placeholder="Name"
                    register={register}
                    title="Name"
                    type="text"
                    required
                    validations={{
                      required: "First name is required",
                    }}
                  />
            

                  <Input
                    register={register}
                    errors={errors}
                    title="Status"
                    type="select"
                    id={"status"}
                    required
                    validations={{
                      required: "status is required",
                    }}
                    selectField={{
                      title: "select status",
                      options: statusArr.map((el) => ({ id: el, value: el })),
                    }}
                  />
                  <div className="flex justify-end col-span-full gap-2 mt-5">
                    <a
                      className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
                      onClick={() => {
                        setShowModal(false), setIsEdit(false);
                      }}
                    >
                      close
                    </a>
                    <button
                      className="rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {showMember && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
                }`}
            >
              <div
                className="bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20"
              // onClick={onCancel}
              />
              <m.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center"
              >
                <h2 className="mt-4 mb-8 text-3xl">Members</h2>

               
                  <table className="w-full mt-5">
                    <thead className="text-left">
                      <tr className="bg-orange-500 text-orange-50">
                        <th className="p-2 font-medium">S.No</th>
                        <th className="p-2 font-medium">Name</th>
                        <th className="p-2 font-medium">Phone No</th>
                        <th className="p-2 font-medium">Email</th>
                        <th className="p-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-left">
                      {selectedMembers.length != 0 ? (
                        selectedMembers.map((item: any, index: number) => {
                          return (
                            <>
                              <tr key={index}>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.mobile}</td>
                                <td className="p-2">{item.email}</td>
                                <td className="p-2 flex  gap-3">
                                  <button
                                    className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
                                    // onClick={() => editDirectory(directory)}
                                  >
                                    <FaEdit className="text-xl" />
                                  </button>

                                  <button
                                    // onClick={() =>
                                    //   confirmDelete(directory.id, directory.leaderid)
                                    // }
                                    className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
                                  >
                                    <BsTrash3Fill />
                                  </button>

                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <ErrorTableRow colNo={4} />
                      )}
                  </tbody>
                  {
                    selectedMembers.length > 2 && 
                    <nav aria-label="Page navigation example">
                      <ul className="inline-flex -space-x-px text-sm">
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                          <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>

                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                      </ul>
                    </nav>
                  }
                  
                  </table>
             
                  <div className="flex justify-end col-span-full gap-2 mt-5">
                    <a
                      className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
                      onClick={() => {
                        setShowMember(false)
                      }}
                    >
                      close
                    </a>
                    <button
                      className="rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
           
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </PeoplesComponentWrapper>
    </>
  )
}

export default AdminProfileNetworksPage
