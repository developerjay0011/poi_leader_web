"use client";
import { FC, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { AnimatePresence, motion as m } from "framer-motion";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { IoSend } from "react-icons/io5";
interface AgendaOptionsProps {
  deleteAgendaHandler?: () => void;
  editAgendaHandler?: () => void;
  postAgendaHandler?: () => void;
  onClose: () => void;
  ispost: any
}

export const AgendaOptions: FC<AgendaOptionsProps> = ({
  editAgendaHandler,
  deleteAgendaHandler,
  postAgendaHandler,
  onClose,
  ispost
}) => {
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col z-50 bg-white rounded-sm shadow-lg absolute top-full right-0 rounded-xl border overflow-hidden"
      >
        {typeof editAgendaHandler == "function" &&
          <button
            className="flex items-center gap-2  capitalize px-6 py-2 hover:bg-orange-500 hover:text-orange-50 transition-all"
            onClick={editAgendaHandler}
          >
            <FaEdit className="text-xl" /> Edit
          </button>
        }
        {(!ispost && typeof postAgendaHandler == "function") &&
          <button
            className="flex items-center gap-2  capitalize px-6 py-2 hover:bg-orange-500 hover:text-orange-50 transition-all"
            onClick={postAgendaHandler}
          >
            <IoSend className="text-xl" /> Post
          </button>
        }

        <button
          onClick={() => {
            onClose()
            setShowConfirmBox(true);
          }}
          className="flex items-center gap-2  capitalize px-6 py-2 hover:bg-orange-500 hover:text-orange-50 transition-all"
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
