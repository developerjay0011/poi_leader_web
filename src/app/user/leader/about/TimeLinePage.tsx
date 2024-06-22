"use client";
import { FC } from "react";
import { cusSelector } from "@/redux_store/cusHooks";
import { setusername } from "@/config/get-image-url";
import { PollPost } from "@/components/posts/postpolls/PollPost";
import { Post } from "@/components/posts/Post";
import { StoriesBox } from "@/components/timlineComponents/StoriesBox";

interface TimeLinePageProps {
  leader_id: string
  stories?: any
  posts?: any
}
export const OtherTimeLinePage: FC<TimeLinePageProps> = ({ leader_id, stories, posts }) => {
  const { leaderData } = cusSelector((st) => st.auth);
  const Getpost = async () => { };
  var mypostdata = { image: leaderData?.image, name: setusername(leaderData), leaderid: leader_id }

  return (
    <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
      {(stories?.length > 0 || posts?.length > 0) ?
        <>
          <StoriesBox other={true} user_stories={stories} />
          {posts?.map((el: any, index: string) => {
            var type = el?.type
            return type === "post" ? (
              <div key={index}>
                <Post
                  {...el}
                  index={index}
                  Getpost={Getpost}
                  userdetails={mypostdata}
                  post={el}
                  type={el.type as any}
                  is_my={false}
                  allData={{ ...el, mypostdata }}
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
        </>
        :
        <h3 className="col-span-full text-center py-10 capitalize text-3xl">
          No Posts/Storie Found!!
        </h3>
      }

    </div>
  );
};
