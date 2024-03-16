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
    <section className='m-auto my-10 w-[80%] overflow-y-scroll main_scrollbar flex flex-col gap-8 max-[1850px]:w-[85%] max-[1650px]:w-[90%] max-[1570px]:w-[95%] max-[1470px]:w-[97%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
      <div className="flex gap-5">
        {/* LEFT FEED */}
        <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]">
          {birthdaylist?.length > 0 && <BirthdayNotifications />}
          <TrendingUsers handleFollowers={handleFollowers} />
          <FollowedLeader followers={followers} />
          <BriefEventsBox />
        </div>

        <TimeLinePage
          is_my_postandstories={false}
        />

        {/* RIGHT FEED */}
        <div className="w-max flex flex-col self-start gap-5 max-[1200px]:hidden">
          <BriefProfileInfoBox />
          <ShortcutsBox />
        </div>
      </div>
    </section>
  );
};

export default AdminHomePage;
