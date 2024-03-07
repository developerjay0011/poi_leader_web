import { FC, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { cusSelector } from "@/redux_store/cusHooks";
import CustomImage from "@/utils/CustomImage";
import { StoryProps } from "@/interfaces/story";
import { PostOptions } from "../posts/PostOptions";
import { BsThreeDots, BsTrash3Fill } from "react-icons/bs";
import moment from "moment";
export const Story: FC<StoryProps> = ({
  handleDelete,
  userImage,
  stories,
  self,
  name,
  createddate
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userDetails } = cusSelector((state) => state.auth);
  const leaderid = userDetails?.leaderId;
  const [storiesdata, setStoriesdata] = useState({}) as any
  const [pause, setPause] = useState(false) as any
  const deletePostHandler = async () => {
    handleDelete(leaderid, storiesdata?.postid)
    setPause(false)
  };
  const storyContent = { width: 'auto', maxWidth: '100%', maxHeight: '100%', margin: 'auto', }







  return (
    <>
      <li onClick={() => { setIsOpen(true); }} className="item-center flex flex-col gap-1">
        <CustomImage
          priority={true}
          src={userImage}
          width={1000}
          height={1000}
          alt="user display pic"
          className="border-4 border-blue z-20 w-20 aspect-square rounded-full object-cover object-center shadow"
        />
        <figcaption className='text-[14px] mt-[1px]'>{self ? moment(createddate).format("DD-MM-YYYY") : name} </figcaption>
      </li>
      {stories && stories.length > 0 && (
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={() => setIsOpen(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
            overlay: {
              background: "rgb(0,0,0,0.5)"
            }
          }}

          contentLabel="Example Modal"
        >
          <button
            onClick={() => { deletePostHandler() }}
            className="flex items-center  self-right gap-2 last_noti capitalize mb-2 transition-all"
            style={{ display: self ? "flex" : "none" }}
          >
            <BsTrash3Fill /> delete
          </button>
          <div className="object-center relative">
            <Stories
              stories={stories as any}
              storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
              defaultInterval={1500}
              // header={(item: any) => {
              //   return (
              //     <div onClick={() => { alert() }} className="flex gap-[10px] item-start bg-red-200">
              //       <div className="flex gap-[10px]">
              //         <div className="h-[60px] w-[60px]">
              //           <CustomImage
              //             src={item?.profileImage}
              //             width={100}
              //             height={100}
              //             alt="user display pic"
              //             className="border-[1px] border-blue aspect-square rounded-full object-cover"
              //           />
              //         </div>
              //         <div className="gap-[10px]">
              //           <figcaption className='text-[14px] mt-[1px]' style={{ color: "white" }}>{item?.heading}</figcaption>
              //           <figcaption className='text-[11px]' style={{ color: "white" }}>{item?.subheading}</figcaption>
              //         </div>
              //       </div>
              //       <div id="moreOptions" onClick={(e) => {
              //         setPause(true); setShowMorePostOptions(!showMorePostOptions)
              //         alert()
              //         console.log(e)
              //       }} className="flex" style={{ display: self ? "flex" : "none" }}>
              //         <button onClick={() => {
              //           setPause(true);
              //           setShowMorePostOptions(!showMorePostOptions)
              //         }} className="flex flex-col self-end" >
              //           <BsThreeDots className="text-2xl" style={{ color: "white" }} />
              //         </button>
              //         {showMorePostOptions && (
              //           <PostOptions
              //             deletePostHandler={() => deletePostHandler()}
              //             userId={''}
              //             onClose={() => { }}
              //           />
              //         )}
              //       </div>
              //     </div>
              //   )
              // }}
              width={432}
              height={768}
              storyStyles={storyContent}
              onAllStoriesEnd={(s: any, st: any) => { setIsOpen(false) }}
              onStoryStart={(s: any, st: any) => { setStoriesdata(st) }}
              keyboardNavigation={true}
            />
          </div>
        </Modal >
      )}
    </>
  );
};
