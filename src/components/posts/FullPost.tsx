"use client";
import { FC, useEffect, useState } from "react";
import { MediaPost } from "@/utils/typesUtils";
import { SingleComment } from "./SingleComment";
import { NewCommentForm } from "../common-forms/NewCommentForm";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { BiShareAlt, BiSolidMessageAltDetail, BiX } from "react-icons/bi";
import { userImg } from "@/utils/utility";
import { BsFillHeartFill } from "react-icons/bs";
// import {
//   addNewNestedComment,
//   changeNestedLike,
// } from "@/redux_store/posts/postAPI";
import { motion as m } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import CustomImage from "@/utils/CustomImage";

interface FullPostProps {
  onClose: () => void;
  posts: MediaPost[];
  postId: string;
  userId: string;
}

export const FullPost: FC<FullPostProps> = ({
  onClose,
  posts,
  postId,
  userId,
}) => {
  const [curPostIndex, setCurPostIndex] = useState<number>(0);
  const curPost = posts[curPostIndex];
  const { userDetails } = cusSelector((st) => st.UI);
  const dispatch = cusDispatch();
  const likePerPostHandler = () => { }
  // dispatch(
  //   changeNestedLike({
  //     id: curPost.id,
  //     likeTypeStatus: "_media",
  //     postId,
  //     userId,
  //     eventID: "0008",
  //   })
  // );

  const increasePostCount = () => {
    setCurPostIndex((lst) => {
      if (lst < posts.length - 1) return lst + 1;
      else return posts.length - 1;
    });
  };

  const decreasePostCount = () => {
    setCurPostIndex((lst) => {
      if (lst > 0) return lst - 1;
      else return 0;
    });
  };

  const createNewComment = (comment: any) => {
    /*  dispatch(
      addNewNestedComment({
        commentReplyText: comment,
        commentTypeStatus: '_media',
        id: curPost.id,
        postId,
        userId,
        userImg: userDetails?.image as string,
        username: '',
      })
    ) */
  };

  const likeOnCommentPerPostHandler = (id: string) => {
    // dispatch(
    //   changeNestedLike({
    //     id,
    //     likeTypeStatus: "_media",
    //     postId,
    //     userId,
    //     eventID: "0010",
    //   })
    // );
  };

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-[100dvh] w-full fixed top-0 left-0 z-[50] max-[1150px]:overflow-y-scroll"
      >
        <div
          className="absolute top-0 left-0 bg-black bg-opacity-40 backdrop-blur-[2px] w-full h-full z-[55]"
          onClick={onClose}
        />

        <m.section
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="bg-gray-600 bg-opacity-90 w-[1150px] m-auto flex z-[60] relative shadow-md mt-10 rounded-md overflow-hidden h-[601px] max-[1150px]:flex-col max-[1150px]:w-full max-[1150px]:mt-0 max-[1150px]:h-full"
        >
          <button
            type="button"
            className="absolute top-1 right-1"
            onClick={onClose}
          >
            <BiX className="text-gray-700 text-3xl" />
          </button>
          <div className="border-[1rem] border-r-0 border-white flex items-center justify-center relative w-[60%] max-[1150px]:border-r-[1rem] max-[1150px]:w-full max-[1150px]:h-[30rem]">
            {curPostIndex !== 0 && (
              <button
                type="button"
                onClick={decreasePostCount}
                className="absolute top-1/2 translate-y-[-50%] left-3 rounded-full bg-white text-black aspect-square flex items-center justify-center p-1"
              >
                <IoIosArrowForward className="text-4xl rotate-180" />
              </button>
            )}

            <div className="w-full h-full p-10 overflow-hidden">
              {curPost.type === "image" && (
                <CustomImage
                  src={curPost.media}
                  alt={`post ${curPostIndex}`}
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover object-center"
                />
              )}
              {curPost.type === "video" && (
                <video
                  src={curPost.media}
                  width={1000}
                  height={1000}
                  className="w-full h-auto max-[1150px]:w-full max-[1150px]:h-full max-[1150px]:object-cover max-[1150px]:object-center"
                  controls
                />
              )}
            </div>

            {curPostIndex !== posts.length - 1 && (
              <button
                type="button"
                onClick={increasePostCount}
                className="absolute top-1/2 translate-y-[-50%] right-3 rounded-full bg-white text-black aspect-square flex items-center justify-center p-1"
              >
                <IoIosArrowForward className="text-4xl" />
              </button>
            )}
          </div>

          <div className="bg-white flex flex-col p-4 w-[40%] max-[1150px]:w-full">
            <div className="flex items-center gap-3 border-b py-3">
              <CustomImage
                src={userImg}
                alt="post user dp"
                width={1000}
                height={1000}
                className="w-14 aspect-square rounded-full object-cover object-center"
              />

              <div className="">
                <h4 className="font-semibold">R.K Singh</h4>
                <p className="text-[14px]">2 hours ago</p>
              </div>

              {userId !== userDetails?.id && (
                <button className="border-orange-500 text-orange-500 border rounded-md py-1 font-medium text-[13px] px-4 uppercase ml-auto hover:bg-orange-500 hover:text-orange-50 transition-all">
                  follow
                </button>
              )}
            </div>

            {/* Interactions per media */}
            <InteractionsPerMedia
              curPost={curPost}
              likePerPostHandler={likePerPostHandler}
            />

            <div className="flex flex-col overflow-y-scroll main_scrollbar">
              {/* comments box */}
              <ul className="flex flex-col gap-5 bg-white mt-4">
                {/* {curPost.comments.map((el) => (
                  <SingleComment
                    {...el}
                    key={el.id}
                    postId={postId}
                    likeChangeHandler={likeOnCommentPerPostHandler}
                    postPerMedia
                  />
                ))} */}
              </ul>
              {/* <NewCommentForm
                CommentHandler={createNewComment}
                setUpdateComment={"setUpdateComment"}
                allData={"allData"}
              /> */}
            </div>
          </div>
        </m.section>
      </m.div>
    </>
  );
};

interface InteractionsPerMediaProps {
  curPost: MediaPost;
  likePerPostHandler: () => void;
}

const InteractionsPerMedia: FC<InteractionsPerMediaProps> = ({
  curPost,
  likePerPostHandler,
}) => {
  const [firstTime, setFirstTime] = useState(true);
  const { userDetails } = cusSelector((st) => st.UI);
  const [showLikeAnimation, setShowLikeAnimation] = useState(
    curPost.likes.some((el) => el.userId === userDetails?.id)
  );
  const [likeCount, setLikeCount] = useState(curPost.likes.length); // in order to show updated like count on frontend

  // Creating a un-mounting effect
  useEffect(() => {
    // Reseting firstTime | likeAnimation | likeCount whenever curpost values changes because this component only un-mounts when parent gets unmounted
    setFirstTime(true);
    setShowLikeAnimation(
      curPost.likes.some((el) => el.userId === userDetails?.id)
    );
    setLikeCount(curPost.likes.length);
  }, [curPost, userDetails]);

  // to show count at frontend and calling api behind
  useEffect(() => {
    if (showLikeAnimation && !firstTime) setLikeCount((lst) => lst + 1);

    if (!showLikeAnimation && !firstTime)
      setLikeCount((lst) => {
        if (lst === 0) return 0;

        return lst - 1;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLikeAnimation]);

  return (
    <div className="mt-6 pb-3 flex items-center gap-6 border-b">
      <button
        className={`flex flex-col gap-3 relative transition-all ${showLikeAnimation ? "text-rose-500" : "text-black"
          }`}
        onClick={() => {
          setFirstTime(false);
          likePerPostHandler();
          setShowLikeAnimation((lst) => !lst);
        }}
      >
        <BsFillHeartFill className="text-lg" />

        {!firstTime && (
          <BsFillHeartFill
            className={`text-lg overlay ${showLikeAnimation ? "fadeOut" : "fadeIn"
              }`}
          />
        )}

        <span className="text-[14px] absolute -top-4 left-4 font-[500]">
          {likeCount}
        </span>
      </button>

      <button className="flex flex-col gap-3 relative transition-all hover:text-rose-500">
        <BiSolidMessageAltDetail className="text-[1.4rem]" />
        <span className="text-[14px] absolute -top-4 left-5 font-[500]">
          {curPost.comments.length}
        </span>
      </button>

      <button className="flex flex-col gap-3 relative transition-all hover:text-rose-500">
        <BiShareAlt className="text-[1.4rem]" />
        <span className="text-[14px] absolute -top-4 left-5 font-[500]">0</span>
      </button>
    </div>
  );
};
