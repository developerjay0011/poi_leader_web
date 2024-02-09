"use client";
import { FC, useEffect, useState } from "react";
import { NewPostBox } from "./NewPostBox";
import { Post } from "./Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { fetchAllPosts } from "@/redux_store/posts/postAPI";
import { StoriesBox } from "../timlineComponents/StoriesBox";
import { PollPost } from "./polls/PollPost";
import { AgendaPost } from "./AgendaPost";
import { RootState } from "@/redux_store";
import { fetchGetLeaderAddedPosts } from "../api/posts";

interface TimeLinePageProps {}
export const TimeLinePage: FC<TimeLinePageProps> = () => {
  const { userDetails } = cusSelector((st) => st.UI);
  const dispatch = cusDispatch();
  const { posts } = cusSelector((st) => st.posts);
  const [postData, setPostData] = useState([]);
  const [upPost, setUpPost] = useState();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch, userDetails]);

  const userData: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );

  useEffect(() => {
    const leaderid = userData?.data?.leader_detail?.id;
    const token = userData?.token;

    (async () => {
      try {
        const data = await fetchGetLeaderAddedPosts(leaderid, token);

        if (data?.length > 0) {
          setPostData(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [upPost, userData]);

  const updatePost = (data: any) => {
    setUpPost(data);
  };

  return (
    <>
      {/* CENTER FEED */}
      <div className="flex-1 flex flex-col gap-5 max-[1200px]:w-full">
        <StoriesBox />
        <NewPostBox updatePost={updatePost} />

        <Post
          createdDatetime="2023-11-05"
          type="post"
          userId=""
          writtenText="Hello there"
          id="13213"
          leaderid=""
          updatePost={updatePost}
          types={[]}
          allData=""
          media={[
            {
              comments: [
                {
                  comments: [],
                  commentText: "nice Post",
                  createdDate: "2023-11-06",
                  id: "132",
                  likes: [{ userId: "123213" }],
                  userId: "123c",
                  userImg: "",
                  username: "fde",
                  allData: "",
                },
              ],
              id: "dafd",
              likes: [{ userId: "dsadf" }],
              media: "",
              type: "video",
            },
          ]}
          comments={[
            {
              comments: [],
              commentText: "nice Post",
              createdDate: "2023-11-06",
              id: "132",
              likes: [{ userId: "123213" }],
              userId: "123c",
              userImg: "",
              username: "fde",
              allData: "",
            },
          ]}
          likes={[{ userId: "dsadf" }]}
        />

        <Post
          createdDatetime="2023-11-05"
          type="post"
          userId=""
          writtenText="Hello there"
          id="13213"
          media={[]}
          leaderid=""
          updatePost={updatePost}
          types={[]}
          allData=""
          comments={[
            {
              comments: [
                {
                  commentText: "nice Post",
                  createdDate: "2023-11-06",
                  id: "132",
                  likes: [{ userId: "123213" }],
                  userId: "123c",
                  userImg: "",
                  username: "fde",
                },
              ],
              commentText: "nice Post",
              createdDate: "2023-11-06",
              id: "132",
              likes: [{ userId: "123213" }],
              userId: "123c",
              userImg: "",
              username: "fde",
              allData: "",
            },
          ]}
          likes={[{ userId: "dsadf" }]}
        />

        <PollPost
          access=""
          createdDate="2023-11-05"
          expiresAt="2045-11-11"
          id="dasd"
          imgOptions={[]}
          options={[
            { id: "fdsf", option: "dsfeww", votes: 1 },
            { id: "dsf", option: "dsfds", votes: 0 },
          ]}
          pollType="text"
          postId="dsfsd"
          publishDate="2024-12-15"
          title="dsaf"
          userId="dsaf"
          username="R.K Singh"
        />

        <AgendaPost
          access=""
          attachments=""
          category=""
          createDate="2023-12-05"
          description=""
          documents=""
          id=""
          priority="high"
          status="0"
          title=""
          userId=""
        />

        {/* {posts.map((el) => {
          if (el.type === "post")
            return (
              <Post
                {...el}
                key={el.id}
                media={JSON.parse(el.media as string)}
                comments={JSON.parse(el.comments as string)}
                likes={JSON.parse(el.likes as string)}
              />
            );
        })} */}

        {postData.map((el: any) => {
          console.log(el);

          return (
            <Post
              {...el}
              key={el.id}
              media={el.media?.map(
                (file: any) =>
                  `http://203.92.43.166:4005${file.media}` as string
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
