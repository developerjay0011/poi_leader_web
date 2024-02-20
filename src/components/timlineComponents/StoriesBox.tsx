import { CommonBox } from "@/utils/CommonBox";
import { GenerateId, UserData } from "@/utils/utility";
import Link from "next/link";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsPlusCircle, BsThreeDots } from "react-icons/bs";
import {
  fetchAddStory,
  fetchDeleteStory,
  fetchGetLeaderAddedStories,
} from "../api/stories";
import { PostOptions } from "../posts/PostOptions";
import { cusSelector } from "@/redux_store/cusHooks";
import CustomImage from "@/utils/CustomImage";

interface StoriesBoxProps {}

export const StoriesBox: FC<StoriesBoxProps> = () => {
  const [storyMedia, setStoryMedia] = useState<Media[]>([]);
  const [textPost, setTextPost] = useState("");
  const [getStories, setGetStories] = useState([]);
  const [updateStory, setUpdateStory] = useState({});
  const id = GenerateId();
  const { userDetails } = cusSelector(state => state.auth);

  const mediaChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setStoryMedia([]);
    const data = e.target.files as FileList;
    if (!data || data.length === 0) return;
    const newMedia: Media[] = [];

    for (let i = 0; i < data.length; i++) {
      const uploadData = data[i];

      // checking for media type
      const type = uploadData.type.split("/")[0];
      newMedia.push({
        type: type,
        media: uploadData,
        id: GenerateId(),
      });
    }

    setStoryMedia((oldMedia) => [...oldMedia, ...newMedia]);
    const formData = new FormData();
    formData.append("leaderid", userDetails?.id || "");
    formData.append("written_text", textPost || "");
    formData.append("access_type", "open");

    for (let i = 0; i < data.length; i++) {
      const item: any = data[i];

      formData.append("media", item);
    }

    try {
      const data = await fetchAddStory(formData);

      if (data?.success) {
        setUpdateStory(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const leaderid = userDetails?.leaderId || "";

    if(leaderid) {
      (async () => {
        try {
          const data = await fetchGetLeaderAddedStories(leaderid);
  
          if (data?.length > 0) {
            setGetStories(data);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userDetails]);

  const handleDelete = async (leaderid: string, id: string) => {
    const postBody = {
      id: id,
      leaderid: leaderid,
    };

    try {
      const data = await fetchDeleteStory(postBody);
      if (data) {
        setUpdateStory(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CommonBox
        title="My Stories"
        cusJSX={[
          <Link
            key={id}
            href={"/leader"}
            className="text-sm font-normal hover:underline text-orange-500"
          >
            see all
          </Link>,
        ]}
      >
        <div className="w-[660px] ">
          <ul className="flex gap-2 py-5  w-full overflow-x-auto ">
            <li className=" w-44 h-[300px] aspect-[9/16] rounded-lg relative  ">
              <label htmlFor="media">
                <input
                  type="file"
                  className="hidden"
                  id="media"
                  multiple
                  onChange={mediaChangeHandler}
                />
                <BsPlusCircle className="absolute top-3 left-3 z-10 text-white text-[38px] shadow" />

                <figure className="absolute top-0 left-0 w-full h-full object-cover object-center story_img">
                  <CustomImage
                    src={
                      storyMedia?.length > 0
                        ? URL.createObjectURL(storyMedia[0]?.media)
                        : ""
                    }
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Overlay */}
                  <div className="absolute top-0 left-0 w-full bg-black bg-opacity-25 h-full"></div>
                </figure>
              </label>
            </li>

            {getStories.map((el: { media?: any[]; id: string } | undefined) =>
              el?.media?.map((item: any, index: number) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${item?.media}`;
                return (
                  <Story
                    key={index}
                    img={imageUrl}
                    id={el?.id}
                    handleDelete={handleDelete}
                  />
                );
              })
            )}
          </ul>
        </div>
      </CommonBox>
    </>
  );
};

interface StoryProps {
  img: string;
  self?: boolean;
  id: string;
  handleDelete: any;
}

interface Media {
  type: string;
  media: File;
  id: string;
}

const Story: FC<StoryProps> = ({ img, id, handleDelete }) => {
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const serializedData = sessionStorage.getItem("user Data");

    if (serializedData) {
      const userDataFromStorage: UserData = JSON.parse(serializedData);
      setUserData(userDataFromStorage);
    }
  }, []);

  const leaderid = userData?.id || "";

  const deletePostHandler = async (leaderid: string, id: string) => {
    handleDelete(leaderid, id);
    setShowMorePostOptions(false);
  };

  return (
    <>
      <li className="w-44 h-[300px]  aspect-[9/16] rounded-lg relative ">
        {/* User Img */}

        <CustomImage
          src={img}
          width={1000}
          height={1000}
          alt="user display pic"
          className="absolute top-3 left-3 border-2 border-white z-20 w-12 aspect-square rounded-full object-cover object-center shadow"
        />

        {/* Story Image */}
        <figure className="absolute top-0 left-0 w-full h-full object-cover object-center story_img">
          <CustomImage
            src={img}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full bg-black bg-opacity-25 h-full"></div>
        </figure>
        <div className="ml-auto relative" id="moreOptions">
          <button
            onClick={() => setShowMorePostOptions((lst) => !lst)}
            className="absolute right-0 rotate-90 top-6"
          >
            <BsThreeDots className="text-2xl" />
          </button>

          {showMorePostOptions && (
            <PostOptions
              deletePostHandler={() => deletePostHandler(leaderid, id)}
              userId={leaderid}
              onClose={() => setShowMorePostOptions(false)}
            />
          )}
        </div>
      </li>
    </>
  );
};
