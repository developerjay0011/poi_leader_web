"use client";
import { FC } from "react";
import { cusSelector } from "@/redux_store/cusHooks";
import { ShortcutsBox } from "./ShortcutsBox";

export const ProfileShortcutsBox: FC = () => {
  const { usertype } = cusSelector((state) => state.access);

  return usertype == "leader" && (
    <div className='w-max max-[1000px]:hidden' >
      <div className='sticky top-0 left-0 self-start w-max flex' >
        <ShortcutsBox />
      </div>
    </div>
  );
};
