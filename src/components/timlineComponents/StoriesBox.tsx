import { CommonBox } from "@/utils/CommonBox";
import { FC, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Modal from "react-modal";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { Story } from "./Story";
import { deleteStory, getLeaderAddedStories, getStoriesForLeader, } from "@/redux_store/posts/postAPI";
import { NewPostBox } from "../posts/NewPostBox";
import { getImageUrl, setusername } from "@/config/get-image-url";
import { postActions } from "@/redux_store/posts/postSlice";

interface StoriesBoxProps {
  is_my_postandstories?: boolean
  other?: boolean
  user_stories?: any
}
export const StoriesBox: FC<StoriesBoxProps> = ({ is_my_postandstories = false, other = false, user_stories = [] }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { userDetails } = cusSelector((state) => state.auth);
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { stories, mystories } = cusSelector((state) => state.posts);
  const leaderid = userDetails?.leaderId;
  var setstories = other ? user_stories : is_my_postandstories ? mystories : stories
  const dispatch = cusDispatch();
  const fetchMyStories = async () => {
    if (leaderid && is_my_postandstories) {
      var mypostdata = { image: leaderProfile?.image, name: setusername(leaderProfile), leaderid: userDetails?.leaderId }
      const LeaderAddedStories = await getLeaderAddedStories(leaderid, mypostdata) as any
      dispatch(postActions.storeMyStories(LeaderAddedStories))
    }
  }
  const fetchStories = async () => {
    if (leaderid) {
      const data = await getStoriesForLeader(leaderid);
      dispatch(postActions.storeStories(data as any[]));
    }
  };
  const handleDelete = async (id: string) => {
    const postBody = { id: id, leaderid: userDetails?.leaderId, };
    try {
      const data = await deleteStory(postBody);
      if (data?.success) {
        fetchStories();
        fetchMyStories();
      }
    } catch (error) {
    }
  };

  return (
    <>
      <CommonBox title="Stories" cusJSX={other == false ? [<BsPlusCircle key={"add-stories"} className="text-orange-500 text-[25px] aspect-square object-cover object-center cursor-pointer" onClick={() => setOpenPopup(true)} />] : []}>
        <ul className="flex gap-2 py-5  w-full overflow-x-auto ">
          {setstories?.map((el: | { media?: any[]; index?: number, leaderid: string; image: string; name: string; createddate: string, create_ddate: string } | undefined, index2: number) => {
            return (
              <Story
                userImage={getImageUrl(el?.image as string)}
                key={index2}
                stories={el?.media}
                handleDelete={handleDelete}
                self={userDetails?.leaderId == el?.leaderid}
                other={other}
                name={el?.name as string}
                createddate={el?.createddate || el?.create_ddate as string}
              />
            )
          })}
        </ul>
      </CommonBox>
      <Modal
        isOpen={openPopup}
        onRequestClose={() => setOpenPopup(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            background: 'white',
          },
          overlay: {
            background: "rgb(0,0,0,0.5)"
          }
        }}
      >
        <div className="object-center w-[760px]">
          <NewPostBox handleAdd={() => { fetchStories(); fetchMyStories(); }} type="story" handleClose={() => setOpenPopup(false)} />
        </div>
      </Modal>
    </>
  );
};
