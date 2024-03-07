"use client";
import { FC, useEffect, useState } from "react";
import { NewPostBox } from "./NewPostBox";
import { Post } from "./Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { StoriesBox } from "../timlineComponents/StoriesBox";
import { GetLeaderAddedPosts, GetPostsForLeader } from "@/redux_store/posts/postAPI";
import { postActions } from "@/redux_store/posts/postSlice";
import { AgendaPost } from "./postagenda/AgendaPost";
import { PollPost } from "./postpolls/PollPost";

interface TimeLinePageProps {
  is_my_postandstories: boolean
}
export const TimeLinePage: FC<TimeLinePageProps> = ({ is_my_postandstories = false }) => {
  const dispatch = cusDispatch();
  const postData: any = cusSelector((state) => state.posts.allPosts);
  const mypostData: any = cusSelector((state) => state.posts.posts);
  const { userDetails } = cusSelector((state) => state.auth);
  const { leaderProfile } = cusSelector((state) => state.leader);
  const Getpost = async () => {
    if (userDetails?.leaderId) {
      const postsForLeader = await GetPostsForLeader(userDetails?.leaderId);
      dispatch(postActions.setPost(postsForLeader));
      const leaderpost = await GetLeaderAddedPosts(userDetails?.leaderId);
      dispatch(postActions.listPosts(leaderpost as any));
    }
  };
  var setpost = is_my_postandstories ? mypostData : postData
  var mypostdata = is_my_postandstories ? { image: leaderProfile?.image, name: leaderProfile?.username, leaderid: userDetails?.leaderId } : {}

  useEffect(() => {
    (async () => { await Getpost(); })();
  }, []);

  return (
    <>
      {/* CENTER FEED */}
      <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
        <StoriesBox
          is_my_postandstories={is_my_postandstories}
        />
        <NewPostBox handleAdd={() => Getpost()} type="post" />
        {setpost?.map((el: any, index: string) => {
          var type = el?.type
          return type === "post" ? (
            <div key={index}>
              <Post
                {...el}
                index={index}
                Getpost={Getpost}
                userdetails={!is_my_postandstories ? el.userdetails : mypostdata as any}
                post={!is_my_postandstories ? el.post : el as any}
                type={el.type as any}
                is_my={is_my_postandstories}
                allData={{ ...el, mypostdata }}
              />
            </div>
          ) : (type === "agendas" || type === "developments") && !is_my_postandstories ? (
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
          ) : type === "polls" && !is_my_postandstories ? (
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
