
import { tryCatch } from "@/config/try-catch";
import { ToastType } from "@/constants/common";
import { commonActions } from "@/redux_store/common/commonSlice";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { deleteEvent, getEvents } from "@/redux_store/event/eventApi";
import { eventAction } from "@/redux_store/event/eventSlice";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { ErrorTableRow } from "@/utils/ErrorTableRow";
import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

interface EventTableProps {
  searchStr: string;
  isEvent: boolean;
  editEvent: any
}

export const EventTable: FC<EventTableProps> = ({
  searchStr,
  isEvent,
  editEvent
}) => {
  const [showConfirmBox, setShowConfirmBox] = useState<boolean>(false);
  const { event } = cusSelector((state) => state.event);
  const dispatch = cusDispatch();
  const [deleteValue, setDeleteValue] = useState({ id: "", leaderid: "" });
  const filterDataOnEvent = event?.filter((el: any) =>
    searchStr ? el?.title.includes(searchStr) : el
  );
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

  const onClose = () => {
    setShowConfirmBox(false);
  };

  return (
    <>
      <table className="w-full mt-5">
        <thead className="text-left">
          <tr className="bg-orange-500 text-orange-50">
            <th className="p-2 font-medium">S.No</th>
            <th className="p-2 font-medium">Title</th>
            <th className="p-2 font-medium">Description</th>
            <th className="p-2 font-medium">Notes</th>
            <th className="p-2 font-medium">Access</th>
            <th className="p-2 font-medium">Location</th>
            <th className="p-2 font-medium">Start Time</th>
            <th className="p-2 font-medium">End Time</th>
            <th className="p-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {filterDataOnEvent?.length > 0 ? (
            filterDataOnEvent?.map((Event: any, index: number) => {
              return (
                <>
                  <tr key={index}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{Event.title}</td>
                    <td className="p-2">{Event.description}</td>
                    <td className="p-2">{Event.notes}</td>
                    <td className="p-2">{Event.ispublic ? "Public" : "Private"}</td>
                    <td className="p-2">{Event.location}</td>
                    <td className="p-2">{Event.start_datetime}</td>
                    <td className="p-2">{Event.end_datetime}</td>
                    <td className="p-2 flex  gap-3">
                      <button
                        className="flex items-center gap-2  capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 transition-all"
                        onClick={() => editEvent(Event)}
                      >
                        <FaEdit className="text-xl" />
                      </button>

                      <button
                        onClick={() =>
                          confirmDelete(Event.id, Event.leaderid)
                        }
                        className="flex items-center gap-2  capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 transition-all"
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
