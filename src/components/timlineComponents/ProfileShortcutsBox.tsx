"use client";
import { FC } from "react";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { useRouter } from "next/navigation";
import { ShortcutsBox } from "./ShortcutsBox";

export const ProfileShortcutsBox: FC = () => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  const dispatch = cusDispatch();
  const router = useRouter();

  return (
    <>
      <div className='sticky top-0 left-0 self-start max-[1000px]:hidden w-max' style={{ display: usertype == "leader" ? "flex" : "none" }}>
        <ShortcutsBox />
      </div>
    </>
  );
};