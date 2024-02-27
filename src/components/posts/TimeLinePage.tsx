"use client";
import { FC, useEffect, useState } from "react";
import { NewPostBox } from "./NewPostBox";
import { Post } from "./Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { StoriesBox } from "../timlineComponents/StoriesBox";
import { fetchGetLeaderAddedPosts } from "../api/posts";
import { GetPostsForLeader } from "@/redux_store/posts/postAPI";
import { postActions } from "@/redux_store/posts/postSlice";
import { AgendaPost } from "./postagenda/AgendaPost";
import { PollPost } from "./postpolls/PollPost";

interface TimeLinePageProps { }
export const TimeLinePage: FC<TimeLinePageProps> = () => {
  const dispatch = cusDispatch();
  const postData: any = cusSelector((state) => state.posts.allPosts);
  const { userDetails } = cusSelector((state) => state.auth);
  const Getpost = async () => {
    if (userDetails?.leaderId) {
      const data = await GetPostsForLeader(userDetails?.leaderId);
      if (data?.length > 0) {
        dispatch(postActions.setPost(data));
      }
    }
  };
  useEffect(() => {
    (async () => {
      await Getpost();
    })();
  }, [userDetails?.leaderId]);





  return (
    <>
      {/* CENTER FEED */}
      <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
        <StoriesBox />
        <NewPostBox type="post" />
        {postData.map((el: any, index: string) => {
          var type = el?.type
          return type === "post" ? (
            <div key={index}>
              <Post
                {...el}
                index={index}
                Getpost={Getpost}
                userdetails={el.userdetails as any}
                post={el.post as any}
                type={el.type as any}
                allData={el}
              />
            </div>
          ) : type === "agendas" || type === "developments" ? (
            <div key={index}>
              <AgendaPost
                {...el}
                index={index}
                Getpost={Getpost}
                type={el.type as any}
                allData={el}
                userdetails={el.userdetails as any}
                post={el.post as any}
              />
            </div>
          ) : type === "polls" ? (
            <div key={index}>
              <PollPost
                {...el}
                index={index}
                key={index}
                Getpost={Getpost}
                allData={el}
                userdetails={el.userdetails as any}
                post={el.post as any}
              />
            </div>
          ) : null
        })}
      </div>
    </>
  );
};
