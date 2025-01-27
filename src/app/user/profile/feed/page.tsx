'use client'

import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { TrendingUsers } from "@/components/timlineComponents/TrendingUsers";
import { TimeLinePage } from "@/components/posts/TimeLinePage";

const AdminProfileFeedsPage = () => {
  const handleFollowers = (data: any) => {
  };

  return (
    <>
      <section className="w-full">
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[24%]">
            <TrendingUsers handleFollowers={handleFollowers} />
            <ShortcutsBox />
          </div>
          <TimeLinePage is_my_postandstories={true} />
        </div>
      </section>
    </>
  );
};

export default AdminProfileFeedsPage;
