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
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { commonActions } from "@/redux_store/common/commonSlice";
import { Savedby, ToastType } from "@/constants/common";
import { GetDashboardEvents, getEvents, saveEvent } from "@/redux_store/event/eventApi";
import { eventAction } from "@/redux_store/event/eventSlice";
import { EventTable } from "../event/EventTable";
import moment from "moment";
import { LoadingComponent } from "@/utils/LoadingComponent";
import { BiX } from "react-icons/bi";
import { PeoplesComponentWrapper } from "@/utils/PeoplesComponentWrapper";
import { Modal } from "@/components/modal/modal";
import { TableWrapper, searchFilterFunction } from "@/utils/TableWrapper";
import { getImageUrl } from "@/config/get-image-url";
import { CheckTime } from "@/utils/utility";

interface EventPageProps { }

interface Edit {
  id: string;
  leaderid: string;
  name: string;
  mobile: string;
  email: string;
  isactive: boolean;
  createddate: string;
}

export const EventPage: FC<EventPageProps> = () => {
  const [searchString, setSearchString] = useState("");
  const [isEvent, setIsEvent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [editEventData, setEditEventData] = useState<any | null>();
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const changeFilterData = (str: string) => setSearchFilter(str)
  const [filterDataCount, setFilterAmount] = useState(5)
  const [curPageNo, setCurPageNo] = useState(1)
  const changeCurPageNo = (page: number) => setCurPageNo(page)
  const changeFilterCount = (val: number) => {
    setFilterAmount(val)
    setCurPageNo(1)
  }
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const { event } = cusSelector((state) => state.event);
  const { register, setValue, watch, formState: { errors }, handleSubmit, reset, } = useForm<UserDetails>();
  const [attachments, setattachments] = useState([]) as any

  useEffect(() => {
    (async () => {
      getEvent()
    })();
  }, [userDetails, dispatch, userDetails?.leaderId]);

  const getEvent = async () => {
    tryCatch(
      async () => {
        setLoading(true)
        const Data = await getEvents(userDetails?.leaderId as string);
        dispatch(eventAction.storeEvent(Data))
        const DashboardEvents = await GetDashboardEvents(userDetails?.leaderId as string);
        dispatch(eventAction.storeDashboardevents(DashboardEvents))
        setLoading(false)
      }
    )
  }
  const formSubmitHandler = async (data: UserDetails) => {
    tryCatch(
      async () => {
        if (data?.start_datetime && data?.end_datetime) {
          if (CheckTime(data?.start_datetime, data?.end_datetime) == false) { return }
        }
        const formData = new FormData();
        formData.append("id", isEdit ? editEventData?.id : "");
        formData.append("leaderid", userDetails?.leaderId || "");
        formData.append("title", data?.title || "");
        formData.append("description", data?.description || "");
        formData.append("event_type", data?.event_type || "");
        formData.append("location", data?.location || "");
        formData.append("notes", data?.notes || "");
        formData.append("start_datetime", moment(data?.start_datetime).format("YYYY-MM-DD HH:mm:ss") || "");
        formData.append("end_datetime", moment(data?.end_datetime).format("YYYY-MM-DD HH:mm:ss") || "");
        formData.append("ispublic", (data?.access == "Open To All" ? true : false) as any);
        if (data?.attachments?.length != 0) {
          for (let i = 0; i < data?.attachments?.length; i++) {
            const element = data?.attachments?.[i]
            formData.append("attachments", element)
          }
        } else {
          formData.append("attachments", [] as any)
        }
        formData.append("saved_by_type", Savedby()?.saved_by_type || "");
        formData.append("saved_by", Savedby()?.saved_by || "");
        formData.append("deletedDocs", [] as any);
        const response = await saveEvent(formData);
        if (response?.success) {
          setIsEvent(false);
          setIsEdit(false);
          getEvent()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
        reset();
      })
  };

  const editEvent = async (data: any) => {
    setEditEventData(data);
    setIsEvent(true);
    setIsEdit(true);
    setValue("title", data?.title)
    setValue("description", data?.description);
    setValue("event_type", data?.event_type);
    setValue("location", data?.location);
    setValue("notes", data?.notes);
    setValue("notes", data?.notes);
    setValue("start_datetime", data?.start_datetime);
    setValue("end_datetime", data?.end_datetime);
    setValue("access", data?.access == true ? "Open To All" : "Followers");
    setattachments(data?.attachments);
  };



  const handleFilter = (event: any, statusFilter: any) => {
    var filteredResult = Array.isArray(event) ? [...event] : []
    if (filteredResult?.length > 0) {
      if (statusFilter !== '') {
        filteredResult = filteredResult?.filter(item => item?.event_type === statusFilter);
      }
    }

    return Array.isArray(event) ? searchFilterFunction(searchFilter, filteredResult, "title", { curPageNo, filterDataCount }) : { mainlist: [], filterlist: [] }
  };



  return (
    <>
      <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start m-5'>
        <TableWrapper
          heading='Manage events/Task'
          addBtnTitle='add Event/task'
          addBtnClickFn={() => {
            setIsEvent(true), setIsEdit(false), reset()
          }}
          curDataCount={1}
          totalCount={handleFilter(event, statusFilter)?.mainlist?.length}
          changeFilterFn={changeFilterCount}
          filterDataCount={filterDataCount}
          changePageNo={changeCurPageNo}
          curPageNo={curPageNo}
          searchFilterFn={changeFilterData}
          jsonDataToDownload={null}
          addedFilters={<label className="flex gap-2 items-center" htmlFor="status">
            <span className="font-medium">Type</span>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1 px-1 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
            >
              <option value="">All</option>
              <option value={'event'}>{'Event'}</option>
              <option value={'task'}>{'Task'}</option>
            </select>
          </label>
          }
        >
          <EventTable
            searchStr={searchString}
            isEvent={isEvent}
            editEvent={editEvent}
            events={handleFilter(event, statusFilter)?.filterlist}
          />
        </TableWrapper>
      </div>

      {isEvent && (
        <Modal heading={isEdit ? 'Edit Event/Task' : 'Add Event/Task'} onClose={() => { setIsEvent(false), setIsEdit(false); }}>
          <form className="grid grid-cols-1 gap-x-4 gap-y-5 px-7 py-5" onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="flex items-center justify-center gap-5">
              <Input
                errors={errors}
                id="title"
                placeholder="Title"
                register={register}
                title="Event Title"
                type="text"
                required
                validations={{
                  required: "First name is required",
                }}
              />
              <Input
                errors={errors}
                id='event_type'
                selectField={{
                  title: 'select type',
                  options: [{ id: 'event', value: 'event' }, { id: 'task', value: 'task' }],
                }}
                register={register}
                title='Type'
                type='select'
                required
                validations={{
                  required: 'Type is required',
                }}
              />
            </div>

            <Input
              errors={errors}
              id='description'
              register={register}
              title='Description'
              type='textarea'
              required
              rows={3}
              fullWidth
            />
            <Input
              errors={errors}
              id='notes'
              register={register}
              title='Notes'
              type='textarea'
              required
              rows={3}
              fullWidth
            />
            <Input
              errors={errors}
              id="attachments"
              placeholder="Attachments"
              register={register}
              title="Attachments"
              type="file"
              multiple={true}
            />
            {watch("event_type") === "event" && (
              <div className="flex items-center justify-center gap-5">
                <Input
                  errors={errors}
                  id='access'
                  selectField={{
                    title: 'Allow Access',
                    options: [{ id: 'Open To All', value: 'Open To All' }, { id: 'Followers', value: 'Followers' }],
                  }}
                  register={register}
                  title='Access'
                  type='select'
                  required
                  validations={{
                    required: 'Type is required',
                  }}
                />


                <Input
                  errors={errors}
                  id="location"
                  placeholder="Location"
                  register={register}
                  title="Event location"
                  type="text"
                  required
                  validations={{
                    required: "First name is required",
                  }}
                />
              </div>)}
            {watch("event_type") === "event" && (
              <div className="flex items-center justify-center gap-5">
                <Input
                  errors={errors}
                  id='start_datetime'
                  register={register}
                  title='Start Date & Time'
                  type='datetime-local'
                  required
                  validations={{
                    required: 'Date of Birth is required',
                  }}
                  min={watch("start_datetime") ? watch("start_datetime") : moment().format("YYYY-MM-DD HH:mm:ss")}
                />
                <Input
                  errors={errors}
                  id='end_datetime'
                  register={register}
                  title='End Date & Time'
                  type='datetime-local'
                  required
                  validations={{
                    required: 'Date of Birth is required',
                  }}
                  min={watch("start_datetime")}
                />

              </div>)}
            {attachments?.map((el: any) => (
              <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
                {el.match(/[^/]+$/)[0]}
              </a>
            ))}
            <div className='w-full bg-zinc-200 h-[1px] d col-span-full ' />
            <div className="flex justify-end col-span-full gap-2">
              <a
                className="rounded-full px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
                onClick={() => {
                  setIsEvent(false), setIsEdit(false);
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
      )}
    </>
  );
};
