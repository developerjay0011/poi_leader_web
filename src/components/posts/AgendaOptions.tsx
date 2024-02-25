"use client";

import { FC, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { AnimatePresence, motion as m } from "framer-motion";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { IoSend } from "react-icons/io5";
interface AgendaOptionsProps {
  deleteAgendaHandler: () => void;
  editAgendaHandler: () => void;
  postAgendaHandler: () => void;
  onClose: () => void;
  userId: string;
}

export const AgendaOptions: FC<AgendaOptionsProps> = ({
  editAgendaHandler,
  deleteAgendaHandler,
  postAgendaHandler,
  onClose,
  userId,
}) => {
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col z-50 bg-white rounded-sm shadow-lg absolute top-full right-0"
      >
        <button 
        className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
          onClick={editAgendaHandler}
        >
          <FaEdit className="text-xl" /> Edit
        </button>
        <button
          className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
          onClick={postAgendaHandler}
        >
          <IoSend className="text-xl" /> Post
        </button>
          <button
          onClick={() => {
            onClose()
              setShowConfirmBox(true);
            }}
            className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
          >
            <BsTrash3Fill /> Delete
          </button>
       

      </m.div>

      <AnimatePresence mode="wait">
        {showConfirmBox && (
          <ConfirmDialogBox
            noAllowed={false}
            onCancel={() => {
              setShowConfirmBox(false);
              onClose();
            }}
            onOk={deleteAgendaHandler}
          />
        )}
      </AnimatePresence>
    </>
  );
};
