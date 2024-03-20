"use client";
import { FC, useEffect } from "react";
import { Post } from "../posts/Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
// import { StoriesBox } from "../timlineComponents/StoriesBox";
// import { RootState } from "@/redux_store";
// import { GetPostsForCitizen } from "@/redux_store/post/postApi";
// import { postActions } from "@/redux_store/post/postSlice";
// import { AgendaPost } from "../posts/AgendaPost";
// import { PollPost } from "../posts/polls/PollPost";
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
      {/* <StoriesBox />
      {leaderData?.posts?.map((el: any, index: string) => {
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
      })} */}
    </div>
  );
};
