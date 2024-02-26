"use client";
import { UserData } from "@/utils/utility";
import { StaticImageData } from "next/image";
import { FC, useEffect, useState } from "react";
import { fetchFollowingList, fetchUnFollowLeader } from "../api/followLeader";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { RootState } from "@/redux_store";
import CustomImage from "@/utils/CustomImage";
import { getFollowering, getFollowers, unFollowLeader } from "@/redux_store/leader/leaderAPI";
import { tryCatch } from "@/config/try-catch";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { getImageUrl } from "@/config/get-image-url";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
interface Leader {
  image: string;
  designation: string;
  name: string;
  leaderid: string;
  handleunfollow: (data: any) => void;
}

interface TrendingUsersProps {
  followers: any;
}
export const FollowedLeader: FC<TrendingUsersProps> = ({  }) => {
  const {  leaderProfile, following } = cusSelector((state) => state.leader);
  const dispatch = cusDispatch();

  useEffect(() => {
    (async () => {

      tryCatch(
        async () => {
          const followingRes = await getFollowers(leaderProfile?.id as string);
          dispatch(leaderActions.setFollowers(followingRes));
        })

    })();
  }, [following]);


  const handleunfollow = (data: any) => {

  };

  return (
    <>
      <section
        className={`border rounded-md w-full bg-white text-sky-950 max-h-[25rem] overflow-hidden flex flex-col`}
      >
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-6 py-3 border-b font-[500] text-[16px] capitalize">
          Following Leaders
        </h2>

        <div className="overflow-y-scroll flex-1 main_scrollbar">
          <ul className="flex flex-col">
            {following?.length > 0 &&
              following?.map((item: Leader, index: number) => {
                return (
                  <TrendingUser
                    userImg={getImageUrl(item?.image) || ""}
                    designation={item?.designation || ""}
                    username={item?.name || ""}
                    id={item?.leaderid || ""}
                    key={index}
                    handleunfollow={handleunfollow}
                  />
                );
              })}
          </ul>
        </div>
      </section>
    </>
  );
};
interface TrendingUserProps {
  designation: string;
  username: string;
  userImg: string | StaticImageData;
  id: string;
  handleunfollow: (data: any) => void;
}

const TrendingUser: FC<TrendingUserProps> = ({
  userImg,
  designation,
  username,
  id,
}) => {
  const userDetails: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );
  const dispatch = cusDispatch();
  const { leaderProfile } = cusSelector((state) => state.leader);


  const handleFollowers = async (id: string) => {
    const postBody = {
      senderid: leaderProfile?.id,
      receiverid: id,
    };
    tryCatch(
      async () => {
        const response = await  unFollowLeader(postBody);
        if (response?.success) {
          const res = await getFollowering(leaderProfile?.id as string)
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

      <div className="flex flex-col">
        <h3 className="text-[14px] font-semibold capitalize">{username}</h3>
        <p className="text-[12px] capitalize">{designation}</p>
      </div>

      <button
        type="button"
        className="text-orange-500 hover:underline ml-auto text-[15px]"
        onClick={() => handleFollowers(id)}
      >
        UnFollow
      </button>
    </li>
  );
};
