import { FC, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { cusSelector } from "@/redux_store/cusHooks";
import CustomImage from "@/utils/CustomImage";
import { StoryProps } from "@/interfaces/story";
import { BsThreeDots } from "react-icons/bs";
import { PostOptions } from "../posts/PostOptions";
export const Story: FC<StoryProps> = ({
  id,
  handleDelete,
  userImage,
  stories,
  data,
  is_my
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userDetails } = cusSelector((state) => state.auth);
  const leaderid = userDetails?.leaderId;

  const deletePostHandler = async () => {
    handleDelete(leaderid, id);

  };

  const storyContent = {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',

  }
  const heading = {
    heading: data.name,
    subheading: data.written_text,
    profileImage: userImage
  }

  return (
    <>
      <li>
        {/* User Img */}
        <CustomImage
          src={userImage}
          width={1000}
          height={1000}
          alt="user display pic"
          className=" top-3 left-3 border-4 border-blue z-20 w-20 aspect-square rounded-full object-cover object-center shadow cursor-pointer"
          onClick={() => {
            setIsOpen(true);
          }}
        />
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
          }}
          contentLabel="Example Modal"
        >
          <div className="object-center">
            <Stories
              stories={stories?.map((item) => ({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}${item.media}`,
                type: item.type && (item.type.includes("image") ? "image" : "video") || '',
                header: heading as any
              }))}
              // header={(item: any) => {
              //   const [showMorePostOptions, setShowMorePostOptions] = useState(false);
              //   return (
              //     <>
              //       <div className="ml-auto relative" id="moreOptions" style={{ display: is_my ? "flex" : "none" }}>
              //         <button onClick={() => { setShowMorePostOptions(!showMorePostOptions) }}>
              //           <BsThreeDots className="text-2xl" />
              //         </button>
              //         {showMorePostOptions && (
              //           <PostOptions
              //             deletePostHandler={() => deletePostHandler()}
              //             userId={''}
              //             onClose={() => { }}
              //           />
              //         )}
              //       </div>
              //     </>)
              // }}
              storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
              defaultInterval={1500}
              width={432}
              height={768}
              storyStyles={storyContent}
              onAllStoriesEnd={() => setIsOpen(false)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
