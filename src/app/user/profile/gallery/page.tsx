"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { BriefPost } from "@/components/posts/BriefPost";
import { GenerateId, convertFileToBase64 } from "@/utils/utility";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { BsImageFill } from "react-icons/bs";
import { NewPostFields, PostType } from "@/utils/typesUtils";
import { BiX } from "react-icons/bi";
import CustomImage from "@/utils/CustomImage";
import { getGalleryData, saveGallery } from "@/redux_store/gallery/galleryAPI";
import { tryCatch } from "@/config/try-catch";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { galleryActions } from "@/redux_store/gallery/gallerySlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { ProfileShortcutsBox } from "@/components/timlineComponents/ProfileShortcutsBox";
import { Datanotfound } from "@/utils/Datanotfound";
import { PeoplesComponentWrapper } from "@/utils/PeoplesComponentWrapper";
import PostGrid from "../../../../components/PostGrid";
import { getImageUrl } from "@/config/get-image-url";

const AdminProfileGalleryPage = () => {
  const [searchStr, setSearchStr] = useState("");
  const [updateGallery, setUpdateGallery] = useState({});
  const [isGallery, setIsGallery] = useState(false);
  const [apimedia, setApiMedia] = useState<NewPostFields[]>([]);
  const [media, setMedia] = useState<NewPostFields[]>([]);
  const dispatch = cusDispatch();
  const [type, setType] = useState("");
  const { userDetails } = cusSelector((st) => st.auth);
  const { gallery } = cusSelector((state) => state.gallery);
  const mypostData: any = cusSelector((state) => state.posts.posts);
  const mediaArray = Array.isArray(mypostData) ? mypostData.flatMap((post: any) => post.media || []) : [];
  const filterDataOnPriority = mediaArray?.filter((el: any) => type ? el?.type?.includes(type) : el);
  // useEffect(() => {
  //   (async () => {
  //     tryCatch(
  //       async () => {
  //         const data = await getGalleryData(userDetails?.leaderId as string);
  //         dispatch(galleryActions.storeGallery(data))
  //       })
  //   })();
  // }, [userDetails?.leaderId, dispatch, updateGallery]);

  // const deletedata = (data: any) => {
  //   setUpdateGallery(data);
  // };

  // const onCancel = () => {
  //   setIsGallery(false);
  // };

  // const mediaChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const data = e.target.files as FileList;

  //   if (!data) return;

  //   for (let i = 0; i < data.length; i++) {
  //     const uploadData = data[i];

  //     // checking for media type
  //     if (
  //       !(
  //         uploadData.type.includes("image") || uploadData.type.includes("video")
  //       )
  //     )
  //       return;

  //     // converting data into base 64
  //     const convertedData = await convertFileToBase64(uploadData);

  //     setApiMedia((lst) => {
  //       const oldData = [...lst];

  //       oldData.push({
  //         type: uploadData.type.split("/")[0] as PostType,
  //         media: uploadData as any,
  //         id: GenerateId(),
  //       });

  //       return oldData;
  //     });
  //     setMedia((lst) => {
  //       const oldData = [...lst];
  //       oldData.push({
  //         type: uploadData.type.split("/")[0] as PostType,
  //         media: convertedData as string,
  //         id: GenerateId(),
  //       });

  //       return oldData;
  //     });
  //   }
  // };

  // const removeImageHandler = (id: string) => {
  //   setMedia((lst) => {
  //     const newData = [...lst];

  //     newData.splice(
  //       newData.findIndex((dt) => dt.id === id),
  //       1
  //     );

  //     return newData;
  //   });
  // };

  // const handleSave = async () => {
  //   tryCatch(
  //     async () => {
  //       const formData = new FormData();
  //       formData.append("leaderid", userDetails?.leaderId || "");
  //       for (let i = 0; i < apimedia.length; i++) {
  //         const item: any = apimedia[i];
  //         formData.append("media", item?.media);
  //       }

  //       const response = await saveGallery(formData);
  //       if (response?.success) {
  //         onCancel();
  //         setApiMedia([])
  //         setMedia([])
  //         setUpdateGallery(response);
  //         dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
  //       } else {
  //         dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
  //       }
  //     })
  // };




  return (
    <>
      <div className="flex gap-5 w-full relative">
        <ProfileShortcutsBox />

        <section className="flex-1">
          <PeoplesComponentWrapper
            heading='Gallery'
            searchStr={''}
            setSearchStr={''}
            rightButton={""
              // <div className="flex items-center justify-end">
              //   <button
              //     className={`flex items-center gap-2 self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
              //     onClick={() => setIsGallery(true)}
              //   >
              //     Add Media
              //   </button>
              // </div>
            }
          >
            <div className="py-7 pt-3 flex items-center justify-between">
              <label htmlFor="filter" className="flex items-center gap-2">
                <span>Media</span>
                <select
                  id="filter"
                  className="py-1 px-3 text-md border border-gray-300 outline-none text-gray-900 bg-white rounded-md cursor-pointer capitalize"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="">All</option>
                  <option value="video">video</option>
                  <option value="image">image</option>
                </select>
              </label>
            </div>

            {filterDataOnPriority && filterDataOnPriority?.length > 0 ?
              <section className="pb-8">
                <ul className="grid grid-cols-5 gap-3 max-[1300px]:grid-cols-4 max-[750px]:grid-cols-3 max-[750px]:gap-1 max-[550px]:grid-cols-2 max-[450px]:grid-cols-1">
                  {filterDataOnPriority?.map((userMedia, index) => {
                    return (
                      <BriefPost
                        key={index}
                        index={index}
                        userMedia={userMedia}
                        images={mediaArray?.filter((el: any) => el?.type?.includes('image'))?.map((item: any) => getImageUrl(item.media))}
                      // deletedata={deletedata}
                      />
                    )
                  })}
                </ul>
              </section>
              :
              <Datanotfound name={"Gallery data"} />
            }
          </PeoplesComponentWrapper>
        </section>
        {/* <AnimatePresence mode="wait">
          {isGallery && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
                }`}
            >
              <div
                className="bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20"
                onClick={onCancel}
              />
              <m.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center gap-5"
              >
                <h2 className="mt-4 mb-8 text-xl">Add media</h2>
                <div className="flex items-center gap-3">
                  <label htmlFor="liveMedia">
                    Select File
                  </label>

                  <label htmlFor="medias">
                    <input
                      type="file"
                      className="hidden"
                      id="medias"
                      multiple
                      onChange={mediaChangeHandler}
                    />
                    <BsImageFill className="text-sky-950 text-3xl text-opacity-70" />
                  </label>
                </div>

                <div className=" w-full ">
                  <div className="preview">
                    <p>preview</p>
                    <span className="line" />
                  </div>
                  {media.length > 0 && (
                    <div className="w-64 ">
                      <div className="flex items-center gap-2 flex-wrap">
                        {media.map((el) => (
                          <div
                            className="w-20 aspect-square relative"
                            key={el.id}
                          >
                            {el.type === "image" && (
                              <CustomImage
                                src={el.media}
                                width={1000}
                                height={1000}
                                alt="media post"
                                className="w-full h-full aspect-square object-cover object-center"
                              />
                            )}
                            {el.type === "video" && (
                              <video
                                src={el.media}
                                className="w-full h-full aspect-square object-cover object-center"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => removeImageHandler(el.id)}
                              className="bg-black bg-opacity-50 text-white text-lg rounded-full absolute top-1 right-1"
                            >
                              <BiX />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center gap-5">
                  <button
                    className={`text-sm mt-5 transition-all px-5 py-1 rounded-full capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                    onClick={() => onCancel()}
                  >
                    Cancel
                  </button>
                  <button
                    className={`text-sm mt-5 transition-all px-5 py-1 rounded-full capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence> */}
      </div>
    </>
  );
};

export default AdminProfileGalleryPage;
