import { FC, useEffect, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import CustomImage from "@/utils/CustomImage";
import { StoryProps } from "@/interfaces/story";
import { BsThreeDots, BsTrash3Fill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
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
  const [showMorePostOptions, setShowMorePostOptions] = useState(false) as any
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
              padding: 10
            },
            overlay: {
              background: "rgb(0,0,0,0.5)"
            }
          }}

          contentLabel="Example Modal"
        >
          <div className="object-center relative flex h-max w-max">
            <Stories
              stories={stories as any}
              storyContainerStyles={{ borderRadius: 8, overflow: "hidden", zIndex: 500 }}
              defaultInterval={1500}
              width={432}
              height={768}
              storyStyles={storyContent}
              onAllStoriesEnd={(s: any, st: any) => { setIsOpen(false) }}
              onStoryStart={(s: any, st: any) => { setStoriesdata(st) }}
              keyboardNavigation={true}
            />
            <div style={{ position: "absolute", zIndex: 10000, display: self ? "flex" : "none", right: 10, top: 25, }} >
              <button
                style={{ color: "white", position: "absolute", zIndex: 10000, right: 0, top: 0, }}
                onClick={(e) => { e.stopPropagation(); setShowMorePostOptions(!showMorePostOptions) }}>
                <BiDotsVerticalRounded className="text-2xl" />
              </button>
              {showMorePostOptions && (
                <div onClick={(e) => { e.stopPropagation(); setShowMorePostOptions(!showMorePostOptions) }} style={{ position: "absolute", zIndex: 10000, width: "100%", height: "100%", color: "white" }} >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePostHandler()
                    }}
                    style={{ position: "absolute", zIndex: 10000, right: 10, top: 25, }}
                    className="flex items-center gap-2 capitalize py-1 mb-2 rounded-md px-1 hover:bg-orange-500 hover:text-orange-50 transition-all"
                  >
                    <BsTrash3Fill size={15} /> delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal >
      )}
    </>
  );
};
