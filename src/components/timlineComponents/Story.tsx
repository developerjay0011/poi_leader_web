import { FC, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { cusSelector } from "@/redux_store/cusHooks";
import CustomImage from "@/utils/CustomImage";
import { StoryProps } from "@/interfaces/story";
import { BsTrash3Fill } from "react-icons/bs";
import moment from "moment";
import { usePathname } from "next/navigation";
export const Story: FC<StoryProps> = ({
  handleDelete,
  userImage,
  stories,
  self,
  name,
  createddate
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [storiesdata, setStoriesdata] = useState({}) as any
  const deletePostHandler = async () => {
    handleDelete(storiesdata?.postid)
    setIsOpen(false)
  };
  const storyContent = { width: 'auto', maxWidth: '100%', maxHeight: '100%', margin: 'auto', }
  const curRoute = usePathname() != "/user" && self == true





  return (
    <>
      <li onClick={() => { setIsOpen(true); }} className="item-center flex flex-col gap-1">
        <CustomImage
          priority={true}
          src={userImage}
          width={1000}
          height={1000}
          alt="user display pic"
          className="border-4 border-blue w-20 aspect-square rounded-full object-cover object-center shadow"
        />
        <figcaption className='text-[14px] mt-[1px]'>{curRoute ? moment(createddate).format("DD-MM-YYYY") : name} </figcaption>
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
