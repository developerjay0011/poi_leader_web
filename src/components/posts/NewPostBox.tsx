"use client";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { createNewPost } from "@/redux_store/posts/postAPI";
import { CommonBox } from "@/utils/CommonBox";
import { ErrObj, MediaPost, NewPostFields, PostType } from "@/utils/typesUtils";
import { GenerateId, UserData, convertFileToBase64 } from "@/utils/utility";
import Image from "next/image";
import { FC, FormEvent, useState, ChangeEvent, useEffect } from "react";
import { BiX } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { fetchAddPost } from "../api/posts";
import { RootState } from "@/redux_store";
import { PostTypes } from "./PostTypes";

interface NewPostBoxProps {
  updatePost: any;
}

export const NewPostBox: FC<NewPostBoxProps> = ({ updatePost }) => {
  const [media, setMedia] = useState<NewPostFields[]>([]);
  const [apimedia, setApiMedia] = useState<NewPostFields[]>([]);
  const [textPost, setTextPost] = useState("");
  const [postErr, setPostErr] = useState<ErrObj>({ errTxt: "", isErr: false });
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const [accessType, setAccessType] = useState("");
  const { creatingPost } = cusSelector((st) => st.posts);
  const { userDetails } = cusSelector((state) => state.auth);

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (
      textPost.trim().length === 0 &&
      media.length === 0 &&
      accessType?.length === 0
    )
      return setPostErr({ errTxt: "post can't be empty", isErr: true });

    const formData = new FormData();

    formData.append("leaderid", userDetails?.id || "");
    formData.append("written_text", textPost || "");
    formData.append("access_type", accessType);

    for (let i = 0; i < apimedia.length; i++) {
      const item: any = apimedia[i];

      formData.append("media", item?.media);
    }

    try {
      const data = await fetchAddPost(formData);
      if (data?.success) {
        updatePost(data);
      }
    } catch (error) {
      console.log(error);
    }

    setMedia([]);
    setApiMedia([]);
    setTextPost("");
  };

  const accessTypeOptions = (data: any) => {
    setAccessType(data);
  };

  const mediaChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setPostErr({
      errTxt: "",
      isErr: false,
    });

    const data = e.target.files as FileList;

    if (!data) return;

    for (let i = 0; i < data.length; i++) {
      const uploadData = data[i];

      // checking for media type
      if (
        !(
          uploadData.type.includes("image") || uploadData.type.includes("video")
        )
      )
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

      setMedia((lst) => {
        const oldData = [...lst];
        oldData.push({
          type: uploadData.type.split("/")[0] as PostType,
          media: convertedData as string,
          id: GenerateId(),
        });

        return oldData;
      });
    }
  };

  const removeImageHandler = (id: string) => {
    setPostErr({
      errTxt: "",
      isErr: false,
    });

    setMedia((lst) => {
      const newData = [...lst];

      newData.splice(
        newData.findIndex((dt) => dt.id === id),
        1
      );

      return newData;
    });
  };

  return (
    <>
      <CommonBox title="create post">
        <form className="flex flex-col gap-4 py-4" onSubmit={formSubmitHandler}>
          <div className="flex items-start gap-3">
            <Image
              src={userDetails?.displayPic as string}
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
              <label htmlFor="liveMedia">
                <FaCamera className="text-sky-950 text-xl text-opacity-70" />
              </label>

              <label htmlFor="medias">
                <input
                  type="file"
                  className="hidden"
                  id="medias"
                  multiple
                  onChange={mediaChangeHandler}
                />
                <BsImageFill className="text-sky-950 text-xl text-opacity-70" />
              </label>
            </div>
            <div className="ml-auto relative " id="moreOptions">
              <div
                className="cursor-pointer"
                onClick={() => setShowMorePostOptions(!showMorePostOptions)}
              >
                Post Type
              </div>
              {showMorePostOptions && (
                <PostTypes
                  onClose={() => setShowMorePostOptions(false)}
                  accessTypeOptions={accessTypeOptions}
                />
              )}
            </div>
          </div>

          {postErr.isErr && (
            <p className="text-red-500 text-[14px]">{postErr.errTxt}</p>
          )}

          {/* Preview box */}
          {media.length > 0 && (
            <div className="">
              {/* Preview Line */}
              <div className="preview">
                <p>preview</p>
                <span className="line" />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {media.map((el) => (
                  <div className="w-20 aspect-square relative" key={el.id}>
                    {el.type === "image" && (
                      <Image
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

          <button
            type="submit"
            disabled={creatingPost}
            className="bg-sky-400 text-sky-50 py-1 rounded-md capitalize font-[500]"
          >
            {creatingPost ? "posting.." : "post"}
          </button>
        </form>
      </CommonBox>
    </>
  );
};
