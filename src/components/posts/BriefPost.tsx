import { UserData, userImg } from "@/utils/utility";
import { FC, useEffect, useState } from "react";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { PostOptions } from "./PostOptions";
import { DeleteGalleryMedia } from "../api/gallery";
import CustomImage from "@/utils/CustomImage";
import { getImageUrl } from "@/config/get-image-url";
import { tryCatch } from "@/config/try-catch";
import { deleteGallery } from "@/redux_store/gallery/galleryAPI";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { GrClose } from "react-icons/gr";

interface BriefPostProps {
  userMedia: any;
  deletedata: any;
}
export const BriefPost: FC<BriefPostProps> = ({ userMedia, deletedata }) => {
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  console.log(userMedia);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { leaderProfile } = cusSelector((state) => state.leader);
  const dispatch = cusDispatch();

  useEffect(() => {
    const serializedData = sessionStorage.getItem("user Data");

    if (serializedData) {
      const userDataFromStorage: UserData = JSON.parse(serializedData);
      setUserData(userDataFromStorage);
    }
  }, []);

  const deletePostHandler = async (id: string) => {
    tryCatch(
      async () => {
      const DeleteGalleryIds = {
        leaderid: leaderProfile?.id || "",
        deleteids: [id],
      };

        const response = await deleteGallery(DeleteGalleryIds);
        if (response?.success) {
          deletedata(response);
          setShowMorePostOptions(false);
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
    })
  };
  function isImage(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
  return (
    <>
      <li className="w-full aspect-square rounded-md bg-sky-50 overflow-hidden relative brief_post">
        <button
          id="postIcon"
          className="absolute top-4 right-4 z-[5] flex items-center gap-3"
        >
          <RiCheckboxMultipleBlankFill className="text-2xl text-white" />
          <div onClick={() => setShowMorePostOptions((lst) => !lst)} className="ml-auto relative" id="moreOptions">
            
            {showMorePostOptions ? <GrClose /> : 
              <BsThreeDots className="text-2xl rotate-90 " />
  }

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
        {
          isImage(getImageUrl(userMedia.media)) ?
            <CustomImage
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-center"
              src={getImageUrl(userMedia.media)}
              alt="user image"
            /> :
            <video
              src={getImageUrl(userMedia.media) as string}

              className='object-cover object-center w-full h-full'
              controls
            />
        }
       
        
      </li>
    </>
  );
};
