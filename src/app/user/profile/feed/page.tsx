import { BriefProfileInfoBox } from "@/components/timlineComponents/BriefProfileInfoBox";
import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { TrendingUsers } from "@/components/timlineComponents/TrendingUsers";
import { Post } from "@/components/posts/Post";
import { TimeLinePage } from "@/components/posts/TimeLinePage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux_store";

const AdminProfileFeedsPage = () => {
  return (
    <>
      <section className="w-full">
        <div className="flex gap-5">
          {/* LEFT FEED */}
          <div className="flex flex-col gap-5 self-start max-[1200px]:hidden w-[24%]">
            <TrendingUsers handleFollowers="" />
            <ShortcutsBox />
          </div>

          <TimeLinePage />

          {/* RIGHT FEED */}
          <div className="flex flex-col self-start gap-5 max-[1200px]:hidden">
            <BriefProfileInfoBox />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProfileFeedsPage;
