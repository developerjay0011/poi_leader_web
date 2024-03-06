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
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { userDetails } = cusSelector((state) => state.auth);

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

          const Data = await getDirectory(leaderProfile?.id as string);
          dispatch(directoryAction.storedirectory(Data))

        }
      )
    })();
  }, [userDetails, dispatch, leaderProfile?.id, isDirectory]);

  const formSubmitHandler = async (data: UserDetails) => {
    tryCatch(
      async () => {
        const currentDate = new Date().toISOString();

        const body = {
          id: isEdit ? editDirectoryData?.id : null,
          leaderid: leaderProfile?.id || "",
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
      <section className="flex flex-col border rounded-md bg-white w-full">
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize border-b">
          my Directory
        </h2>

        <section className="flex flex-col gap-5 p-5 mt-5">
          <div className="flex justify-between items-end max-[550px]:flex-col max-[550px]:items-start">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Filters</h2>

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

              {/* FILTERS */}
              <div className="flex items-center gap-3 justify-end">
                {/* SEARCH FILTER */}
                <label className="relative">
                  <input
                    type="search"
                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all"
                    placeholder="search directory"
                    value={searchString}
                    onChange={(e) =>
                      setSearchString(e.target.value.toLowerCase())
                    }
                  />
                  {searchString.length === 0 && (
                    <button className="absolute top-[8px] right-2">
                      <FiSearch className="stroke-gray-400" />
                    </button>
                  )}
                </label>
              </div>
            </section>
          </div>
          <div className="flex items-center justify-end gap-3">
            {/* ADD OR EDIT Button */}
            <button
              className="px-5 py-2 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600"
              onClick={() => setIsDirectory(true)}
            >
              Add Directory
            </button>
          </div>
          {/* Directory Table */}
          <DirectoryTable
            searchStr={searchString}
            isDirectory={isDirectory}
            editDirectory={editDirectory}
          />
        </section>
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
              <h2 className="mt-4 mb-8 text-3xl">Add Directory</h2>

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

                <div className="flex justify-end col-span-full gap-2 mt-5">
                  <a
                    className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
                    onClick={() => {
                      setIsDirectory(false), setIsEdit(false);
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
    </>
  );
};
