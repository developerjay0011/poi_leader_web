"use client";

import { FC } from "react";
import { motion as m } from "framer-motion";

interface PostOptionsProps {
  onClose: () => void;
  accessTypeOptions: any;
  accessType: string
}

export const PostTypes: FC<PostOptionsProps> = ({
  onClose,
  accessTypeOptions,
  accessType
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
        className="flex flex-col items-center z-50 bg-white w-36  overflow-hidden rounded-md shadow-md absolute bottom-8 right-0 rounded-xl border"   >
        <button
          className={`flex items-center gap-2 justify-center last_noti capitalize w-full text-center py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all ${accessType == "open" && "bg-orange-500 text-orange-50  "}`}
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
          className={`flex items-center gap-2 justify-center last_noti capitalize w-full text-center py-3 hover:bg-orange-500 hover:text-orange-50 hover:underline transition-all ${accessType == "followers" && "bg-orange-500 text-orange-50  "}`}
        >
          Followers
        </button>
      </m.div>
    </>
  );
};
