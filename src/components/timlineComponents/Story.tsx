import { FC, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { cusSelector } from "@/redux_store/cusHooks";
import CustomImage from "@/utils/CustomImage";
import { StoryProps } from "@/interfaces/story";
import { TfiClose } from "react-icons/tfi";

export const Story: FC<StoryProps> = ({
  id,
  handleDelete,
  userImage,
  stories,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userDetails } = cusSelector((state) => state.auth);
  const leaderid = userDetails?.leaderId;

  const deletePostHandler = async () => {
    handleDelete(leaderid, id);
  };

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
          // onAfterOpen={afterOpenModal}
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
              }))}
              defaultInterval={1500}
              width={432}
              height={768}
              onAllStoriesEnd={() => setIsOpen(false)}
            />
          </div>
          {/* <TfiClose
            className="z-10 text-orange-500 text-[38px] w-20 aspect-square object-cover object-center"
            onClick={deletePostHandler} /> */}
        </Modal>
      )}
    </>
  );
};
