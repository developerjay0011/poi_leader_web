"use client";
import { lazy, memo, useCallback, useMemo, useState } from "react";
import { cusSelector } from "@/redux_store/cusHooks";

// Lazy load all components
const BriefProfileInfoBox = lazy(() => import("@/components/timlineComponents/BriefProfileInfoBox").then(mod => ({ default: mod.BriefProfileInfoBox })));
const ShortcutsBox = lazy(() => import("@/components/timlineComponents/ShortcutsBox").then(mod => ({ default: mod.ShortcutsBox })));
const TrendingUsers = lazy(() => import("@/components/timlineComponents/TrendingUsers").then(mod => ({ default: mod.TrendingUsers })));
const TimeLinePage = lazy(() => import("@/components/posts/TimeLinePage").then(mod => ({ default: mod.TimeLinePage })));
const BriefEventsBox = lazy(() => import("@/components/timlineComponents/BriefEventsBox").then(mod => ({ default: mod.BriefEventsBox })));
const BirthdayNotifications = lazy(() => import("@/components/timlineComponents/BirthdayNotifications").then(mod => ({ default: mod.BirthdayNotifications })));
const FollowedLeader = lazy(() => import("@/components/timlineComponents/FollowedLeader").then(mod => ({ default: mod.FollowedLeader })));

const AdminHomePage = memo(() => {
  const { birthdaylist } = cusSelector((state) => ({
    birthdaylist: state.leader.birthdaylist
  }));
  const [followers, setFollowers] = useState<any[]>([]);
  const handleFollowers = useCallback((data: any) => {
    setFollowers(data);
  }, []);


  return (
    <section className='m-auto my-10 w-[80%] overflow-y-scroll main_scrollbar flex flex-col gap-8 max-[1850px]:w-[85%] max-[1650px]:w-[90%] max-[1570px]:w-[95%] max-[1470px]:w-[97%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[23%]">
          {birthdaylist?.length > 0 && <BirthdayNotifications />}
          <TrendingUsers handleFollowers={handleFollowers} />
          <FollowedLeader followers={followers} />
          <BriefEventsBox />
        </div>
        <TimeLinePage is_my_postandstories={false} />
        <div className="w-max flex flex-col self-start gap-5 max-[1200px]:hidden w-[23%]">
          <BriefProfileInfoBox />
          <ShortcutsBox />
        </div>
      </div>
    </section>
  );
});

AdminHomePage.displayName = 'AdminHomePage';

export default AdminHomePage;
