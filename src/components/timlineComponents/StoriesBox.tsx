import { RootState } from "@/redux_store";
import { cusSelector } from "@/redux_store/cusHooks";
import { CommonBox } from "@/utils/CommonBox";
import { PostType } from "@/utils/typesUtils";
import { GenerateId, UserData, convertFileToBase64 } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsPlusCircle, BsThreeDots } from "react-icons/bs";
import {
  fetchAddStory,
  fetchDeleteStory,
  fetchGetLeaderAddedStories,
} from "../api/stories";
import { PostOptions } from "../posts/PostOptions";

interface StoriesBoxProps {}

const IMAGES = [
  "https://images.unsplash.com/photo-1665395806066-d47f41e6aa6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1696430484960-543301cda6d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1696587522095-1d0b522b3e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1665395806066-d47f41e6aa6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1682686578456-69ae00b0ecbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1696430484960-543301cda6d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1696587522095-1d0b522b3e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
];

export const StoriesBox: FC<StoriesBoxProps> = () => {
  const [storyMedia, setStoryMedia] = useState<Media[]>([]);
  const [textPost, setTextPost] = useState("");
  const [getStories, setGetStories] = useState([]);
  const [updateStory, setUpdateStory] = useState({});
  const id = GenerateId();
  /*  const userData: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );
 */
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const serializedData = sessionStorage.getItem("user Data");

    if (serializedData) {
      const userDataFromStorage: UserData = JSON.parse(serializedData);
      setUserData(userDataFromStorage);
    }
  }, []);

  console.log(userData);

  const mediaChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setStoryMedia([]);
    const data = e.target.files as FileList;
    if (!data || data.length === 0) return;
    const newMedia: Media[] = [];

    for (let i = 0; i < data.length; i++) {
      const uploadData = data[i];

      // checking for media type
      const type = uploadData.type.split("/")[0];

      // converting data into base 64
      const convertedData = await convertFileToBase64(uploadData);

      newMedia.push({
        type: type,
        media: uploadData,
        id: GenerateId(),
      });
    }

    setStoryMedia((oldMedia) => [...oldMedia, ...newMedia]);

    const token = userData?.token;

    const formData = new FormData();

    formData.append("leaderid", userData?.id || "");
    formData.append("written_text", textPost || "");
    formData.append("access_type", "open");

    for (let i = 0; i < data.length; i++) {
      const item: any = data[i];

      formData.append("media", item);
    }

    try {
      const data = await fetchAddStory(formData, token);

      if (data?.success) {
        setUpdateStory(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const leaderid = userData?.id || "";
    const token = userData?.token || "";

    (async () => {
      try {
        const data = await fetchGetLeaderAddedStories(leaderid, token);

        if (data?.length > 0) {
          setGetStories(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userData, updateStory]);

  const handleDelete = async (leaderid: string, id: string) => {
    const token = userData?.token;

    const postBody = {
      id: id,
      leaderid: leaderid,
    };

    try {
      const data = await fetchDeleteStory(postBody, token);
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
                  <Image
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
                const imageUrl = `http://203.92.43.166:4005${item?.media}`;
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

            {/* {IMAGES.slice(0, 5).map((el, index) => {
              console.log(el);

              return <Story key={index} img={el} id="" />;
            })} */}
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

  console.log(userData);

  const leaderid = userData?.id || "";

  const deletePostHandler = async (leaderid: string, id: string) => {
    handleDelete(leaderid, id);
    setShowMorePostOptions(false);
  };

  return (
    <>
      <li className="w-44 h-[300px]  aspect-[9/16] rounded-lg relative ">
        {/* User Img */}

        <Image
          src={img}
          width={1000}
          height={1000}
          alt="user display pic"
          className="absolute top-3 left-3 border-2 border-white z-20 w-12 aspect-square rounded-full object-cover object-center shadow"
        />

        {/* Story Image */}
        <figure className="absolute top-0 left-0 w-full h-full object-cover object-center story_img">
          <Image
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
