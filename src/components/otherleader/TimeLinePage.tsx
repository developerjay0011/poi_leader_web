"use client";
import { FC, useEffect } from "react";
import { Post } from "../posts/Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { authActions } from "@/redux_store/auth/authSlice";
import { getSingleLeader } from "@/redux_store/auth/authAPI";
interface LeaderTimeLinePageProps { }

export const LeaderTimeLinePage: FC<LeaderTimeLinePageProps> = () => {
  const { userDetails, leaderData } = cusSelector((st) => st.auth);

  const dispatch = cusDispatch();

  const Getpost = async () => {
    const res = await getSingleLeader(leaderData?.id);
    dispatch(authActions.setLeaderData(res));
  };


  useEffect(() => {
    (async () => {
      await Getpost();
    })();
  }, [userDetails]);

  return (
    <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">

    </div>
  );
};
