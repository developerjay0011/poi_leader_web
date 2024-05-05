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
  is_my_postandstories: boolean
}
export const StoriesBox: FC<StoriesBoxProps> = ({ is_my_postandstories = false }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { userDetails } = cusSelector((state) => state.auth);
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { stories, mystories } = cusSelector((state) => state.posts);
  const leaderid = userDetails?.leaderId;
  var setstories = is_my_postandstories ? mystories : stories
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
      console.error(error);;
    }
  };

  return (
    <>
      <CommonBox title="Stories" cusJSX={[
        // <Link key={id} href={ProtectedRoutes.leader} className="text-sm font-normal hover:underline text-orange-500"    >      see all    </Link>
        <BsPlusCircle className="text-orange-500 text-[25px] aspect-square object-cover object-center cursor-pointer" onClick={() => setOpenPopup(true)} />
      ]}>
        <ul className="flex gap-2 py-5  w-full overflow-x-auto ">
          {/* <li className=" w-[80px] h-[100px] aspect-[9/16] rounded-lg relative  ">
              <label className="flex h-[80px] justify-center items-center rounded-full shadow">
                <BsPlusCircle
                  className="z-0 text-orange-500 text-[38px] w-20 aspect-square object-cover object-center"
                  onClick={() => setOpenPopup(true)}
                />
              </label>
            </li> */}
          {setstories?.map((el: | { media?: any[]; index?: number, leaderid: string; image: string; name: string; createddate: string } | undefined, index: null) => {
            return (
              <Story
                userImage={getImageUrl(el?.image as string)}
                key={index}
                stories={el?.media}
                handleDelete={handleDelete}
                self={userDetails?.leaderId == el?.leaderid}
                name={el?.name as string}
                createddate={el?.createddate as string}
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
        <div className="object-center w-[400px]">
          <NewPostBox handleAdd={() => { fetchStories(); fetchMyStories(); }} type="story" handleClose={() => setOpenPopup(false)} />
        </div>
      </Modal>
    </>
  );
};
