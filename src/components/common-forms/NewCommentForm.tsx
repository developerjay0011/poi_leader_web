"use client";
import { RootState } from "@/redux_store";
import { cusSelector } from "@/redux_store/cusHooks";
import Image from "next/image";
import { FC, FormEvent, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { fetchCommentPost } from "../api/posts";

interface NewCommentFormProps {
  CommentHandler: (comment: any) => void;
  allData: any;
  setUpdateComment: any;
}

export const NewCommentForm: FC<NewCommentFormProps> = ({
  CommentHandler,
  allData,
  setUpdateComment,
}) => {
  const userData: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );

  const { userDetails } = cusSelector((st) => st.UI);
  const [commentText, setCommentText] = useState("");

  const addNewCommentHandler = async (e: FormEvent) => {
    e.preventDefault();

    const mediaId = allData.media.map((m: any) => m.id).flat();

    const postid = allData?.id;

    const commentBody = {
      postid: postid,
      post_leaderid: allData?.leaderid,
      userid: userData?.data?.leader_detail?.id,
      mediaid: mediaId[0],
      usertype: "leader",
      username: userData?.data?.user_detail?.name,
      userimg: userData?.data?.user_detail?.image || "",
      comment_text: commentText,
    };

    const token = userData?.token;

    try {
      const data = await fetchCommentPost(commentBody, token);

      if (data?.success) {
        setUpdateComment(data);
      }
    } catch (error) {
      console.log(error);
    }

    if (commentText.length === 0) return;

    CommentHandler(commentText);

    setCommentText("");
  };

  return (
    <>
      <form
        className="flex items-start py-4 gap-5 mt-2 mb-1 relative max-[400px]:gap-3"
        onSubmit={addNewCommentHandler}
      >
        <Image
          alt="user dp"
          src={userDetails?.displayPic as string}
          width={1000}
          height={1000}
          className="w-10 aspect-square rounded-full object-center object-cover"
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={5}
          placeholder="share your thoughts"
          className="bg-zinc-100 p-3 outline-none flex-1 resize-none rounded-md placeholder:capitalize"
        ></textarea>

        <button type="submit" className="absolute top-10 right-2">
          <BiRightArrow />
        </button>
      </form>
    </>
  );
};
