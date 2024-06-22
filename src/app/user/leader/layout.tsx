"use client";

import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";

import { ReactNode, FC, useEffect, useState, } from "react";
import { getSingleLeader } from "@/redux_store/auth/authAPI";
import { authActions } from "@/redux_store/auth/authSlice";
import { getImageUrl, setusername } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import { useSearchParams } from 'next/navigation'
import { LeaderProfileNavbar } from "@/components/otherleader/LeaderProfileNavbar";
import LeaderProfilePage from "./about/page";
import { getFollowering, getFollowers } from "@/redux_store/leader/leaderAPI";
import { GetLeaderAddedPosts, getLeaderAddedStories, getStoriesForLeader } from "@/redux_store/posts/postAPI";

const LeaderProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { leaderData } = cusSelector((st) => st.auth);
  const [type, setType] = useState('about')
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [stories, setStories] = useState([])
  const [posts, setPost] = useState([])
  const dispatch = cusDispatch();
  const searchParams = useSearchParams()
  const id = searchParams.get('id') as string
  useEffect(() => {
    (async () => {
      if (id) {
        setType('about')
        const res = await getSingleLeader(id);
        dispatch(authActions.setLeaderData(res));
        const leaderpost = await GetLeaderAddedPosts(id) as any
        setPost(leaderpost)
        const followingRes = await getFollowers(id as string);
        setFollowers(followingRes as [])
        const followering = await getFollowering(id as string)
        setFollowing(followering as [])
        const storiesForLeader = await getLeaderAddedStories(id as string, { userImage: leaderData?.image, image: leaderData?.image, name: setusername(leaderData), leaderid: id }) as any
        setStories(storiesForLeader)
      }
    })();
  }, [dispatch, id]);


  return (
    <section className='m-auto my-10 w-[75%] overflow-y-scroll main_scrollbar flex flex-col gap-8 max-[1650px]:w-[90%] max-[1370px]:w-[95%] max-[1000px]:w-[94%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
      <section className="flex flex-col text-sky-950 border-b border-l border-r w-full">
        {/* USER PIC and BG pic*/}
        <figure className="relative rounded-tr-lg rounded-tl-lg overflow-hidden">
          <CustomImage
            src={getImageUrl(leaderData?.bgimage) as string}
            alt="bg image"
            width={1000}
            height={1000}
            className="w-full h-[25rem] object-cover object-center max-[750px]:h-[16rem]"
          />

          <CustomImage
            src={getImageUrl(leaderData?.image)}
            alt="display image"
            width={1000}
            height={1000}
            className="w-[9rem] border-4 aspect-square object-cover object-center rounded-full shadow-lg absolute bottom-5 left-8 max-[750px]:w-[7.5rem] max-[750px]:border-2 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%]"
          />

        </figure>

        <div className="bg-white py-5 px-6 flex items-center max-[1428px]:px-5 max-[1302px]:flex-wrap max-[950px]:gap-5 max-[450px]:flex-nowrap max-[450px]:flex-col">
          <div>
            <h5 className="flex flex-col items-left text-xl font-[600] capitalize">
              {leaderData?.personal_info?.last_name && leaderData?.personal_info?.first_name ? leaderData?.personal_info?.first_name + " " + leaderData?.personal_info?.last_name : leaderData?.personal_info?.first_name}
            </h5>
            <span className='text-[14px] font-normal'>
              {leaderData?.political_info?.political_party && leaderData?.political_info?.political_party + " ( " + (leaderData?.political_info?.designation || leaderData?.political_info?.post_in_party) + " )"}
            </span>
          </div>

          {/* Leader Nav */}
          <LeaderProfileNavbar type={type} setType={(i: any) => setType(i)} />
          <div className='ml-auto flex items-center gap-8 max-[450px]:ml-0 max-[450px]:gap-4'>
            <div onClick={() => setType("feed")} className={`flex flex-col items-center font-[500] capitalize cursor-pointer ${type == "feed" && " text-orange-500 "}`}>
              posts
              <span className='text-orange-500 text-2xl font-normal'>
                {leaderData?.posts?.length}
              </span>
            </div>
            <div onClick={() => setType("followers")} className={`flex flex-col items-center font-[500] capitalize cursor-pointer ${type == "followers" && " text-orange-500 "}`}>
              Followers
              <span className='text-orange-500 text-2xl font-normal'>
                {followers.length}
              </span>
            </div>
            <div onClick={() => setType("following")} className={`flex flex-col items-center font-[500] capitalize cursor-pointer ${type == "following" && " text-orange-500 "}`}>
              following
              <span className='text-orange-500 text-2xl font-normal '>
                {following.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Data will get rendered acc. to route clicked */}
      <section className="w-full">{<LeaderProfilePage
        type={type}
        leader_id={id}
        following={following}
        followers={followers}
        stories={stories}
        posts={posts}
      />}</section>
    </section>
  );
};

export default LeaderProfileLayout;
