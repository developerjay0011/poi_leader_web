"use client";

import { FC, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { MdReport } from "react-icons/md";
import { AnimatePresence, motion as m } from "framer-motion";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { cusSelector } from "@/redux_store/cusHooks";

interface PostOptionsProps {
  deletePostHandler: () => void;
  onClose: () => void;
  userId: string;
}

export const PostOptions: FC<PostOptionsProps> = ({
  deletePostHandler,
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
        className="flex flex-col z-50 bg-white rounded-sm shadow-lg absolute top-full right-0 rounded-xl border overflow-hidden"
      >
        <button
          onClick={() => {
            setShowConfirmBox(true);
          }}
          className="flex items-center gap-2 last_noti capitalize px-6 py-2 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
        >
          <BsTrash3Fill /> delete
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
            onOk={() => {
              deletePostHandler();
              setShowConfirmBox(false);
              onClose();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
