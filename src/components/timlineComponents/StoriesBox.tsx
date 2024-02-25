import { CommonBox } from "@/utils/CommonBox";
import { GenerateId } from "@/utils/utility";
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Modal from "react-modal";
import { cusSelector } from "@/redux_store/cusHooks";
import { Story } from "./Story";
import {
  deleteStory,
  getStoriesForLeader,
} from "@/redux_store/posts/postAPI";
import { groupBy } from "@/config/groupby";
import { NewPostBox } from "../posts/NewPostBox";
import { ProtectedRoutes } from "@/constants/routes";

export const StoriesBox: FC = () => {
  const [getStories, setGetStories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const id = GenerateId();
  const { userDetails } = cusSelector((state) => state.auth);

  const fetchStories = async() => {
    const leaderid = userDetails?.leaderId;
    if(leaderid) {
      const data = await getStoriesForLeader(leaderid);
      if (data?.length > 0) {
        let mergeAllPosts: any = [];
        let allLeaderProfile: any = {};
        let allLeaderName: any = {};

        data.forEach((item: any) => {
          mergeAllPosts.push(...item.posts);
          allLeaderProfile[item.leaderid] = item.image;
          allLeaderName[item.leaderid] = item.name;
        });
        const groupByLeaderId = await groupBy(
          mergeAllPosts,
          (item: any) => item.leaderid
        );
  
        let finalStories: Record<string, any> = {};
        Object.keys(groupByLeaderId).forEach((stItem: string) => {
          groupByLeaderId[stItem].map((item: any) => {
            if (!finalStories[item.leaderid]) {
              finalStories[item.leaderid] = {
                id: "",
                image: "",
                leaderid: item.leaderid,
                media: [],
                name: "",
                written_text:""
              };
            }
            finalStories[item.leaderid].id = item.id;
            finalStories[item.leaderid].name = allLeaderName[item.leaderid];
            finalStories[item.leaderid].written_text = item.written_text;
            finalStories[item.leaderid].image =
              allLeaderProfile[item.leaderid];
            finalStories[item.leaderid].media = finalStories[
              item.leaderid
            ].media.concat(item.media);
          });
        });
        mergeAllPosts = Object.values(finalStories);
        setGetStories(mergeAllPosts);
      }
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleDelete = async (leaderid: string, id: string) => {
    const postBody = {
      id: id,
      leaderid: leaderid,
    };

    try {
      const data = await deleteStory(postBody);
      if (data?.success) {
        fetchStories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CommonBox
        title="Stories"
        cusJSX={[
          <Link
            key={id}
            href={ProtectedRoutes.leader}
            className="text-sm font-normal hover:underline text-orange-500"
          >
            see all
          </Link>,
        ]}
      >
        <div className="w-[660px] ">
          <ul className="flex gap-2 py-5  w-full overflow-x-auto ">
            <li className=" w-[80px] h-[100px] aspect-[9/16] rounded-lg relative  ">
              <label className="flex h-[80px] justify-center items-center rounded-full shadow">
                <BsPlusCircle
                  className="z-10 text-orange-500 text-[38px] w-20 aspect-square object-cover object-center"
                  onClick={() => setOpenPopup(true)}
                />
              </label>
            </li>
            {getStories.map(
              (
                el:
                  | {
                      media?: any[];
                      id: string;
                      leaderid: string;
                    image: string;
                    name: string;
                    }
                  | undefined
              ) => {
                return (
                  <Story
                    key={el?.id}
                    userImage={`${
                      (el?.image &&
                        process.env.NEXT_PUBLIC_BASE_URL + "" + el.image) ||
                      ""
                      }`}
                    data={el}
                    stories={el?.media}
                    id={el?.id || ""}
                    handleDelete={handleDelete}
                  />
                );
              }
            )}
          </ul>
        </div>
      </CommonBox>
      <Modal
        isOpen={openPopup}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setOpenPopup(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="object-center w-96">
          <NewPostBox type="story" handleClose={() => setOpenPopup(false)} />
        </div>
      </Modal>
    </>
  );
};
