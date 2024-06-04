"use client";
import { CommonBox } from "@/utils/CommonBox";
import { FC, useState } from "react";
import { FaBell, FaClipboard, FaUser } from "react-icons/fa";
import { ShortcutBtn } from "@/utils/ShortcutBtn";
import { LuNetwork } from "react-icons/lu";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { HiSpeakerphone } from "react-icons/hi";
import { TfiStatsUp } from "react-icons/tfi";
import { MdContacts, MdSpaceDashboard } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux_store";
import { closeAccount, deActiveAccount } from "@/redux_store/common/commonAPI";
import { tabfilter } from "@/redux_store/accesstab/tabApi";

export const ShortcutsBox: FC = () => {
  const dispatch = cusDispatch();
  const router = useRouter();
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showCloseConfirmBox, setShowCloseConfirmBox] = useState(false);
  const { userDetails } = cusSelector((state: RootState) => state.auth);
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  const NAV_ROUTES = [
    {
      link: '/user',
      name: 'feed',
      Icon: FaClipboard,
      tabname: "Leader"
    },
    {
      link: '/user/profile',
      name: 'my profile',
      Icon: FaUser,
      tabname: "Leader"
    },
    {
      link: '/user/notifications',
      name: 'notifications',
      Icon: FaBell,
      tabname: "Leader"
    },
    {
      link: '/user/profile/networks',
      name: 'Manage Group',
      Icon: LuNetwork,
      tabname: "Manage Group"
    },
    {
      link: ' /user/polls',
      name: 'Polls',
      Icon: HiSpeakerphone,
      tabname: "Manage Polls"
    },
    {
      link: '/user/profile/directory',
      name: 'Manage Directory',
      Icon: MdContacts,
      tabname: "Manage Directory"
    },
    {
      link: '/user/analytics',
      name: 'account stats',
      Icon: TfiStatsUp,
      tabname: "Leader"
    },
  ]



  const onClose = () => {
    setShowConfirmBox(false);
    setShowCloseConfirmBox(false);
  };
  const deactiveAccountHandler = async () => {
    const data = await closeAccount(userDetails?.id as string)
    if (data?.success) {
      setShowConfirmBox(false);
      router.push("/");
    }
  };
  const CloseAccountHandler = async () => {
    const data = await deActiveAccount(userDetails?.id as string)
    if (data?.success) {
      setShowCloseConfirmBox(false);
      router.push("/");
    }
  };

  return (
    <>
      <CommonBox title="shortcuts">
        <div className="flex flex-col py-4 gap-5 font-normal" >
          {[...tabfilter(accesstabs, usertype, NAV_ROUTES as any) as []]?.map((El: any) => (
            <ShortcutBtn
              Icon={El.Icon}
              title={El.name}
              route={El.link}
            />
          ))}
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
