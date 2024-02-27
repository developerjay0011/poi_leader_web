"use client";
import { Comment, Like, PostDetails } from "@/utils/typesUtils";
import { dateConverter } from "@/utils/utility";
import { FC, useState } from "react";
import { BiShareAlt, BiSolidMessageAltDetail } from "react-icons/bi";
import { BsFillHeartFill, BsHeart, BsThreeDots } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { cusSelector } from "@/redux_store/cusHooks";
import { NewCommentForm } from "../common-forms/NewCommentForm";
import { SingleComment } from "./SingleComment";
import toast from "react-hot-toast";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import PostGrid from "../PostGrid";
import { Shortlistbytime, islike } from "./utils";
import { LikePost, UnlikePostorStory } from "@/redux_store/posts/postAPI";
import { PostOptions } from "./PostOptions";


interface PostProps extends PostDetails {
  props: any;
  userdetails: any;
  post: any;
  type: any;
  Getpost: () => void;
  index: string,
  allData: any,
}

export const Post: FC<PostProps> = ({ userdetails, post, Getpost, index, allData, }) => {
  const [firstTime, setFirstTime] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const { userDetails } = cusSelector((st) => st.auth);
  var is_like = islike(post?.likes, userDetails?.id)
  const [showLikeAnimation, setShowLikeAnimation] = useState((post?.likes as Like[])?.some((el) => el.userId === userDetails?.id));
  const handleLike = async () => {
    const likeBody = {
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
      usertype: "leader",
      username: userDetails?.username,
      userimg: userDetails?.image,
    };
    const UnlikeBody = {
      postid: post?.id,
      post_leaderid: post?.leaderid,
      userid: userDetails?.id,
    };
    try {
      if (!is_like) {
        const data = await LikePost(likeBody);
        toast.success(data.message);
        Getpost();
      } else {
        const data = await UnlikePostorStory(UnlikeBody);
        toast.success(data.message);
        Getpost();
      }
    } catch (error) {
      console.log(error);
    }
  };






  return (
    <section key={index} className="border rounded-md bg-white px-5">
      {/* User */}
      <div className="flex items-center gap-3 py-4 text-sky-950 border-b">
        <CustomImage
          src={getImageUrl(userdetails?.image)}
          alt="user pic"
          className="w-12 aspect-square object-cover object-center rounded-full"
          width={100}
          height={100}
        />
        <div>
          <h4 className="font-[600] text-lg text-orange-500">
            {userdetails?.name}
          </h4>
          <p className="flex items-center capitalize gap-2 text-sm font-[500]">
            <span>
              Published on:{" "}{dateConverter(post?.createddate)}
            </span>
          </p>
        </div>
        {/* <div className="ml-auto relative" id="moreOptions">
          <button onClick={() => { }}>
            <BsThreeDots className="text-2xl" />
          </button>
          
            {showMorePostOptions && (
              <PostOptions
                deletePostHandler={() => deletePostHandler(leaderid, id)}
                userId={userId}
                onClose={() => setShowMorePostOptions(false)}
              />
            )}
        </div> */}
      </div>

      {/* Post */}
      <div className="flex flex-col gap-5 mt-5">
        {post?.media?.length > 0 && <PostGrid imagesOrVideos={post?.media?.map((item: any) => getImageUrl(item?.media)) as []} />}
        <p className="text-[16px]">{post?.written_text}</p>
      </div>
      <div className="w-full h-[2px] bg-zinc-100 my-6" />

      {/* Action */}
      <div className="mb-5 flex items-center gap-6">
        <button className={`flex flex-col gap-3 relative transition-all ${is_like ? "text-rose-500" : "text-black"}`}
          onClick={() => { setFirstTime(false); setShowLikeAnimation(!is_like); handleLike(); }}
        >
          {is_like ? (<BsFillHeartFill className="text-lg" />) : (<BsHeart className="text-lg" />)}
          {!firstTime && (<BsFillHeartFill className={`text-lg overlay ${showLikeAnimation ? "fadeOut" : "fadeIn"}`} />)}
          <span className="text-[14px] absolute -top-4 left-4 font-[500]">
            {post?.likes?.length}
          </span>
        </button>
        <button
          className={`flex flex-col gap-3 relative transition-all hover:text-rose-500 ${showComments ? "text-rose-500" : "text-black"}`}
          onClick={() => setShowComments((lst) => !lst)}
        >
          <BiSolidMessageAltDetail className="text-[1.4rem]" />
          <span className="text-[14px] absolute -top-4 left-5 font-[500]">
            {post?.comments?.length}
          </span>
        </button>
        {/* <button className="flex flex-col gap-3 relative transition-all hover:text-rose-500">
          <BiShareAlt className="text-[1.4rem]" />
          <span className="text-[14px] absolute -top-4 left-5 font-[500]">
            0
          </span>
        </button> */}
      </div>



      {/* Commnets */}
      <AnimatePresence mode="wait">
        {showComments && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ul className="flex flex-col gap-5">
              {(Shortlistbytime(post?.comments) as Comment[]).map((el:any, index:number) => (
                <SingleComment
                  {...el}
                  comments={el}
                  key={index}
                  comment_text={el?.comment_text}
                  likeChangeHandler={() => Getpost()}
                  newNestedCommentHandler={() => Getpost()}
                  post={post}
                />
              ))}
            </ul>
            <NewCommentForm
              CommentHandler={() => Getpost()}
              allData={allData}
            />
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};
