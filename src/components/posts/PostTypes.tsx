"use client";

import { FC } from "react";
import { motion as m } from "framer-motion";

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
            selectOption("open");
            onClose();
          }}
        >
          Open To All
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
