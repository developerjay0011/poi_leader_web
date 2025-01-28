"use client";
import { useState } from "react";
import { BriefPost } from "@/components/posts/BriefPost";
import {  cusSelector } from "@/redux_store/cusHooks";
import { ProfileShortcutsBox } from "@/components/timlineComponents/ProfileShortcutsBox";
import { Datanotfound } from "@/utils/Datanotfound";
import { PeoplesComponentWrapper } from "@/utils/PeoplesComponentWrapper";
import { getImageUrl } from "@/config/get-image-url";

const AdminProfileGalleryPage = () => {
  const [type, setType] = useState("");
  const mypostData: any = cusSelector((state) => state.posts.posts);
  const mediaArray = Array.isArray(mypostData) ? mypostData.flatMap((post: any) => post.media || []) : [];
  const filterDataOnPriority = mediaArray?.filter((el: any) => type ? el?.type?.includes(type) : el);

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
