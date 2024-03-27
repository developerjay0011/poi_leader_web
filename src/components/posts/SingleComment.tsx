import { cusSelector } from "@/redux_store/cusHooks";
import { Comment, NestedComment } from "@/utils/typesUtils";
import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PostCommentOptions } from "./PostCommentOptions";
import { AnimatePresence } from "framer-motion";
import { RiReplyFill } from "react-icons/ri";
import { motion as m } from "framer-motion";
import { BiPlusCircle } from "react-icons/bi";
import { getImageUrl, setusername } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import moment from "moment";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { islike } from "./utils";
import toast from "react-hot-toast";
import { LikeComment, ReplyToComment, UnLikeComment } from "@/redux_store/posts/postAPI";

interface SingleCommentProps extends Comment {
  likeChangeHandler: () => void;
  newNestedCommentHandler: () => void;
  postPerMedia?: boolean;
  comment_text: string;
  comments: any;
  post: any
}

export const SingleComment: FC<SingleCommentProps> = ({ username, id, userId, postPerMedia, newNestedCommentHandler, likeChangeHandler, comment_text, comments, post }) => {
  const { userDetails } = cusSelector((st) => st.auth);
  const { leaderProfile } = cusSelector((st) => st.leader);
  const [firstTime, setFirstTime] = useState(true);
  const [showNestedComments, setShowNestedComments] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState<any>();
  const [commentReply, setCommentReply] = useState("");
  const [name, setName] = useState("");
  const deleteCommentHandler = () => { };
  var is_like = islike(comments?.likes, userDetails?.id)
  const handleLike = async (id: string) => {
    const likeBody = {
      commentid: id,
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
      usertype: "leader",
      username: setusername(leaderProfile),
      userimg: leaderProfile?.image,
    };
    const UnlikeBody = {
      commentid: id,
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
    };
    try {
      if (!is_like) {
        const data = await LikeComment(likeBody);
        likeChangeHandler();
        toast.success(data.message);
      } else {
        const data = await UnLikeComment(UnlikeBody);
        toast.success(data.message);
        likeChangeHandler()
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!commentReply.startsWith(name)) {
      setShowNestedComments(false)
    }
  }, [name, commentReply])
  const addNewNestedComment = async (e: FormEvent) => {
    e.preventDefault();
    if (commentReply.length === 0) return;
    const commentBody = {
      commentid: id,
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
      usertype: "leader",
      username: setusername(leaderProfile),
      userimg: leaderProfile?.image,
      comment_text: commentReply,
    };
    const data = await ReplyToComment(commentBody)
    if (data?.success) {
      newNestedCommentHandler()
      setShowNestedComments(false)
      setCommentReply("");
      setName("");
    }
  };

  return (
    <>
      <li className="flex items-start gap-5 border-b pb-3 max-[400px]:gap-3">
        <CustomImage
          alt="user pic"
          src={getImageUrl(comments?.userimg)}
          width={1000}
          height={1000}
          className="w-8 aspect-square rounded-full object-cover object-center"
        />

        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="flex flex-col text-gray-500 gap-1">
              <p className="text-[15px] flex flex-col">
                <strong className="text-sky-950 font-medium capitalize">
                  {username}
                </strong>
                {comment_text}
              </p>
              <section className="flex items-center gap-3">
                <strong className="text-[14px] text-sky-950 font-medium">
                  {moment(comments?.created_date).fromNow()}
                </strong>
                <button
                  className={`flex flex-col gap-3 relative transition-all ${comments?.likes?.length ? "text-rose-500" : "text-black"}`}
                  onClick={() => {
                    setFirstTime(false);
                    handleLike(comments?.id)
                    setShowLikeAnimation(!is_like);
                  }}
                >
                  {is_like ? (<BsFillHeartFill className="text-lg" />) : (<BsHeart className="text-lg" />)}
                  {!firstTime && (<BsFillHeartFill className={`text-lg overlay ${showLikeAnimation ? "fadeOut" : "fadeIn"}`} />)}
                  <span className="text-[14px] absolute -top-3 left-5 font-[500]">
                    {comments?.likes?.length}
                  </span>
                </button>

                {!postPerMedia && (
                  <button
                    onClick={() => {
                      setShowNestedComments((lst) => !lst);
                      setName("@" + username)
                      setCommentReply("@" + username + " ")
                    }}
                    className={`flex flex-col gap-3 relative transition-all ml-2 text-black ${showNestedComments ? "text-rose-500" : "text-black"}`}
                  >
                    <RiReplyFill className="text-lg" />
                    <span className="text-[14px] absolute -top-3 left-4 font-[500]">
                      {comments?.comments.length}
                    </span>
                  </button>
                )}
              </section>
            </div>

            {userId === userDetails?.id && (
              <div className="relative ml-auto">
                <button type="button" onClick={() => setShowCommentOptions((lst) => !lst)}>
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
            <div className="mt-2 max-[600px]:ml-5 max-[400px]:ml-0">
              <ul className="bg-zinc-100 rounded-md ">
                {comments?.comments.map((el: any, index: any) => (
                  <NestedCommentCmp
                    item={el} key={index}
                    userimg={el?.userimg}
                    comment_text={el?.comment_text}
                    username={el?.username}
                    created_date={el?.created_date}
                    {...el} />
                ))}
              </ul>
              {/* Add a new comment */}
              <form className="flex items-end bg-white gap-3 pt-3" onSubmit={addNewNestedComment}>
                <CustomImage
                  src={getImageUrl(leaderProfile?.image)}
                  priority={true}
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
                  <button type="submit" className="absolute top-1/2 right-1 translate-y-[-50%]">
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
  userimg: string
  username: string
  comment_text: string
  created_date: string
}

const NestedCommentCmp: FC<NestedCommentCmpProps> = ({ userimg, username, comment_text, created_date }) => {
  return (
    <m.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-2 last_noti p-2"
    >
      <CustomImage
        alt="user pic"
        src={getImageUrl(userimg)}
        width={1000}
        height={1000}
        className="w-8 aspect-square rounded-full object-cover object-center"
      />

      <div className="flex w-full">
        <div className="flex flex-col text-gray-500 gap-1">
          <p className="text-[13px] flex flex-col">
            <strong className="text-sky-950 font-medium capitalize">
              {username}
            </strong>
            {comment_text}
          </p>
          <section className="flex items-center gap-2">
            <strong className="text-[11px] text-sky-950 font-medium">
              {moment(created_date).fromNow()}
            </strong>
            {/* <button
              className={`flex flex-col gap-3 relative transition-all ${likeCount ? "text-rose-500" : "text-black"
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
                  className={`text-[.9rem] overlay ${showLikeAnimation ? "fadeOut" : "fadeIn"
                    }`}
                />
              )}

              <span className="text-[14px] absolute -top-3 left-[1rem] font-[500]">
                {likeCount}
              </span>
            </button> */}
          </section>
        </div>
      </div>
    </m.li>
  );
};
