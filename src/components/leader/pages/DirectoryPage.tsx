"use client";
import { FC, useEffect, useState } from "react";
import { DirectoryTable } from "../directory/DirectoryTable";
import { UserDetails } from "@/utils/typesUtils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { tryCatch } from "@/config/try-catch";
import { getDirectory, saveDirectory } from "@/redux_store/directory/directoryApi";
import { directoryAction } from "@/redux_store/directory/directorySlice";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { PeoplesComponentWrapper } from "@/utils/PeoplesComponentWrapper";
import { SendMessage } from "../forms/SendMessageFrom";
import { Modal } from "@/components/modal/modal";
import { MembersToGroup } from "../forms/Memberstogroup";
import { MultiSelect } from "@/utils/MultiSelect";
import { EducationDropdowns, GenderDropdowns, MaritalStatusDropdowns } from '@/constants/common'
import moment from "moment";

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
  const { groups } = cusSelector((state) => state.group);
  const [selectGroup, setSelectGroup] = useState([])
  const [showMember, setShowMember] = useState('')
  const [messagemodal, setMessagemodal] = useState(false) as any
  const [isEdit, setIsEdit] = useState(false);
  const [editDirectoryData, setEditDirectoryData] = useState<Edit | null>();
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const { register, setValue, watch, formState: { errors }, handleSubmit, reset, } = useForm<UserDetails | any>();
  const setToFieldValue = (val: any) => { setValue("groups", val) };
  var selectedgroups = watch("groups")

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

  const formSubmitHandler = async (data: any) => {
    tryCatch(
      async () => {
        const currentDate = new Date().toISOString();

        const body = {
          leaderid: userDetails?.leaderId || "",
          mobile: data?.mobile,
          isactive: true,
          createddate: currentDate,
          ...data,
          id: isEdit ? editDirectoryData?.id : null,
          groups: data?.groups?.map((item: any) => item?.id)
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
    setValue("name", data.name);
    setValue("mobile", data.mobile);
    setValue("email", data.email);
    setValue("groups", data?.groups);
    setValue("dob", moment(data?.dob).format("YYYY-MM-DD"));
    setValue("gender", data?.gender);
    setValue("occupation", data?.occupation);
    setValue("qualification", data?.qualification);
    setValue("whatsapp_no", data?.whatsapp_no);
    setValue("address", data?.address);
  };

  return (
    <>
      <PeoplesComponentWrapper
        heading='my Directory'
        searchStr={searchString}
        setSearchStr={setSearchString}
        rightButton={
          <div className="flex items-center justify-end">
            <button className={`self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`} onClick={() => { reset(); setIsDirectory(true) }}>
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
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => {
                  if (selectGroup?.length > 0) {
                    setMessagemodal(true)
                  } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Please Select Directory" }))
                  }
                }} className="px-5 py-1 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600">
                  send message
                </button>
                <button onClick={() => {
                  if (selectGroup?.length > 0) {
                    setShowMember("Add To Group")
                  } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Please Select Directory" }))
                  }
                }} className="px-5 py-1 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600">
                  Add To Group
                </button>
                <button onClick={() => { setShowMember("Upload Directory") }} className="px-5 py-1 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600">
                  Upload Directory
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
      {isDirectory &&
        <Modal heading={isEdit ? "Edit Directory" : "Add Directory"} onClose={() => { setIsDirectory(false), setIsEdit(false); }}>
          <form className="grid gap-5 grid-cols-2 gap-x-4 gap-y-5 px-7 py-5" onSubmit={handleSubmit(formSubmitHandler)}>
            <Input
              errors={errors}
              id="name"
              placeholder="First name"
              register={register}
              title="First name"
              type="text"
              required
              validations={{
                required: "First name is required",
              }}
            />
            <Input
              errors={errors}
              id="mobile"
              placeholder="Mobile no."
              register={register}
              title="Mobile no."
              type="number"
              required
              validations={{
                required: "mobile is required",
                validate: {
                  notAValidNo(val) {
                    return (
                      val.toString().length === 10 ||
                      "please enter a valid phone no"
                    );
                  },
                },
              }}
            />
            <Input
              errors={errors}
              id="email"
              placeholder="Email"
              register={register}
              title="Email"
              type="text"
              required
              validations={{
                required: "First name is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message:
                    "Please enter a valid email EX: something@example.com",
                },
              }}
            />
            <MultiSelect
              title={"Group"}
              svalue={Array.isArray(selectedgroups) ? groups?.filter((item) => selectedgroups?.includes(item?.id))?.map((item) => ({ id: item?.id, value: item?.name })) : []}
              placeholder="select Group"
              options={groups?.map((item) => ({ id: item?.id, value: item?.name }))}
              setValue={(value: any) => { setToFieldValue(value) }}
            />
            <Input
              register={register as any}
              errors={errors}
              title="Select Birthdate"
              type="date"
              id={"dob" as any}
              validations={{
                required: "group is required",
              }}
            />
            <Input
              register={register as any}
              errors={errors}
              title="Select Gender"
              type="select"
              id={"gender" as any}
              validations={{
                required: "gender is required",
              }}
              selectField={{
                options: GenderDropdowns,
                title: "select gender"
              }}
            />
            <Input
              register={register as any}
              errors={errors}
              title="Select Occupation"
              placeholder="Select Occupation"
              type="text"
              id={"occupation" as any}
              validations={{
                required: "occupation is required",
              }}
            />
            <Input
              register={register as any}
              errors={errors}
              title="Select Oualification"
              type="select"
              id={"qualification" as any}
              selectField={{
                options: [
                  { id: 'Below 10th', value: 'Below 10th' },
                  { id: '10th Pass', value: '10th Pass' },
                  { id: '12th paPassss', value: '12th Pass' },
                  { id: 'Under Graduate', value: 'Under Graduate' },
                  { id: 'Post Graduate', value: 'Post Graduate' },
                  { id: 'P.H.D', value: 'P.H.D' },
                  { id: 'Certificate', value: 'Certificate' },
                  { id: 'Others', value: 'Others' }
                ],
                title: "select qualification"
              }}
            />
            <Input
              errors={errors}
              id="whatsapp_no"
              placeholder="Whatsapp no."
              register={register}
              title="Whatsapp no."
              type="number"
              validations={{
                validate: {
                  notAValidNo(val) {
                    return (
                      val.toString().length === 10 ||
                      "please enter a valid whatsapp no"
                    );
                  },
                },
              }}
            />
            <Input
              errors={errors}
              id="address"
              placeholder="Address."
              register={register}
              title="Address"
              type="textarea"
              fullWidth
            />
            <div className='w-full bg-zinc-200 h-[1px] d col-span-full ' />
            <div className="flex justify-end col-span-full gap-2">
              <button
                className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
                onClick={() => {
                  setIsDirectory(false), setIsEdit(false);
                }}
              >
                close
              </button>
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
      {showMember && (
        <Modal heading={showMember} onClose={() => { setShowMember('') }}>
          <MembersToGroup
            showMember={showMember}
            setShowMember={setShowMember}
            selectGroup={selectGroup}
            setSelectGroup={setSelectGroup}
          />
        </Modal>
      )}
    </>
  );
};
