"use client";
import { BriefProfileInfoBox } from "@/components/timlineComponents/BriefProfileInfoBox";
import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { TrendingUsers } from "@/components/timlineComponents/TrendingUsers";
import { TimeLinePage } from "@/components/posts/TimeLinePage";
import { BriefEventsBox } from "@/components/timlineComponents/BriefEventsBox";
import { BirthdayNotifications } from "@/components/timlineComponents/BirthdayNotifications";
import { FollowedLeader } from "@/components/timlineComponents/FollowedLeader";
import { useState } from "react";
import { useRouter } from "next/router";
import { cusSelector } from "@/redux_store/cusHooks";

const AdminHomePage = () => {
  const [followers, setFollowers] = useState<any>({});
  const { birthdaylist } = cusSelector((state) => state.leader);
  const handleFollowers = (data: any) => {
    setFollowers(data);
  };

  return (
    <>
      <section className="m-auto my-10 w-[75%] relative main_scrollbar max-[1770px]:w-[80%] max-[1570px]:w-[88%] max-[1440px]:w-[95%] max-[1200px]:w-[85%] max-[1000px]:w-[88%] max-md:w-[90%] max-sm:w-[93%] max-sm:my-5">
        <div className="flex gap-5">

        </div>
      </section>
    </>
  );
};

export default AdminHomePage;
