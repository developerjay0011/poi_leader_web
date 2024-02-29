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
import { ToastType } from "@/constants/common";
import { getEvents, saveEvent } from "@/redux_store/event/eventApi";
import { eventAction } from "@/redux_store/event/eventSlice";
import { EventTable } from "../event/EventTable";
import moment from "moment";
import { LoadingComponent } from "@/utils/LoadingComponent";

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
  const [editEventData, setEditEventData] = useState<any | null>();
  const [loading, setLoading] = useState(false);

  const dispatch = cusDispatch();
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { userDetails } = cusSelector((state) => state.auth);
  const { event } = cusSelector((state) => state.event);

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
      getEvent()
   
    })();
  }, [userDetails, dispatch, leaderProfile?.id]);
  const getEvent =async () => {
    tryCatch(
      async () => {
        setLoading(true)
        const Data = await getEvents(leaderProfile?.id as string);
        dispatch(eventAction.storeEvent(Data))
        setLoading(false)
      }
    )
  }
  const formSubmitHandler = async (data: UserDetails) => {
    tryCatch(
      async () => {
       

        const formData = new FormData();
        formData.append("id", isEdit ? editEventData?.id : "");
        formData.append("leaderid", leaderProfile?.id || "");
        formData.append("title", data?.title || "");
        formData.append("description", data?.description || "");
        formData.append("event_type", data?.event_type || "");
        formData.append("location", data?.location || "");
        formData.append("notes", data?.notes || "");
        formData.append("start_datetime", moment(data?.start_datetime).format("YYYY-MM-DD hh:mm:ss") || "");
        formData.append("end_datetime", moment(data?.end_datetime).format("YYYY-MM-DD hh:mm:ss") || "");
        formData.append("ispublic", (data?.access == "Open To All" ? true : false) as any);
        if (data?.attachments?.length != 0) {
          for (let i = 0; i < data?.attachments?.length; i++) {
            const element = data?.attachments?.[i]
            formData.append("attachments", element)
          }
        } else {
          formData.append("attachments",[] as any)
        }
       
        formData.append("saved_by_type", userDetails?.usertype.replace('emerging ',"") || "");
        formData.append("saved_by", userDetails?.id || "");
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
    console.log(data);
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
  };

  return (
    <>
      <section className="flex flex-col border rounded-md bg-white w-full">
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize border-b">
          my events
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
                    {event?.length > 10 && <option value={event?.length}>{event?.length}</option>}
                  </select>
                </label>
              </div>
            </section>

            <section className="flex flex-col gap-5 max-[550px]:ml-auto max-[460px]:mt-4">
          
              {/* FILTERS */}
              <div className="flex items-center gap-3 justify-end">
                {/* SEARCH FILTER */}
                <label className="relative">
                  <input
                    type="search"
                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all"
                    placeholder="search Event"
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
              onClick={() => {setIsEvent(true),setIsEdit(false),reset()}}
            >
              Add Event
            </button>
          </div>
          {/* Event Table */}
          <EventTable
            
            searchStr={searchString}
            isEvent={isEvent}
            editEvent={editEvent}
          />
          {loading  && <LoadingComponent rows={2} columns={6} />}

          {/* {!loading  && (
            <TableWrapper
              heading='manage developments'
              // addBtnClickFn={openModal}
              addBtnTitle='add development'
              searchFilterFn={(val: string) => setSearchString(val)}
              changeFilterFn={(val: number) => {
                dispatch(manageDevelopmentAction.setCurPageNo(1))
                dispatch(manageDevelopmentAction.setFilterAmount(val))
              }}
              changePageNo={(val: number) =>
                dispatch(manageDevelopmentAction.setCurPageNo(val))
              }
              curDataCount={curDataCount}
              curPageNo={curPageNo}
              filterDataCount={filterDataCount}
              totalCount={totalCount}
              children={
                <ManageDevelopementTable
                  searchStr={searchFilter}
                  categoryFilter={categoryFilter}
                />
              }
              addedFilters={AdditionalFiltersJSX}
            />
          )} */}
        </section>
      </section>

      {/* Add Event From  */}
      <AnimatePresence mode="wait">
        {isEvent && (
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
              <h2 className="mt-4 mb-8 text-3xl">Add Event/Task</h2>

              <form
                className="grid grid-cols-1 gap-x-4 gap-y-5"
                onSubmit={handleSubmit(formSubmitHandler)}
              >
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
                    /> <Input
                      errors={errors}
                      id='end_datetime'
                      register={register}
                      title='End Date & Time'
                      type='datetime-local'
                      required
                      validations={{
                        required: 'Date of Birth is required',
                      }}
                    />
                 
                  </div>)}
               
                <div className="flex justify-end col-span-full gap-2 mt-5">
                  <a
                    className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
                    onClick={() => {
                      setIsEvent(false), setIsEdit(false);
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
