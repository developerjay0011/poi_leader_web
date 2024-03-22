"use client";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { CommonBox } from "@/utils/CommonBox";
import {
  ErrObj,
  NewPostFields,
  PostType,
  UserPostType,
} from "@/utils/typesUtils";
import { GenerateId, convertFileToBase64 } from "@/utils/utility";
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { BiX } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { PostTypes } from "./PostTypes";
import CustomImage from "@/utils/CustomImage";
import { GetLeaderAddedPosts, GetPostsForLeader, addPost, addStories, getLeaderAddedStories, getStoriesForLeader } from "@/redux_store/posts/postAPI";
import { tryCatch } from "@/config/try-catch";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { postActions } from "@/redux_store/posts/postSlice";
import { getImageUrl, setusername } from "@/config/get-image-url";

interface NewPostBoxProps {
  type: UserPostType;
  handleClose?: () => void;
  handleAdd: () => void;
}

export const NewPostBox: FC<NewPostBoxProps> = ({ type, handleClose, handleAdd }) => {
  const dispatch = cusDispatch();
  const [previewImages, setPreviewImages] = useState<NewPostFields[]>([]);
  const [apimedia, setApiMedia] = useState<NewPostFields[]>([]);
  const [textPost, setTextPost] = useState("");
  const [postErr, setPostErr] = useState<ErrObj>({ errTxt: "", isErr: false });
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const [accessType, setAccessType] = useState("open");
  const { userDetails } = cusSelector((state) => state.auth);
  const { leaderProfile, } = cusSelector((state) => state.leader);
  const [loader, setLoading] = useState(false);




  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (previewImages.length === 0 || accessType?.length === 0 || (apimedia?.length === 0 && type !== "post")) {
      return setPostErr({ errTxt: "Post can't be empty", isErr: true });
    }
    const formData = new FormData();
    formData.append("leaderid", userDetails?.leaderId || "");
    formData.append("written_text", textPost || "");
    formData.append("access_type", accessType);
    for (let i = 0; i < apimedia.length; i++) {
      const item: any = apimedia[i];
      formData.append("media", item?.media);
    }
    tryCatch(async () => {
      let response: any = "";
      setLoading(true)
      if (type === "post") {
        response = await addPost(formData);
        if (response?.success) {
          const postsForLeader = await GetPostsForLeader(userDetails?.leaderId);
          dispatch(postActions.setPost(postsForLeader));
          const leaderpost = await GetLeaderAddedPosts(userDetails?.leaderId);
          dispatch(postActions.listPosts(leaderpost as any));
        }
      } else if (type === "story") {
        response = await addStories(formData);
        if (response?.success) {
          var mypostdata = { image: leaderProfile?.image, name: setusername(leaderProfile), leaderid: userDetails?.leaderId }
          const LeaderAddedStories = await getLeaderAddedStories(userDetails?.leaderId, mypostdata) as any
          dispatch(postActions.storeMyStories(LeaderAddedStories))
          const storiesForLeader = await getStoriesForLeader(userDetails?.leaderId);
          dispatch(postActions.storeStories(storiesForLeader as any[]));
        }
      }
      setLoading(false)
      handleAdd()
      if (response?.success) {
        setPreviewImages([]);
        setApiMedia([]);
        setTextPost("");

        dispatch(
          commonActions.showNotification({
            type: ToastType.SUCCESS,
            message: response.message,
          })
        );
        if (handleClose) handleClose();
      } else {
        dispatch(
          commonActions.showNotification({
            type: ToastType.ERROR,
            message: response.message,
          })
        );
      }
    });
  };





  const mediaChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setPostErr({
      errTxt: "",
      isErr: false,
    });

    const data = e.target.files as FileList;
    if (!data || data.length === 0) return;

    for (let i = 0; i < data.length; i++) {
      const uploadData = data[i];
      // checking for media type
      if (!(uploadData.type.includes("image") || uploadData.type.includes("video")))
        return setPostErr({
          errTxt: "File type not allowed",
          isErr: true,
        });

      // converting data into base 64
      const convertedData = await convertFileToBase64(uploadData);

      setApiMedia((lst) => {
        const oldData = [...lst];
        oldData.push({
          type: uploadData.type.split("/")[0] as PostType,
          media: uploadData as any,
          id: GenerateId(),
        });
        return oldData;
      });
      const updatedPreviewList = [...previewImages];
      updatedPreviewList.push({
        type: uploadData.type.split("/")[0] as PostType,
        media: convertedData as string,
        id: GenerateId(),
      });
      setPreviewImages(updatedPreviewList);
    }
  };

  const removeImageHandler = (id: string) => {
    setPostErr({
      errTxt: "",
      isErr: false,
    });
    const updatedPreviewList = previewImages.filter(el => el.id !== id);
    setPreviewImages(updatedPreviewList);
  };

  return (
    <>
      <CommonBox title={`create ${type}`} key={`form-${type}`}>
        <form
          id={`form-${type}`}
          className="flex flex-col gap-4 py-4 "
          onSubmit={formSubmitHandler}
        >
          <div className="flex items-start gap-3">
            <CustomImage
              src={getImageUrl(leaderProfile?.image)}
              alt="user image"
              width={1000}
              height={1000}
              className="rounded-full w-14 overflow-hidden bg-red-500 aspect-square object-center object-cover self-start"
            />
            <textarea
              rows={5}
              value={textPost}
              className="resize-none flex-1 outline-none placeholder:capitalize text-sm focus:p-3 focus:bg-zinc-100 transition-all rounded"
              onChange={(e) => {
                setPostErr({ errTxt: "", isErr: false });
                setTextPost(e.target.value);
              }}
              placeholder="share what your are thinking?"
            ></textarea>
          </div>

          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <label htmlFor={`medias-${type}`}>
                <input
                  type="file"
                  className="hidden"
                  id={`medias-${type}`}
                  onChange={mediaChangeHandler}
                />
                <BsImageFill className="text-sky-950 text-xl text-opacity-70" />
              </label>
            </div>
            <div className="ml-auto relative" id="moreOptions">
              {showMorePostOptions && (
                <PostTypes
                  onClose={() => setShowMorePostOptions(false)}
                  accessTypeOptions={(e: any) => setAccessType(e)}
                />
              )}
              <div className="cursor-pointer" onClick={() => setShowMorePostOptions(!showMorePostOptions)}>
                <span className="capitalize">{`Post Type ${(accessType && ": " + accessType) || ""}`}</span>
              </div>
            </div>
          </div>

          {postErr.isErr && (
            <p className="text-red-500 text-[14px]">{postErr.errTxt}</p>
          )}

          {/* Preview box */}
          {previewImages.length > 0 && (
            <div className="">
              {/* Preview Line */}
              <div className="preview">
                <p>preview</p>
                <span className="line" />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {previewImages.map((el) => (
                  <div className="w-20 aspect-square relative" key={el.id}>
                    {el.type === "image" && (
                      <CustomImage
                        src={el.media}
                        width={1000}
                        height={1000}
                        alt="media post"
                        className="w-full h-full aspect-square object-cover object-center"
                      />
                    )}
                    {el.type === "video" && (
                      <video
                        src={el.media}
                        className="w-full h-full aspect-square object-cover object-center"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeImageHandler(el.id)}
                      className="bg-black bg-opacity-50 text-white text-lg rounded-full absolute top-1 right-1"
                    >
                      <BiX />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loader} className="bg-sky-400 text-sky-50 py-1 rounded-md capitalize font-[500]">
            {loader ? "creating.." : type}
          </button>

        </form>
      </CommonBox>
    </>
  );
};
