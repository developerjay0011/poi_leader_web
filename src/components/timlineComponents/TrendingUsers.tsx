"use client";

import { StaticImageData } from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import CustomImage from "@/utils/CustomImage";
import { tryCatch } from "@/config/try-catch";
import { followLeader, getFollowering, unFollowLeader } from "@/redux_store/leader/leaderAPI";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { getImageUrl } from "@/config/get-image-url";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import Link from "next/link";
import { Nave } from "../posts/utils";

interface Leader {
  image: string;
  designation: string;
  username: string;
  name: string
  id: string;
}

interface TrendingUsersProps {
  handleFollowers: any;
}
export const TrendingUsers: FC<TrendingUsersProps> = ({ handleFollowers }) => {
  const { trendingLeader, following } = cusSelector((state) => state.leader);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(10);
  const [loadIncrement, setLoadIncrement] = useState(10);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // First load was 10 items, subsequent loads will be 20
      setLoadIncrement(20);
      setVisibleItems(prev => prev + loadIncrement);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [loadIncrement]);

  const visibleLeaders = trendingLeader?.slice(0, visibleItems);

  return (
    <section className={`border rounded-md w-full bg-white text-sky-950 max-h-[25rem] overflow-hidden flex flex-col`}>
      <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize">
        Trending Leaders
      </h2>

      <div ref={containerRef} className="overflow-y-scroll flex-1 main_scrollbar">
        <ul className="flex flex-col">
          {visibleLeaders?.length > 0 &&
            visibleLeaders?.map((item: Leader, index: number) => {
              return (
                <TrendingUser
                  userImg={getImageUrl(item?.image) || ""}
                  designation={item?.designation || ""}
                  username={item?.name || ""}
                  id={item?.id || ""}
                  key={index}
                  following={following}
                  isFollowing={following?.find((i: any) => i.leaderid == item.id) ? true : false}
                />
              );
            })}
          {visibleItems < (trendingLeader?.length || 0) && (
            <div className="text-center py-2 text-gray-500">Scroll for more...</div>
          )}
        </ul>
      </div>
    </section>
  );
};
interface TrendingUserProps {
  designation: string;
  username: string;
  userImg: string | StaticImageData;
  id: string;
  following: any;
  isFollowing: boolean
}

const TrendingUser: FC<TrendingUserProps> = ({
  userImg,
  designation,
  username,
  id,
  isFollowing
}) => {
  const { userDetails } = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();

  const handleClick = async (id: string, isFollowing: boolean) => {
    const postBody = {
      senderid: userDetails?.leaderId,
      receiverid: id,
    };
    tryCatch(
      async () => {
        const response = await (!isFollowing ? followLeader(postBody) : unFollowLeader(postBody));
        if (response?.success) {
          const res = await getFollowering(userDetails?.leaderId as string)
          dispatch(leaderActions.setFollowing(res))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }

      })
  };

  return (
    <li className="flex gap-3 py-3 px-3 last_noti items-center">
      <CustomImage
        src={userImg}
        alt="trending user"
        width={1000}
        height={1000}
        className="rounded-full w-12 aspect-square object-cover object-center"
      />

      <Link href={Nave({ id: id, leader: userDetails?.leaderId })}>
        <div className="flex flex-col">
          <h3 className="text-[14px] font-semibold capitalize">{username}</h3>
          <p className="text-[12px] capitalize">{designation}</p>
        </div>
      </Link>

      <button
        type="button"
        className="text-orange-500 hover:underline ml-auto text-[15px]"
        onClick={() => handleClick(id, isFollowing)}
        style={{ display: userDetails?.leaderId == id ? "none" : "flex" }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </li>
  );
};
