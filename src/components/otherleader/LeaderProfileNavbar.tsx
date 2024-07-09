"use client";
import { FC } from "react";

interface LeaderProfileNavbarProps { setType: any, type: string }
export const LeaderProfileNavbar: FC<LeaderProfileNavbarProps> = ({ setType, type }) => {
  return (
    <>
      <nav className="flex items-center gap-8 ml-20 max-[1480px]:ml-10 max-[1200px]:ml-5 max-[450px]:gap-4 max-[1100px]:flex-wrap max-[620px]:justify-center">
        {/* <div className={`text-lg font-[500] capitalize relative cursor-pointer ${type == "about" && " text-orange-500 "}`}
          // href={ProtectedRoutes.leaderFeed}
          onClick={() => setType("about")}
        >
          About
        </div> */}
        {/* <div className={`text-lg font-[500] capitalize relative cursor-pointer ${type == "feed" && " text-orange-500 "}`}
          // href={ProtectedRoutes.leaderFeed}
          onClick={() => setType("feed")}
        >
          Feed
        </div> */}

        <div className={`text-lg font-[500] capitalize relative cursor-pointer ${type == "agenda" && " text-orange-500 "}`}
          // href={ProtectedRoutes.leaderProfile}
          onClick={() => setType("agenda")}
        >
          Agenda
        </div>
        <div className={`text-lg font-[500] capitalize relative cursor-pointer ${type == "developments" && " text-orange-500 "}`}
          onClick={() => setType("developments")}
        // href={ProtectedRoutes.following}
        >
          Developments
        </div>
      </nav>
    </>
  );
};
