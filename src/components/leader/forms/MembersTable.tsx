import { FC, useEffect } from 'react'
import { AnimatePresence, motion as m } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { BiX } from 'react-icons/bi'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { Input } from '@/components/Input'
import { FaPlus } from 'react-icons/fa6'
import { BsTrash3Fill } from 'react-icons/bs'
import { ErrorTableRow } from '@/utils/ErrorTableRow'
import { AddMember, DeleteMembers } from '@/redux_store/group/groupAPI'

interface ManageEmployessFormProps {
  setShowMember: (data: any) => void
  showMember: boolean
  groupdetails: any
  getGroup: () => void
  getSingleGroupDetails: (data: any) => void
}

export interface memeber {
  memeber_id: ''
}
export const MembersTable: FC<ManageEmployessFormProps> = ({ setShowMember, showMember, groupdetails, getGroup, getSingleGroupDetails }) => {
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const { directory } = cusSelector((state) => state.directory);
  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm<memeber>({})
  const Addmember = async (data: any) => {
    tryCatch(
      async () => {
        const body = {
          leaderid: userDetails?.leaderId,
          "groupid": groupdetails?.id,
          "memberids": [data?.memeber_id]
        }
        const response = await AddMember(body);
        if (response?.success) {
          getGroup()
          getSingleGroupDetails(groupdetails?.id)
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
          "groupid": groupdetails?.id,
          "memberids": [memeber_id]
        }
        const response = await DeleteMembers(body);
        if (response?.success) {
          getGroup()
          reset()
          getSingleGroupDetails(groupdetails?.id)
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })

  }
  useEffect(() => {
    if (groupdetails) {
      reset({})
    }
  }, [reset])

  return (
    <AnimatePresence mode="wait">
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

            <form className="flex col-span-full gap-5 items-end" onSubmit={handleSubmit(Addmember)}>
              <div className="w-[300px]">
                <Input
                  register={register as any}
                  errors={errors}
                  title="Select memeber"
                  type="select"
                  id={"memeber_id" as any}
                  required
                  validations={{
                    required: "memeber is required",
                  }}
                  selectField={{
                    title: "select memeber",
                    options: directory?.filter((item) => !groupdetails?.members
                      ?.map((item2: any) => item2?.id)?.includes(item?.id))
                      ?.map((el) => ({ id: el?.id, value: el?.name })),
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
                {groupdetails?.members?.length != 0 ? (
                  groupdetails?.members?.map((item: any, index: number) => {
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
              {/* {groupdetails?.length > 2 &&
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
    </AnimatePresence>
  )
}
