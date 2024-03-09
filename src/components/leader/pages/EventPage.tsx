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
        const formData = new FormData();
        formData.append("id", isEdit ? editEventData?.id : "");
        formData.append("leaderid", userDetails?.leaderId || "");
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
  };

  return (
    <>
      <section className="flex-1">
        <PeoplesComponentWrapper
          heading='my events'
          searchStr={searchString}
          setSearchStr={setSearchString}
          rightButton={
            <div className="flex items-center justify-end">
              <button
                className={`flex items-center gap-2 self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                onClick={() => { setIsEvent(true), setIsEdit(false), reset() }}
              >
                Add Event
              </button>
            </div>
          }
        >
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
                  {event?.length > 10 && <option value={event?.length}>{event?.length}</option>}
                </select>
              </label>
            </div>
          </section>
          {loading ?
            <LoadingComponent rows={2} columns={6} />
            :
            <EventTable
              searchStr={searchString}
              isEvent={isEvent}
              editEvent={editEvent}
            />
          }
        </PeoplesComponentWrapper>
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
            <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center main_scrollbar`}>
              <m.section
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
                <button
                  type='button'
                  onClick={() => { setIsEvent(false), setIsEdit(false); }}
                  className='absolute top-3 right-3 z-40'>
                  <BiX className='text-3xl' />
                </button>
                <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                  {isEdit ? 'Edit Event/Task' : 'Add Event/Task'}
                </h3>
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
              </m.section>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
