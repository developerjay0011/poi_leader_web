"use client";
import { dateConverter } from "@/utils/utility";
import { FC } from "react";
import { PollDetails } from "@/utils/typesUtils";
import { cusSelector } from "@/redux_store/cusHooks";
import { PollOption } from "./PollOption";
import { RootState } from "@/redux_store";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import { VoteAdd } from "@/redux_store/posts/postAPI";

interface PollPostProps extends PollDetails {
  Getpost: any,
  allData: any,
  userdetails: any,
  post: any,
  index: string
}

export const PollPost: FC<PollPostProps> = ({ userdetails, post, Getpost }) => {
  const { userDetails } = cusSelector((state: RootState) => state.auth);
  const isUserExist = post?.votes_by?.length > 0 ? post?.votes_by?.some((item: any) => item.userid === userDetails?.id && post?.poll_options?.map((item2: any) => item2?.id)?.includes(item?.optionid)) : false
  const calculatePercentage = (votes: any, totalVotes: any) => {
    const percentage = (votes / totalVotes) * 100;
    return percentage.toFixed(0);
  };
  return (
    <>
      <section className="border shadow-sm rounded-md px-5 py-2 bg-white">
        <div className="flex items-center gap-3 py-4 text-sky-950 border-b">
          <CustomImage
            src={getImageUrl(userDetails?.image)}
            alt="user pic"
            className="w-12 aspect-square object-cover object-center rounded-full"
            width={100}
            height={100}
          />

          {/* Info and date of publish */}
          <div>
            <h4 className="font-[600] text-lg text-orange-500">{userdetails?.name}</h4>
            <p className="flex items-center capitalize gap-2 text-sm font-[500]">
              <span>created a poll at {dateConverter(post?.createddate)}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 my-5">
          <p className="text-[16px]">{post?.title}</p>
          <section className="w-full flex flex-col gap-3">
            {post?.poll_options.map((el: any, i: any) => (
              <PollOption
                id={el.id}
                isUserExist={isUserExist}
                key={i}
                index={i + 1}
                pollText={el.text}
                polltype={post?.polltype}
                pollImg={post?.polltype !== "text" ? el.image : ""}
                alldata={el}
                isselected={post?.votes_by?.filter((item2: any) => item2?.userid == userDetails?.id && el?.id == item2?.optionid)?.length > 0}
                Onvote={async () => {
                  const vote = await VoteAdd({
                    "pollid": post?.id,
                    "leaderid": post?.leaderid,
                    "userid": userDetails?.id,
                    "usertype": "leader",
                    "optionid": el?.id
                  })
                  if (vote?.success) {
                    Getpost()
                  }
                }}
                isshow={post?.view_access == "public" && isUserExist}
                calculatePercentage={() => post?.view_access == "public" && isUserExist ? calculatePercentage(el?.votes, post?.poll_options?.reduce((acc: any, cur: any) => acc + cur.votes, 0)) : null}
              />
            ))}
          </section>
          <p className="font-medium text-zinc-600" style={{ textAlign: "right" }}>{post?.votes_by?.length} votes</p>
        </div>
      </section>
    </>
  );
};
