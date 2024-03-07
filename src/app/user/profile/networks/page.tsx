'use client'
import { useEffect, useState } from 'react'
import { bgIMG, userImg } from '@/utils/utility'
import Image from 'next/image'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Network } from '@/components/peoples/Network'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { tryCatch } from '@/config/try-catch'
import { AddMember, DeleteGroups, DeleteMembers, getGroups, getSingleGroup, saveGroup } from '@/redux_store/group/groupAPI'
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
import { BiX } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
export interface memeber {
  memeber_id: ''
}
const AdminProfileNetworksPage = () => {
  const [searchString, setSearchString] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { directory } = cusSelector((state) => state.directory);

  const [showMember, setShowMember] = useState(false)
  const [selectMember, setSelectMember] = useState([])

  const [selectedMembers, setSelectedMembers] = useState() as any
  const statusArr = ['Active', 'Deactive']
  const [loader, setLoader] = useState(false);

  const [isEdit, setIsEdit] = useState({}) as any
  const changeSearchString = (val: string) => setSearchString(val)
  const { userDetails } = cusSelector((st) => st.auth);
  const { groups } = cusSelector((state) => state.group);
  const dispatch = cusDispatch();
  const { register, setValue, watch, formState: { errors }, handleSubmit, reset, } = useForm<UserDetails>();
  const { register: register2, setValue: setValue2, formState: { errors: errors2 }, watch: watch2, handleSubmit: handleSubmit2, reset: reset2 } = useForm<memeber>(
    {
      defaultValues: {
        memeber_id: ""
      }
    });

  useEffect(() => {
    (async () => {
      getGroup()
    })();
  }, [dispatch, userDetails?.leaderId]);
  const getGroup = () => {
    tryCatch(
      async () => {
        const response = await getGroups(userDetails?.leaderId as string);
        if (Array.isArray(response))
          dispatch(groupActions.storeGroups(response));
      })
  }
  const getSingleGroupDetails = (groupid: string) => {
    tryCatch(
      async () => {
        const body = { leaderid: userDetails?.leaderId, groupid: groupid }
        const response = await getSingleGroup(body);
        setSelectedMembers(response)
      })
  }
  const formSubmitHandler = async (data: UserDetails) => {
    tryCatch(
      async () => {
        const body = isEdit?.id ? {
          leaderid: userDetails?.leaderId,
          name: data.Name,
          isactive: data.status == "Active" ? true : false,
          id: isEdit?.id
        } : {
          leaderid: userDetails?.leaderId,
          name: data.Name,
          isactive: data.status == "Active" ? true : false,
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

  const Addmember = async (data: any) => {
    tryCatch(
      async () => {
        const body = {
          leaderid: userDetails?.leaderId,
          "groupid": selectedMembers?.id,
          "memberids": [data?.memeber_id]
        }
        const response = await AddMember(body);
        if (response?.success) {
          getGroup()
          getSingleGroupDetails(selectedMembers?.id)
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })

  }
  const Removemember = async (memeber_id: any) => {
    tryCatch(
      async () => {
        const body = {
          leaderid: userDetails?.leaderId,
          "groupid": selectedMembers?.id,
          "memberids": [memeber_id]
        }
        const response = await DeleteMembers(body);
        if (response?.success) {
          getGroup()
          reset2()
          getSingleGroupDetails(selectedMembers?.id)
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
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
            {groups?.length > 0 &&
              groups?.map((item: any, index: number) => {
                return (
                  <Network
                    onMemberClick={() => { getSingleGroupDetails(item.id), setShowMember(true) }}
                    item={item}
                    DeleteGroups={() => {
                      DeleteGroups({
                        "leaderid": userDetails?.leaderId,
                        "ids": [item?.id]
                      })
                      getGroup()
                    }}
                    setIsEdit={() => {
                      setValue("Name", item.name)
                      setValue("status", item.isactive ? 'Active' : "Deactive")
                      setIsEdit(item); setShowModal(true)
                    }}
                    key={index} created_date={item?.created_date} member={item.members} name={item.name} backgroundImg={bgIMG} displayImg={userImg} />
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
              <m.section
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
                <button
                  type='button'
                  onClick={() => { setShowModal(false), setIsEdit(false); }}
                  className='absolute top-3 right-3 z-40'>
                  <BiX className='text-3xl' />
                </button>
                <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                  {isEdit?.id as string ? "Add Group" : "Add Group"}
                </h3>

                <form
                  className="grid grid-cols-2 gap-x-4 gap-y-5 px-5 py-3"
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
                      required: "Name is required",
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
                  <div className='w-full bg-zinc-200 h-[1px] d col-span-full ' />
                  <div className="flex justify-end col-span-full gap-2">
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
              </m.section>
            </m.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {showMember && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""}`}>
              <m.section initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className='z-30 border self-start bg-white mt-20 relative w-[80%] rounded-md shadow-md max-[1450px]:w-[80%] max-[950px]:w-[90%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
                <button
                  type='button'
                  onClick={() => { setShowMember(false) }}
                  className='absolute top-3 right-3 z-40'>
                  <BiX className='text-3xl' />
                </button>
                <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                  {'Members'}
                </h3>
                <div className='px-5 py-3'>
                  <form
                    className="flex col-span-full gap-2 gap-5 items-center"
                    onSubmit={handleSubmit2(Addmember)}
                  >
                    <div className="w-[300px]">
                      <Input
                        register={register2 as any}
                        errors={errors2}
                        title="Select memeber"
                        type="select"
                        id={"memeber_id" as any}
                        required
                        validations={{
                          required: "memeber is required",
                        }}
                        selectField={{
                          title: "select memeber",
                          options: directory?.filter((item) => !selectedMembers?.members?.map((item2: any) => item2?.id)?.includes(item?.id))?.map((el) => ({ id: el?.id, value: el?.name })),
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 h-[40px] w-[150px] bg-orange-500 text-orange-50 rounded-md text-sm 
                      capitalize transition-all hover:bg-orange-600 items-center flex gap-2"
                    >
                      <FaPlus className='text-1xl' /> Members
                    </button>
                  </form>
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
                      {selectedMembers?.members?.length != 0 ? (
                        selectedMembers?.members?.map((item: any, index: number) => {
                          return (
                            <>
                              <tr key={index}>
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.mobile}</td>
                                <td className="p-2">{item.email}</td>
                                <td className="p-2 flex  gap-3">
                                  <button
                                    onClick={() => Removemember(item.id)}
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
                        <ErrorTableRow colNo={10} />
                      )}
                    </tbody>
                    {/* {selectedMembers?.length > 2 &&
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
                    } */}
                  </table>
                </div>
              </m.section>
            </m.div>
          )}
        </AnimatePresence>
      </PeoplesComponentWrapper >
    </>
  )
}

export default AdminProfileNetworksPage
