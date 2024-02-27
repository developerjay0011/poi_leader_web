"use client";
import { cusSelector } from "@/redux_store/cusHooks";
import { FC, FormEvent, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import { CommentPost } from "@/redux_store/posts/postAPI";

interface NewCommentFormProps {
  CommentHandler: (comment: string) => void;
  allData: any;
}

export const NewCommentForm: FC<NewCommentFormProps> = ({ CommentHandler, allData, }) => {
  const [commentText, setCommentText] = useState("");
  const { userDetails } = cusSelector((st) => st.auth);
  const postuser = allData?.userdetails
  const postdetails = allData?.post
  const addNewCommentHandler = async (e: FormEvent) => {
    e.preventDefault();
    const commentBody = {
      "postid": postdetails?.id,
      "post_leaderid": postuser?.leaderid,
      "userid": userDetails?.id,
      "usertype": "leader",
      "username": userDetails?.username,
      "userimg": userDetails?.image ? userDetails?.image : '',
      'comment_text': commentText,
    };
    try {
      const data = await CommentPost(commentBody);
      if (data?.success) { CommentHandler(commentText); }
    } catch (error) {
      console.log(error);
    }
    if (commentText.length === 0) return;
    setCommentText("");
  };

  return (
    <form className="flex items-start py-4 gap-5 mt-2 mb-1 relative max-[400px]:gap-3" onSubmit={addNewCommentHandler}>
      <CustomImage
        alt="user dp"
        src={getImageUrl(userDetails?.image)}
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
      />
      <button type="submit" className="absolute top-10 right-2">
        <BiRightArrow />
      </button>
    </form>
  );
};
