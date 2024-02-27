"use client";
import { FC, useEffect, useState } from "react";
import { NewPostBox } from "./NewPostBox";
import { Post } from "./Post";
import { cusSelector } from "@/redux_store/cusHooks";
import { StoriesBox } from "../timlineComponents/StoriesBox";
import { PollPost } from "./polls/PollPost";
import { AgendaPost } from "./agenda/AgendaPost";
import { fetchGetLeaderAddedPosts } from "../api/posts";

interface TimeLinePageProps {}
export const TimeLinePage: FC<TimeLinePageProps> = () => {
  const { userDetails } = cusSelector((state) => state.auth);
  const [postData, setPostData] = useState([]);
  const [upPost, setUpPost] = useState();

  useEffect(() => {
    const leaderid = userDetails?.leaderId;
    if(leaderid) {
      (async () => {
        try {
          const data = await fetchGetLeaderAddedPosts(leaderid);
          if (data?.length > 0) {
            setPostData(data);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    };
  }, [userDetails]);

  const updatePost = (data: any) => {
    setUpPost(data);
  };

  return (
    <>
      {/* CENTER FEED */}
      <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
        <StoriesBox />
        <NewPostBox type="post" />

     

        {postData.map((el: any) => {
          console.log(el)
          return (
            <Post
              {...el}
              key={el.id}
              media={el.media?.map(
                (file: any) =>
                  `${process.env.NEXT_PUBLIC_BASE_URL}${file.media}` as string
              )}
              comments={el.media?.flatMap((file: any) => file?.comments) as string}
              likes={el.likes as string}
              createdDatetime={el.createddate as string}
              writtenText={el.written_text as string}
              updatePost={updatePost}
              types={el.media?.map((file: any) => file.type as string)}
              allData={el}
            />
          );
        })}
      </div>
    </>
  );
};
