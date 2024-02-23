import { FC, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { cusSelector } from "@/redux_store/cusHooks";
import CustomImage from "@/utils/CustomImage";
import { StoryProps } from "@/interfaces/story";

export const Story: FC<StoryProps> = ({
  img,
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
                url: `${process.env.NEXT_PUBLIC_BASE_URL}${item.media[0].media}`,
                type: item.media[0].type == "video/mp4" ? "video" : "image",
              }))}
              defaultInterval={1500}
              width={432}
              height={768}
            />
          </div>
          <i className="ti-close" onClick={deletePostHandler}></i>
        </Modal>
      )}
    </>
  );
};
