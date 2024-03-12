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
import { SendMessage } from "../forms/SendMessageFrom";
import { Modal } from "@/components/modal/modal";

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
  const [selectGroup, setSelectGroup] = useState([])
  const [messagemodal, setMessagemodal] = useState(false) as any
  const [isEdit, setIsEdit] = useState(false);
  const [editDirectoryData, setEditDirectoryData] = useState<Edit | null>();
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const { register, setValue, watch, formState: { errors }, handleSubmit, reset, } = useForm<UserDetails>();

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
                <button onClick={() => {
                  if (selectGroup?.length > 0) {
                    setMessagemodal(true)
                  } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Please Select Directory" }))
                  }
                }} className="px-5 py-1 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600">
                  send message
                </button>
              </div>
            </section>
          </div>
          <DirectoryTable
            searchStr={searchString}
            isDirectory={isDirectory}
            editDirectory={editDirectory}
            selectGroup={selectGroup}
            setSelectGroup={setSelectGroup}
          />
        </section>
      </PeoplesComponentWrapper>
      {/* Add Directory From  */}
      {isDirectory &&
        <Modal heading={isEdit ? "Edit Directory" : "Add Directory"} onClose={() => { setIsDirectory(false), setIsEdit(false); }}>
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
        </Modal>
      }
      {messagemodal &&
        <SendMessage
          heading={"Message"}
          onClose={() => { setMessagemodal(false) }}
        />
      }
    </>
  );
};
