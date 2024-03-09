"use client";
import { FC, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { DirectoryTable } from "../directory/DirectoryTable";
import { AnimatePresence } from "framer-motion";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { motion as m } from "framer-motion";
import { BsFillPatchExclamationFill } from "react-icons/bs";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { tryCatch } from "@/config/try-catch";
import { getDirectory, saveDirectory } from "@/redux_store/directory/directoryApi";
import { directoryAction } from "@/redux_store/directory/directorySlice";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { BiX } from "react-icons/bi";
import { PeoplesComponentWrapper } from "@/utils/PeoplesComponentWrapper";
import { TableWrapper } from "@/utils/TableWrapper";

interface DirectoryPageProps { }

interface Edit {
  id: string;
  leaderid: string;
  name: string;
  mobile: string;
  email: string;
  isactive: boolean;
  createddate: string;
}

export const DirectoryPage: FC<DirectoryPageProps> = () => {
  const [searchString, setSearchString] = useState("");
  const [isDirectory, setIsDirectory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editDirectoryData, setEditDirectoryData] = useState<Edit | null>();
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const { directory } = cusSelector((state) => state.directory);
  const [filterDataCount, setFilterAmount] = useState(5)
  const [curPageNo, setCurPageNo] = useState(1)
  const changeCurPageNo = (page: number) => setCurPageNo(page)
  const changeFilterCount = (val: number) => {
    setFilterAmount(val)
    setCurPageNo(1)
  }
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserDetails>();

  useEffect(() => {
    (async () => {
      tryCatch(
        async () => {
          const Data = await getDirectory(userDetails?.leaderId as string);
          dispatch(directoryAction.storedirectory(Data))
        }
      )
    })();
  }, [dispatch, userDetails?.leaderId, isDirectory]);

  const formSubmitHandler = async (data: UserDetails) => {
    tryCatch(
      async () => {
        const currentDate = new Date().toISOString();

        const body = {
          id: isEdit ? editDirectoryData?.id : null,
          leaderid: userDetails?.leaderId || "",
          name: data?.Name,
          mobile: data?.Phone,
          email: data?.Email,
          isactive: true,
          createddate: currentDate,
        };

        const response = await saveDirectory(body);
        if (response?.success) {
          setIsDirectory(false);
          setIsEdit(false);
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
        reset();
      })
  };

  const editDirectory = async (data: any) => {
    setEditDirectoryData(data);
    setIsDirectory(true);
    setIsEdit(true);
    setValue("Name", data.name);
    setValue("Phone", data.mobile);
    setValue("Email", data.email);
  };

  return (
    <>
      {/* 
      <TableWrapper
        heading='my Directory'
        addBtnTitle='Add Directory'
        addBtnClickFn={setIsDirectory}
        curDataCount={1}
        totalCount={directory?.length}
        changeFilterFn={changeFilterCount}
        filterDataCount={filterDataCount}
        changePageNo={changeCurPageNo}
        curPageNo={curPageNo}
        searchFilterFn={setSearchString}
        jsonDataToDownload={[]}
      >
        <DirectoryTable
          searchStr={searchString}
          isDirectory={isDirectory}
          editDirectory={editDirectory}
        />
      </TableWrapper>
 */}

      <section className="flex-1">
        <PeoplesComponentWrapper
          heading='my Directory'
          searchStr={searchString}
          setSearchStr={setSearchString}
          rightButton={
            <div className="flex items-center justify-end">
              <button
                className={`self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                onClick={() => setIsDirectory(true)}
              >
                Add Directory
              </button>
            </div>
          }
        >
          <section className="flex flex-col gap-5 ">
            <div className="flex justify-between items-end max-[550px]:flex-col max-[550px]:items-start">
              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-3 max-[700px]:flex-col max-[700px]:items-start">
                  <label htmlFor="filter" className="flex items-center gap-2">
                    <span>Sort by</span>
                    <select
                      id="filter"
                      className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                    </select>
                  </label>
                </div>
              </section>

              <section className="flex flex-col gap-5 max-[550px]:ml-auto max-[460px]:mt-4">
                {/* CTA'S */}
                <div className="flex items-center justify-end gap-3">
                  {/* ADD OR EDIT Button */}
                  <button className="px-5 py-2 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600">
                    send message
                  </button>
                </div>
              </section>
            </div>
            <DirectoryTable
              searchStr={searchString}
              isDirectory={isDirectory}
              editDirectory={editDirectory}
            />
          </section>
        </PeoplesComponentWrapper>
      </section>
      {/* Add Directory From  */}
      <AnimatePresence mode="wait">
        {isDirectory && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
              }`}
          >
            <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center main_scrollbar`}>
              <m.section
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
                <button
                  type='button'
                  onClick={() => { setIsDirectory(false), setIsEdit(false); }}
                  className='absolute top-3 right-3 z-40'>
                  <BiX className='text-3xl' />
                </button>
                <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                  {isEdit ? "Edit Directory" : "Add Directory"}
                </h3>
                <form className="grid grid-cols-1 gap-x-4 gap-y-5 px-7 py-5" onSubmit={handleSubmit(formSubmitHandler)}>
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
                    errors={errors}
                    id="Phone"
                    placeholder="Phone"
                    register={register}
                    title="Phone"
                    type="text"
                    required
                    validations={{
                      required: "First name is required",
                    }}
                  />
                  <Input
                    errors={errors}
                    id="Email"
                    placeholder="Email"
                    register={register}
                    title="Email"
                    type="text"
                    required
                    validations={{
                      required: "First name is required",
                    }}
                  />

                  <div className='w-full bg-zinc-200 h-[1px] d col-span-full ' />
                  <div className="flex justify-end col-span-full gap-2">
                    <a
                      className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
                      onClick={() => {
                        setIsDirectory(false), setIsEdit(false);
                      }}
                    >
                      close
                    </a>
                    <button
                      className="rounded-full px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </m.section>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
