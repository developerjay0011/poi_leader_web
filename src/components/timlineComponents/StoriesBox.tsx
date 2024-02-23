import { CommonBox } from "@/utils/CommonBox";
import { GenerateId } from "@/utils/utility";
import Link from "next/link";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import {
  fetchDeleteStory,
} from "../api/stories";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { Story } from "./Story";
import { Media } from "@/interfaces/story";
import { addStories, deleteStory, getStoriesForLeader } from "@/redux_store/posts/postAPI";
import { groupBy } from "@/config/groupby";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";

export const StoriesBox: FC = () => {
  const dispatch = cusDispatch();
  const [textPost, setTextPost] = useState("");
  const [getStories, setGetStories] = useState([]);
  const [updateStory, setUpdateStory] = useState({});
  const id = GenerateId();
  const { userDetails } = cusSelector((state) => state.auth);

  const mediaChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
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
    const formData = new FormData();
    formData.append("leaderid", userDetails?.id || "");
    formData.append("written_text", textPost || "");
    formData.append("access_type", "open");

    for (let i = 0; i < data.length; i++) {
      const item: any = data[i];
      formData.append("media", item);
    }

    try {
      const response = await addStories(formData);

      if (response?.success) {
        dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const leaderid = userDetails?.leaderId;
    if (leaderid) {
      (async () => {
        try {
          const data = await getStoriesForLeader(leaderid);
          if (data?.length > 0) {
            // const groupByLeaderId = await groupBy(data, (item: any) => item.leaderid);
            // let mergeAllPosts: any = []
            // Object.keys(groupByLeaderId).forEach((el: any, index: number) => {
            //   mergeAllPosts[index] = [];
            //   groupByLeaderId[el].forEach(item => 
            //     mergeAllPosts[index] = [...mergeAllPosts[index], ...item.posts]
            //   );
            // })
            // console.log('groupByLeaderId => ', mergeAllPosts)
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
      const data = await deleteStory(postBody);
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
            <li className=" w-[80px] h-[100px] aspect-[9/16] rounded-lg relative  ">
              <label htmlFor="media" className="flex h-[80px] justify-center items-center rounded-full shadow">
                <input
                  type="file"
                  className="hidden"
                  id="media"
                  multiple
                  onChange={mediaChangeHandler}
                />
                <BsPlusCircle className="z-10 text-orange-500 text-[38px] w-20 aspect-square object-cover object-center" />
              </label>
            </li>
            {getStories.map((el: { media?: any[]; id: string } | undefined) => {
              return (
                <Story
                  key={el?.id}
                  userImage={`${userDetails?.image && process.env.NEXT_PUBLIC_BASE_URL + '' + userDetails?.image || ''}`}
                  img={`${userDetails?.image && process.env.NEXT_PUBLIC_BASE_URL + '' + userDetails?.image || ''}`}
                  stories={el?.media}
                  id={el?.id || ''}
                  handleDelete={handleDelete}
                />
              );
            })}
          </ul>
        </div>
      </CommonBox>
    </>
  );
};