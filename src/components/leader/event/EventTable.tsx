
import { tryCatch } from "@/config/try-catch";
import { ToastType } from "@/constants/common";
import { commonActions } from "@/redux_store/common/commonSlice";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { deleteEvent, getEvents } from "@/redux_store/event/eventApi";
import { eventAction } from "@/redux_store/event/eventSlice";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { ErrorTableRow } from "@/utils/ErrorTableRow";
import { AnimatePresence } from "framer-motion";
import moment from "moment";
import { FC, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

interface EventTableProps {
  searchStr: string;
  isEvent: boolean;
  editEvent: any
  events: any
}

export const EventTable: FC<EventTableProps> = ({ searchStr, isEvent, editEvent, events }) => {
  const dispatch = cusDispatch();
  const [showConfirmBox, setShowConfirmBox] = useState<boolean>(false);
  const [deleteValue, setDeleteValue] = useState({ id: "", leaderid: "" });
  const onClose = () => { setShowConfirmBox(false) };
  const confirmDelete = (id: string, leaderid: string) => {
    setDeleteValue({
      id: id,
      leaderid: leaderid || "",
    });
    setShowConfirmBox(true);
  };
  const handleDelete = async () => {
    tryCatch(
      async () => {
        const response = await deleteEvent(deleteValue?.id as string, deleteValue?.leaderid as string);
        if (response?.success) {
          onClose();
          const Data = await getEvents(deleteValue?.leaderid as string);
          dispatch(eventAction.storeEvent(Data))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  };


  return (
    <>
      <table className='w-full my-8 border'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='font-semibold text-left py-2 p-2 border text-center w-[100px]'>S.No</th>
            <th className='font-semibold capitalize text-center py-2 p-2 border'>Title</th>
            <th className='font-semibold text-center py-2 px-2 border text-center'>Description</th>
            <th className='font-semibold text-center py-2 p-2 border'>Type</th>
            <th className='font-semibold text-center py-2 p-2 border w-[20%]'>Location</th>
            <th className='font-semibold text-center py-2 p-2 border'>Start Time</th>
            <th className='font-semibold text-center py-2 p-2 border'>End Time</th>
            <th className='font-semibold text-center py-2 p-2 border w-[100px]'>Actions</th>
          </tr>
        </thead>
        <tbody className="text-left border">
          {events?.length > 0 ? (
            events?.map((Event: any, index: number) => {
              return (
                <>
                  <tr className='border-b border-gray-300'>
                    <td className="text-center py-2 p-2 border">{Event.sr}.</td>
                    <td className="text-center py-2 p-2 border">{Event.title}</td>
                    <td className="text-center py-2 p-2 border">{Event.description}</td>
                    <td className="text-center py-2 p-2 border capitalize">{Event.event_type}</td>
                    <td className="text-center py-2 p-2 border w-[20%]">{Event.location}</td>
                    <td className="text-center py-2 p-2 border w-[200px]">{moment(Event.start_datetime).format("DD-M-YYYY hh:mm a")}</td>
                    <td className="text-center py-2 p-2 border w-[200px]">{Event?.event_type != "task" && moment(Event.end_datetime).format("DD-M-YYYY hh:mm a")}</td>
                    <td className='text-center py-2 pl-2 border printHide'>
                      <button
                        className='hover:scale-110 transition-all mr-3 ease-out duration-200 active:scale-100'
                        onClick={() => editEvent(Event)}
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        className='hover:scale-110 transition-all ease-out duration-200 active:scale-100'
                        onClick={() =>
                          confirmDelete(Event.id, Event.leaderid)
                        }>
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
      </table>
      <AnimatePresence mode="wait">
        {showConfirmBox && (
          <ConfirmDialogBox
            noAllowed={false}
            onCancel={() => {
              setShowConfirmBox(false);
              onClose();
            }}
            onOk={() => handleDelete()}
          />
        )}
      </AnimatePresence>
    </>
  );
};
