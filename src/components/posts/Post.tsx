"use client";

import { Comment, Like, MediaPost, PostDetails } from "@/utils/typesUtils";
import { dateConverter } from "@/utils/utility";
import { FC, useEffect, useState } from "react";
import { BiGlobe, BiShareAlt, BiSolidMessageAltDetail } from "react-icons/bi";
import { BsFillHeartFill, BsThreeDots } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { PostOptions } from "./PostOptions";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";

// import {
//   addNewComment,
//   addNewNestedComment,
//   changeNestedLike,
//   updateLike,
// } from "@/redux_store/posts/postAPI";
import { NewCommentForm } from "../common-forms/NewCommentForm";
import { SingleComment } from "./SingleComment";
import { MoreThan4ColumnImgLayout } from "./MoreThan4ColumnLayout";
import { FourColumnImgLayout } from "./FourColumnLayout";
import PostGrid from '../PostGrid'
import {
  fetchDeletePost,
  fetchLikePost,
  fetchUnlikePostorStory,
} from "../api/posts";
import CustomImage from "@/utils/CustomImage";

interface PostProps extends PostDetails {}

export const Post: FC<PostProps> = ({
  writtenText,
  media,
  id,
  comments,
  likes,
  userId,
  createdDatetime,
  leaderid,
  updatePost,
  types,
  allData,
}) => {
  const [firstTime, setFirstTime] = useState(true);
  const [showPostDetials, setShowPostDetials] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);

  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);

  const showFullPost = () => setShowPostDetials(true);
  const hideFullPost = () => setShowPostDetials(false);

  // const deletePostHandler = () => dispatch(deletePost(id))
  const likeChangeHandler = () => alert("Like Reply");

  const [showLikeAnimation, setShowLikeAnimation] = useState(
    (likes as Like[]).some((el) => el.userId === userDetails?.id)
  );

  const [likeCount, setLikeCount] = useState(likes.length); // in order to show updated like count on frontend

  const addNewPostComment = (comment: string) =>
    alert("Add New Coment")

  const postCommentLikeHandler = (commentId: string) =>
    alert("Change Nested Like")
    // dispatch(
    //   changeNestedLike({
    //     id: commentId,
    //     likeTypeStatus: "_comments",
    //     postId: id,
    //     userId,
    //     eventID: "0008",
    //   })
    // );

  const deletePostHandler = async (leaderid: string, id: string) => {
    const postBody = {
      id: id,
      leaderid: leaderid,
    };
    try {
      const data = await fetchDeletePost(postBody);

      if (data?.success) {
        updatePost(data);
        setShowMorePostOptions(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setFirstTime(true);
    };
  }, []);

  useEffect(() => {
    updatePost(updateComment);
    setShowComments(false);
  }, [updateComment]);

  // to show count at frontend and calling api behind
  useEffect(() => {
    if (showLikeAnimation && !firstTime) setLikeCount((lst) => lst + 1);

    if (!showLikeAnimation && !firstTime)
      setLikeCount((lst) => {
        if (lst === 0) return 0;

        return lst - 1;
      });
  }, [showLikeAnimation]);

  const commentReplyHandler = (commentId: string, commentReply: string) => {
    alert("Comment Reply")
    // dispatch(
    //   addNewNestedComment({
    //     commentReplyText: commentReply,
    //     commentTypeStatus: "_comments",
    //     id: commentId,
    //     postId: id,
    //     userId: userDetails?.id as string,
    //     userImg: userDetails?.image as string,
    //     username: userDetails?.username as string,
    //   })
    // );
  };

  const handleLike = async (allData: any) => {
    const mediaId = allData.media.map((m: any) => m.id).flat();

    const postid = allData?.id;

    const likeBody = {
      postid: postid,
      post_leaderid: allData?.leaderid,
      userid: userDetails?.id,
      mediaid: mediaId[0],
      usertype: "citizen",
      username: userDetails?.username,
      userimg: userDetails?.image,
    };

    const UnlikeBody = {
      postid: postid,
      post_leaderid: allData?.leaderid,
      userid: userDetails?.id,
    };

    try {
      if (!showLikeAnimation) {
        const data = await fetchLikePost(likeBody);
        if (data?.success) {
          console.log(data);
        }
      } else {
        const data = await fetchUnlikePostorStory(UnlikeBody);
        if (data?.success) {
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="border rounded-md bg-white px-5">
        {/* User details and Date */}
        <div className="flex items-center gap-3 py-4 text-sky-950 border-b">
          <CustomImage
            src={`${userDetails?.image && process.env.NEXT_PUBLIC_BASE_URL + '' + userDetails?.image || ''}` as string}
            alt="user pic"
            className="w-12 aspect-square object-cover object-center rounded-full"
            width={100}
            height={100}
          />

          {/* Info and date of publish */}
          <div>
            <h4 className="font-[600] text-lg text-orange-500">R.K Singh</h4>
            <p className="flex items-center capitalize gap-2 text-sm font-[500]">
              <BiGlobe />
              <span>Published on: {dateConverter(createdDatetime)}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="ml-auto relative" id="moreOptions">
            <button onClick={() => setShowMorePostOptions((lst) => !lst)}>
              <BsThreeDots className="text-2xl" />
            </button>

            {showMorePostOptions && (
              <PostOptions
                deletePostHandler={() => deletePostHandler(leaderid, id)}
                userId={userId}
                onClose={() => setShowMorePostOptions(false)}
              />
            )}
          </div>
        </div>

        {/* USER POST */}
        <div className="flex flex-col gap-5 mt-5">
          {/* TEXT POST */}
          <p className="text-[16px]">{writtenText}</p>

          {/* MEDIA */}
          {media.length > 0 && (
            <section className="w-full">
              <PostGrid imagesOrVideos={media as []} />
            </section>
          )}
        </div>

        <div className="w-full h-[2px] bg-zinc-100 my-5" />

        {/* POST Interactions */}
        <div className="mb-5 flex items-center gap-6">
          <button
            className={`flex flex-col gap-3 relative transition-all ${
              likeCount ? "text-rose-500" : "text-black"
            }`}
            onClick={() => {
              likeChangeHandler();
              setFirstTime(false);
              setShowLikeAnimation((lst) => !lst);
              handleLike(allData);
            }}
          >
            <BsFillHeartFill className="text-lg" />

            {!firstTime && (
              <BsFillHeartFill
                className={`text-lg overlay ${
                  showLikeAnimation ? "fadeOut" : "fadeIn"
                }`}
              />
            )}

            <span className="text-[14px] absolute -top-4 left-4 font-[500]">
              {likeCount}
            </span>
          </button>

          <button
            className={`flex flex-col gap-3 relative transition-all hover:text-rose-500 ${
              showComments ? "text-rose-500" : "text-black"
            }`}
            onClick={() => setShowComments((lst) => !lst)}
          >
            <BiSolidMessageAltDetail className="text-[1.4rem]" />
            <span className="text-[14px] absolute -top-4 left-5 font-[500]">
              {comments.length}
            </span>
          </button>

          <button className="flex flex-col gap-3 relative transition-all hover:text-rose-500">
            <BiShareAlt className="text-[1.4rem]" />
            <span className="text-[14px] absolute -top-4 left-5 font-[500]">
              0
            </span>
          </button>
        </div>

        {/* <div className='w-full h-[2px] bg-zinc-100 my-5' /> */}

        <AnimatePresence mode="wait">
          {showComments && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* comments box */}
              <ul className="flex flex-col gap-5">
                {(comments as Comment[]).map((el, index) => {
                  console.log(el, "test");

                  return (
                    <SingleComment
                      {...el}
                      key={index}
                      postId={id}
                      likeChangeHandler={postCommentLikeHandler}
                      newNestedCommentHandler={commentReplyHandler}
                      allData={el}
                      fullPostData={allData}
                    />
                  );
                })}
              </ul>

              <NewCommentForm
                CommentHandler={addNewPostComment}
                allData={allData}
                setUpdateComment={setUpdateComment}
              />
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};
