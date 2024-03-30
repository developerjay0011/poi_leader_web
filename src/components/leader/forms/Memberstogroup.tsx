import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { tryCatch } from '@/config/try-catch'
import { Input } from '@/components/Input'
import { FaPlus } from 'react-icons/fa6'
import { AddMember, ImportDirectories, getGroups } from '@/redux_store/group/groupAPI'
import { groupActions } from '@/redux_store/group/groupSlice'
import { BsFolderFill } from 'react-icons/bs'
import * as XLSX from 'xlsx';
import { FaFileExcel } from "react-icons/fa";
import { getDirectory } from '@/redux_store/directory/directoryApi'
import { directoryAction } from '@/redux_store/directory/directorySlice'
import moment from 'moment'

interface MemberstogroupFormProp {
  setShowMember: (data: any) => void
  showMember: any
  selectGroup: any
  setSelectGroup: any
}

export interface memeber {
  memeber_id: ''
  excel: any
}
export interface Person {
  name: string;
  mobile: string | number;
  email: string;
  dob: string | number | Date;
  gender: string;
  occupation: string;
  qualification: string;
  whatsapp_no: string | number;
  address: string;
}

export const MembersToGroup: FC<MemberstogroupFormProp> = ({ setShowMember, showMember, selectGroup, setSelectGroup }) => {
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const { groups } = cusSelector((state) => state.group);
  const { register, handleSubmit, formState: { errors } } = useForm<memeber>({})
  const [datas, setData] = useState([]);
  const [file, setFile] = useState([]) as any
  const requiredKeys = [
    "name",
    "mobile",
    "email",
    "dob",
    "gender",
    "occupation",
    "qualification",
    "whatsapp_no",
    "address"
  ];

  function hasMissingKeys(people: Partial<Person>[]): boolean {
    return people.some(person =>
      requiredKeys.some(key => !(key in person))
    );
  }

  const CallApi = async (data: any) => {
    tryCatch(
      async () => {
        if (showMember == "Upload Directory") {
          if (hasMissingKeys(datas) == false) {
            console.log("All keys exist in the object.");
          } else {
            dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Some filed are missing in the excel ,Please refer to excel example." }))
            return
          }
          if (datas?.length > 0) {
            if (datas?.filter((item: any) => item?.name == "")?.length > 0) {
              dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Enter all the names" }))
              return
            }
            if (datas?.filter((item: any) => item?.mobile == "")?.length > 0) {
              dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Enter Enter Proper Mobile" }))
              return
            }
            if (datas?.filter((item: any) => item?.email == "")?.length > 0) {
              dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Enter all the Email" }))
              return
            }
            if (datas?.filter((item: any) => item?.dob == "")?.length > 0) {
              dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Enter all the dob" }))
              return
            }
            if (datas?.filter((item: any) => item?.gender == "")?.length > 0) {
              dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Enter all the gender" }))
              return
            }
            if (datas?.filter((item: any) => item?.address == "")?.length > 0) {
              dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Enter all the address" }))
              return
            }
            var directories = [] as any
            for (let i = 0; i < datas.length; i++) {
              const element = datas[i] as any
              directories.push({
                "name": element?.name,
                "mobile": typeof element?.mobile === "number" ? String(element?.mobile) : element?.mobile,
                "email": element?.email,
                "dob": element?.dob ? moment(new Date(Math.round((element?.dob - 25569) * 86400 * 1000))).format("YYYY-MM-DD") : "",
                "gender": element?.gender,
                "occupation": element?.occupation,
                "qualification": element?.qualification,
                "whatsapp_no": typeof element?.whatsapp_no === "number" ? String(element?.mobile) : element?.whatsapp_no,
                "address": element?.address,
              })
            }
            const body = {
              leaderid: userDetails?.leaderId,
              "groupid": data?.groupid,
              directories: directories
            }
            const response = await ImportDirectories(body);
            if (response?.success) {
              const Groups = await getGroups(userDetails?.leaderId as string);
              if (Array.isArray(Groups)) dispatch(groupActions.storeGroups(Groups));
              const Data = await getDirectory(userDetails?.leaderId as string);
              dispatch(directoryAction.storedirectory(Data))
              setShowMember('')
              setSelectGroup([])
              dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
            } else {
              dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
            }
          } else {
            dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Please Enter Proper Excel" }))
          }
          return
        } else {
          const body = {
            leaderid: userDetails?.leaderId,
            "groupid": data?.groupid,
            "memberids": selectGroup?.map((item: any) => item?.id)
          }
          const response = await AddMember(body);
          if (response?.success) {
            const Groups = await getGroups(userDetails?.leaderId as string);
            if (Array.isArray(Groups)) dispatch(groupActions.storeGroups(Groups));
            const Data = await getDirectory(userDetails?.leaderId as string);
            dispatch(directoryAction.storedirectory(Data))
            setShowMember('')
            setSelectGroup([])
            dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          } else {
            dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
          }
        }
      }
    )
  }
  const handleFileChange = (event: any) => {
    setFile(event.target.files)
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' }); // Use 'array' for JavaScript object output
      const worksheetName = workbook.SheetNames[0]; // Get the first worksheet name (adjust if needed)
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert worksheet to JavaScript object
      setData(jsonData as any); // Update state with the converted data
    };
    reader.readAsArrayBuffer(file);
  };


  return (
    <div className='px-5 py-3'>
      <form className="flex flex-col col-span-full gap-5" onSubmit={handleSubmit(CallApi)}>
        <Input
          register={register}
          errors={errors}
          title="Select Group"
          type="select"
          id={"groupid"}
          required
          validations={{
            required: "group is required",
          }}
          selectField={{
            title: "select group",
            options: groups?.map((item) => ({ id: item?.id, value: item?.name })),
          }}
        />
        {showMember == "Upload Directory" &&
          <div className="flex col-span-full gap-5">
            <label
              htmlFor="excel"
              className={`flex flex-col gap-2 w-max`}
              onClick={() => { setFile([]) }}
            >
              <span className="capitalize font-[500]">Select Excel <strong className='text-red-500'>*</strong></span>
              <input
                type="file"
                id="excel"
                className="hidden"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                key={file.length}
                value=""
              />
              <div className="flex items-center cursor-pointer gap-2">
                <BsFolderFill className="text-2xl" />
                {file?.[0]?.name ? `${file?.[0]?.name}` : "No file selected"}
              </div>
            </label>
            <label id="exampleexcel" className={`flex flex-col  gap-2 w-max`}>
              <span className="capitalize font-[500]">Excel Example</span>
              <a href='http://api.politicianofindia.com:4005/wwwroot/data.xlsx' target="_blank" rel="noopener noreferrer" download>
                <FaFileExcel className="text-2xl" />
              </a>
            </label>
          </div>
        }

        <div className='w-full bg-zinc-200 h-[1px] d col-span-full ' />

        <button
          type="submit"
          className="px-5 self-end h-[40px] w-max bg-orange-500 text-orange-50 rounded-md text-sm 
                capitalize transition-all hover:bg-orange-600 items-center flex gap-2"
        >
          <FaPlus className='text-1xl' /> {showMember}
        </button>
      </form>
    </div>
  )
}
