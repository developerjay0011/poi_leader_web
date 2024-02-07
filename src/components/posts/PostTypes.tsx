"use client";

import { FC, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { MdReport } from "react-icons/md";
import { AnimatePresence, motion as m } from "framer-motion";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { cusSelector } from "@/redux_store/cusHooks";

interface PostOptionsProps {
  onClose: () => void;
  accessTypeOptions: any;
}

export const PostTypes: FC<PostOptionsProps> = ({
  onClose,
  accessTypeOptions,
}) => {
  const selectOption = (data: string) => {
    accessTypeOptions(data);
  };

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center z-50 bg-white w-36 rounded-sm shadow-lg absolute top-full right-0"
      >
        <button
          className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
          onClick={() => {
            selectOption("openToAll");
            onClose();
          }}
        >
          open To All
        </button>
        <button
          onClick={() => {
            selectOption("followers");
            onClose();
          }}
          className="flex items-center gap-2 last_noti capitalize px-6 py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all"
        >
          Followers
        </button>
      </m.div>
    </>
  );
};
