import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { Comment, Like, NestedComment } from "@/utils/typesUtils";
import { dateConverter } from "@/utils/utility";
import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import { BsFillHeartFill, BsThreeDots } from "react-icons/bs";
import { PostCommentOptions } from "./PostCommentOptions";
import { AnimatePresence } from "framer-motion";
import {
  changeNestedLike,
  deletePostComment,
} from "@/redux_store/posts/postAPI";
import { RiReplyFill } from "react-icons/ri";
import { motion as m } from "framer-motion";
import { BiPlusCircle } from "react-icons/bi";
import { RootState } from "@/redux_store";
import { fetchReplyToComment } from "../api/posts";

interface SingleCommentProps extends Comment {
  postId: string;
  likeChangeHandler: (id: string) => void;
  newNestedCommentHandler?: (commentId: string, commentReply: string) => void;
  postPerMedia?: boolean;
}

export const SingleComment: FC<SingleCommentProps> = ({
  commentText,
  createdDate,
  likes,
  userImg,
  username,
  postId,
  id,
  comments,
  userId,
  likeChangeHandler,
  postPerMedia,
  newNestedCommentHandler,
  allData,
}) => {
  const [firstTime, setFirstTime] = useState(true);
  const [showNestedComments, setShowNestedComments] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length); // in order to show updated like count on frontend
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((st) => st.UI);
  const [showLikeAnimation, setShowLikeAnimation] = useState(
    (likes as Like[]).some((el) => el.userId === userDetails?.id)
  );
  const userData: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );
  const [commentReply, setCommentReply] = useState("");
  const deleteCommentHandler = () => dispatch(deletePostComment(postId, id));

  useEffect(() => {
    return () => {
      setFirstTime(true);
    };
  }, []);

  console.log(userData);
  console.log(allData);
  

  // to show count at frontend and calling api behind
  useEffect(() => {
    // if animation is true and component doesn't load for first then we increase like count
    if (showLikeAnimation && !firstTime) setLikeCount((lst) => lst + 1);

    // if animation is false and component doen't load first time then we decrease like count
    if (!showLikeAnimation && !firstTime)
      setLikeCount((lst) => {
        if (lst === 0) return 0;

        return lst - 1;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLikeAnimation]);

  const addNewNestedComment = (e: FormEvent) => {
    e.preventDefault();

   /*  console.log(commentReply);

    const commentBody = {
      commentid: "string",
      postid: "string",
      post_leaderid: "string",
      userid: "string",
      usertype: "string",
      username: "string",
      userimg: "string",
      comment_text: "string",
    };
    const token = userData?.token;

    try {
      const data = fetchReplyToComment(commentBody, token);
      console.log(data);
      
    } catch (error) {} */

    if (commentReply.length === 0) return;

    newNestedCommentHandler && newNestedCommentHandler(id, commentReply);

    setCommentReply("");
  };

  const changeNestedCommentLike = (commentId: string) => {
    dispatch(
      changeNestedLike({
        id: commentId,
        likeTypeStatus: "_comments",
        postId,
        userId,
        eventID: "0010",
      })
    );
  };

  return (
    <>
      <li className="flex items-start gap-5 border-b pb-3 max-[400px]:gap-3">
        <Image
          alt="user pic"
          src={allData?.userimg || ""}
          width={1000}
          height={1000}
          className="w-8 aspect-square rounded-full object-cover object-center"
        />

        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="flex flex-col text-gray-500 gap-2">
              <p className="text-[15px] flex flex-col">
                <strong className="text-sky-950 font-medium capitalize">
                  {allData?.username?.length ? allData?.username : username}
                  ......
                </strong>
                {allData?.comment_text?.length
                  ? allData?.comment_text
                  : commentText}
              </p>

              <section className="flex items-center gap-3">
                <strong className="text-[14px] text-sky-950 font-medium">
                  {allData?.created_date?.length > 0
                    ? dateConverter(allData?.created_date) || ""
                    : dateConverter(createdDate) || ""}
                </strong>
                <button
                  className={`flex flex-col gap-3 relative transition-all ${
                    likeCount ? "text-rose-500" : "text-black"
                  }`}
                  onClick={() => {
                    likeChangeHandler(id);
                    setFirstTime(false);
                    setShowLikeAnimation((lst) => !lst);
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

                  <span className="text-[14px] absolute -top-3 left-5 font-[500]">
                    {likeCount}
                  </span>
                </button>

                {/* Showing nested comments that are not in per media */}
                {!postPerMedia && (
                  <button
                    onClick={() => setShowNestedComments((lst) => !lst)}
                    className={`flex flex-col gap-3 relative transition-all ml-2 text-black ${
                      showNestedComments ? "text-rose-500" : "text-black"
                    }`}
                  >
                    <RiReplyFill className="text-lg" />

                    <span className="text-[14px] absolute -top-3 left-4 font-[500]">
                      {comments.length}
                    </span>
                  </button>
                )}
              </section>
            </div>

            {userId === userDetails?.id && (
              <div className="relative ml-auto">
                <button
                  type="button"
                  onClick={() => setShowCommentOptions((lst) => !lst)}
                >
                  <BsThreeDots className="rotate-90 text-lg" />
                </button>

                <AnimatePresence>
                  {showCommentOptions && (
                    <PostCommentOptions
                      deleteCommentHandler={deleteCommentHandler}
                      onClose={() => setShowCommentOptions(false)}
                      userId={userId}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* COMMENT REPLY */}
          {showNestedComments && (
            <div className="ml-16 mt-2 max-[600px]:ml-5 max-[400px]:ml-0">
              <ul className="bg-zinc-100 rounded-md ">
                {comments.map((el) => (
                  <NestedCommentCmp
                    changeNestedCommentLike={changeNestedCommentLike}
                    {...el}
                    key={el.id}
                    postId={postId}
                  />
                ))}
              </ul>
              {/* Add a new comment */}
              <form
                className="flex items-end bg-white gap-3 pt-3"
                onSubmit={addNewNestedComment}
              >
                <Image
                  src={userImg}
                  alt="user dp"
                  width={1000}
                  height={1000}
                  className="w-8 aspect-square object-cover object-center rounded-full"
                />
                <label htmlFor="nestedComment" className="flex-1 relative">
                  <input
                    value={commentReply}
                    onChange={(e) => setCommentReply(e.target.value)}
                    type="text"
                    id="nestedComment"
                    className="border-b outline-none focs:bg-zinc-100 w-full pb-1 pr-3 pl-1 font-[15px]"
                    placeholder="Reply"
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 right-1 translate-y-[-50%]"
                  >
                    <BiPlusCircle className="text-2xl" />
                  </button>
                </label>
              </form>
            </div>
          )}
        </div>
      </li>
    </>
  );
};

interface NestedCommentCmpProps extends NestedComment {
  postId: string;
  changeNestedCommentLike: (id: string) => void;
}

const NestedCommentCmp: FC<NestedCommentCmpProps> = ({
  commentText,
  createdDate,
  id,
  likes,
  userImg,
  username,
  changeNestedCommentLike,
}) => {
  const [firstTime, setFirstTime] = useState(true);
  const { userDetails } = cusSelector((st) => st.UI);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [showLikeAnimation, setShowLikeAnimation] = useState(
    likes.some((el) => el.userId === userDetails?.id)
  );

  useEffect(() => {
    return () => {
      setFirstTime(true);
    };
  }, []);

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
    <m.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-5 last_noti p-2"
    >
      <Image
        alt="user pic"
        src={userImg}
        width={1000}
        height={1000}
        className="w-8 aspect-square rounded-full object-cover object-center"
      />

      <div className="flex w-full">
        <div className="flex flex-col text-gray-500 gap-2">
          <p className="text-[15px] flex flex-col">
            <strong className="text-sky-950 font-medium capitalize">
              {username}
            </strong>
            {commentText}
          </p>

          <section className="flex items-center gap-3">
            <strong className="text-[14px] text-sky-950 font-medium">
              {dateConverter(createdDate)}
            </strong>
            <button
              className={`flex flex-col gap-3 relative transition-all ${
                likeCount ? "text-rose-500" : "text-black"
              }`}
              onClick={() => {
                setFirstTime(false);
                setShowLikeAnimation((lst) => !lst);
                changeNestedCommentLike(id);
              }}
            >
              <BsFillHeartFill className="text-[.9rem]" />

              {!firstTime && (
                <BsFillHeartFill
                  className={`text-[.9rem] overlay ${
                    showLikeAnimation ? "fadeOut" : "fadeIn"
                  }`}
                />
              )}

              <span className="text-[14px] absolute -top-3 left-[1rem] font-[500]">
                {likeCount}
              </span>
            </button>
          </section>
        </div>

        <div className="relative ml-auto">
          {/* <button
            type='button'
            onClick={() => setShowCommentOptions((lst) => !lst)}>
            <BsThreeDots className='rotate-90 text-lg' />
          </button>

          <AnimatePresence>
            {showCommentOptions && (
              <PostCommentOptions
                deleteCommentHandler={deleteCommentHandler}
                onClose={() => setShowCommentOptions(false)}
              />
            )}
          </AnimatePresence> */}
        </div>
      </div>
    </m.li>
  );
};
