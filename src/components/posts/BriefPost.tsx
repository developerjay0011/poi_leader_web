import { UserData, userImg } from "@/utils/utility";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { PostOptions } from "./PostOptions";
import { DeleteGalleryMedia } from "../api/gallery";

interface BriefPostProps {
  userMedia: any;
  deletedata: any;
}
export const BriefPost: FC<BriefPostProps> = ({ userMedia, deletedata }) => {
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  console.log(userMedia);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const serializedData = sessionStorage.getItem("user Data");

    if (serializedData) {
      const userDataFromStorage: UserData = JSON.parse(serializedData);
      setUserData(userDataFromStorage);
    }
  }, []);

  console.log(userData);

  const deletePostHandler = async (id: string) => {
    console.log(id);

    try {
      const DeleteGalleryIds = {
        leaderid: userData?.id || "",
        deleteids: [id],
      };

      const token = userData?.token;

      const deleteRes = await DeleteGalleryMedia(DeleteGalleryIds, token);

      if (deleteRes.success) {
        deletedata(deleteRes);
        setShowMorePostOptions(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <li className="w-full aspect-square rounded-md bg-sky-50 overflow-hidden relative brief_post">
        <button
          id="postIcon"
          className="absolute top-4 right-4 z-[5] flex items-center gap-3"
        >
          <RiCheckboxMultipleBlankFill className="text-2xl text-white" />
          <div className="ml-auto relative" id="moreOptions">
            <button onClick={() => setShowMorePostOptions((lst) => !lst)}>
              <BsThreeDots className="text-2xl rotate-90 " />
            </button>

            {showMorePostOptions && (
              <PostOptions
                deletePostHandler={() => deletePostHandler(userMedia.id)}
                // userId={userId}
                userId="{userId}"
                onClose={() => setShowMorePostOptions(false)}
              />
            )}
          </div>
        </button>

        <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 overlay flex items-center justify-center">
          <div className="flex gap-4 text-white">
            <p className="flex items-center gap-2">
              <BiLike className="text-xl" /> 0
            </p>

            <p className="flex items-center gap-2">
              <BiShare className="text-xl" /> 0
            </p>

            <p className="flex items-center gap-2">
              <BiComment className="text-xl" /> 0
            </p>
          </div>
        </div>
        <Image
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
          src={`http://203.92.43.166:4005${userMedia.media}`}
          alt="user image"
        />
      </li>
    </>
  );
};
