"use client";
import { CommonBox } from "@/utils/CommonBox";
import { FC, useEffect, useState } from "react";
import { FaBell, FaClipboard, FaPowerOff, FaUser } from "react-icons/fa";
import { ShortcutBtn } from "@/utils/ShortcutBtn";
import { LuNetwork } from "react-icons/lu";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { uiActions } from "@/redux_store/UI/uiSlice";
import { HiSpeakerphone } from "react-icons/hi";
import { FaUserGroup } from "react-icons/fa6";
import { TfiStatsUp } from "react-icons/tfi";
import { MdContacts, MdSpaceDashboard } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { fetchCloseAccount, fetchDeactiveAccount } from "../api/profile";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux_store";
import { UserData } from "@/utils/utility";

export const ShortcutsBox: FC = () => {
  const dispatch = cusDispatch();
  const router = useRouter();
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showCloseConfirmBox, setShowCloseConfirmBox] = useState(false);

  const userDetails: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const serializedData = sessionStorage.getItem("user Data");

    if (serializedData) {
      const userDataFromStorage: UserData = JSON.parse(serializedData);
      setUserData(userDataFromStorage);
    }
  }, []);

  console.log(userData);

  const onClose = () => {
    setShowConfirmBox(false);
    setShowCloseConfirmBox(false);
  };
  const deactiveAccountHandler = async () => {
    const citizenid = userData?.id || "";
    const token = userData?.token || "";

    const data = await fetchDeactiveAccount(citizenid, token);

    console.log(data);

    if (data?.success) {
      setShowConfirmBox(false);
      router.push("/");
    }
  };
  const CloseAccountHandler = async () => {
    const citizenid = userData?.id;
    const token = userData?.token;

    const data = await fetchCloseAccount(citizenid, token);

    console.log(data);
    if (data?.success) {
      setShowCloseConfirmBox(false);
      router.push("/");
    }
  };

  return (
    <>
      <CommonBox title="shortcuts">
        <div className="flex flex-col py-4 gap-5 pr-16 font-normal">
          <ShortcutBtn Icon={FaClipboard} title="feed" route={`/user`} />

          <ShortcutBtn
            Icon={FaUser}
            title="my profile"
            route={`/user/profile`}
          />

          <ShortcutBtn
            Icon={FaBell}
            title="notifications"
            route={`/user/profile/notifications`}
          />

          <ShortcutBtn
            Icon={LuNetwork}
            title="networks"
            route="/user/profile/networks"
          />

          <ShortcutBtn
            Icon={HiSpeakerphone}
            title="polls"
            route="/user/profile/polls"
          />

          <ShortcutBtn
            Icon={MdContacts}
            title="My Directory"
            route="/user/profile/directory"
          />

          <ShortcutBtn
            Icon={TfiStatsUp}
            title="account stats"
            route="/user/analytics"
          />

          <ShortcutBtn
            Icon={MdSpaceDashboard}
            title="Dashboard"
            target
            route="http://localhost:5000/"
          />

          <button onClick={() => dispatch(uiActions.setLogin(false))}>
            <ShortcutBtn Icon={FaPowerOff} title="logout" route="/" />
          </button>
          <button
            type="button"
            className="flex items-center gap-4 hover:text-orange-600 transition-all text-sky-950"
            onClick={() => setShowConfirmBox(true)}
          >
            <FaPowerOff /> Deactive Account
          </button>

          <button
            type="button"
            className="flex items-center gap-4 hover:text-orange-600 transition-all text-sky-950"
            onClick={() => setShowCloseConfirmBox(true)}
          >
            <FaPowerOff /> Close Account
          </button>
          <AnimatePresence mode="wait">
            {showConfirmBox && (
              <ConfirmDialogBox
                noAllowed={false}
                onCancel={() => {
                  setShowConfirmBox(false);
                  onClose();
                }}
                onOk={deactiveAccountHandler}
              />
            )}
            {showCloseConfirmBox && (
              <ConfirmDialogBox
                noAllowed={false}
                onCancel={() => {
                  setShowCloseConfirmBox(false);
                  onClose();
                }}
                onOk={CloseAccountHandler}
              />
            )}
          </AnimatePresence>
        </div>
      </CommonBox>
    </>
  );
};
