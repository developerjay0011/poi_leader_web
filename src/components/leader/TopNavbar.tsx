"use client";
import { FC, useEffect, useState } from "react";
import POILogo from "@/assets/poi_logo_1.png";
import { StaticImageData } from "next/image";
import { FaSearch, FaBell, FaHamburger } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { AdminControls } from "./AdminControls";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { BriefNotifications } from "./BriefNotifications";
import Link from "next/link";
import { BsHouseFill } from "react-icons/bs";
import { RiUserAddFill } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import { MobileLeftNavbar } from "./MobileLeftNavbar";
import { MdSpaceDashboard } from "react-icons/md";
import { RootState } from "@/redux_store";
import CustomImage from "@/utils/CustomImage";
import { getImageUrl } from "@/config/get-image-url";
import { followLeader, getFollowering, getFollowers, getNotification, getProfile, getTrendingLeaderList, unFollowLeader } from "@/redux_store/leader/leaderAPI";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { getCookies } from "cookies-next";
import { tryCatch } from "@/config/try-catch";
import { getLetterTemplates } from "@/redux_store/letter/letterApi";
import { letterActions } from "@/redux_store/letter/letterSlice";
import { getLeadersOptions } from "@/redux_store/common/commonAPI";
import { authActions } from "@/redux_store/auth/authSlice";
import { AuthRoutes } from "@/constants/routes";
import { FaPowerOff } from 'react-icons/fa6'
import { GetLeaderAddedPosts, GetPostsForLeader, getLeaderAddedStories, getStoriesForLeader } from "@/redux_store/posts/postAPI";
import { postActions } from "@/redux_store/posts/postSlice";
import { getDirectory } from "@/redux_store/directory/directoryApi";
import { directoryAction } from "@/redux_store/directory/directorySlice";


export const TopNavbar: FC = () => {
  const router = useRouter();
  const curRoute = usePathname();
  const dispatch = cusDispatch();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { userDetails } = cusSelector((state: RootState) => state.auth);
  const { leaderProfile, trendingLeader, following } = cusSelector((state: RootState) => state.leader);
  const [searchUserStr, setSearchUserStr] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { notification } = cusSelector((state) => state.leader);
  const { usertype } = cusSelector((state) => state.access);
  let allcookies: any = getCookies()
  let heading = curRoute?.split("/").at(-1)?.includes("-") ? curRoute?.split("/").at(-1)?.replaceAll("-", " ") : curRoute?.split("/").at(-1);
  heading = heading === "user" || heading === "employeehome" ? "home" : heading;
  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = trendingLeader?.filter(
        function (item) {
          const itemData = item?.["username"] ? item?.["username"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return trendingLeader
    };
  }
  useEffect(() => {
    document.addEventListener("click", (e) => {
      // hiding usernav bar when clicked anywhere except usericon
      if (!(e.target as HTMLElement).closest("#userDisplayPic"))
        setShowAdminMenu(false);

      // hiding notification box when clicked anywhere except usericon
      if (!(e.target as HTMLElement).closest("#briefNotiBox"))
        setShowNotifications(false);
    });
  }, []);
  useEffect(() => {
    if (allcookies?.USER_TYPE == "leader") {
      (async () => {
        if (allcookies?.USER_VERIFY == "true" && allcookies?.TOKEN_KEY) {
          if (userDetails?.leaderId) {
            const leaderRes = await getProfile(userDetails?.leaderId);
            if (leaderRes?.request_status === "Rejected") {
              dispatch(authActions.logout())
              return
            }
            const Data = await getDirectory(userDetails?.leaderId as string);
            dispatch(directoryAction.storedirectory(Data))

            // Leader
            const LeadersDropdown = await getLeadersOptions();
            dispatch(commonActions.setLeaderOptions(LeadersDropdown));
            dispatch(leaderActions.setLeaderProfile(leaderRes));

            // Follower
            const followingRes = await getFollowers(userDetails?.leaderId as string);
            dispatch(leaderActions.setFollowers(followingRes));
            const followering = await getFollowering(userDetails?.leaderId as string)
            dispatch(leaderActions.setFollowing(followering))

            // Stories
            const storiesForLeader = await getStoriesForLeader(userDetails?.leaderId);
            dispatch(postActions.storeStories(storiesForLeader as any[]));

            // Posts
            const postsForLeader = await GetPostsForLeader(userDetails?.leaderId);
            dispatch(postActions.setPost(postsForLeader));
            const leaderpost = await GetLeaderAddedPosts(userDetails?.leaderId);
            dispatch(postActions.listPosts(leaderpost as any));

            // TrendingLeader
            const trendingLeader = await getTrendingLeaderList();
            dispatch(leaderActions.setTrendingLeader(trendingLeader))

            // Notification
            const response = await getNotification(userDetails?.leaderId as string);
            dispatch(leaderActions.setNotification(response));

            // LetterTemplates
            const data = await getLetterTemplates(userDetails?.leaderId as string);
            dispatch(letterActions.storeLetterTemplate(data));
          }
        } else {
          router.push(AuthRoutes.login)
        }
      })();
    }
  }, [dispatch, allcookies?.TOKEN_KEY])
  useEffect(() => {
    if (allcookies?.USER_TYPE == "leader") {
      (async () => {
        if (allcookies?.USER_VERIFY == "true" && allcookies?.TOKEN_KEY && userDetails?.leaderId) {
          var mypostdata = { image: leaderProfile?.image, name: leaderProfile?.username, leaderid: userDetails?.leaderId }
          const LeaderAddedStories = await getLeaderAddedStories(userDetails?.leaderId, mypostdata) as any
          dispatch(postActions.storeMyStories(LeaderAddedStories))
        }
      })();
    }
  }, [dispatch, leaderProfile?.image])
  useEffect(() => {
    if (allcookies?.USER_TYPE != "leader") {
      (async () => {
        if (allcookies?.USER_VERIFY == "true" && allcookies?.TOKEN_KEY) {
          if (userDetails?.leaderId) {
            const leaderRes = await getProfile(userDetails?.leaderId);
            dispatch(leaderActions.setLeaderProfile(leaderRes));
            const LeadersDropdown = await getLeadersOptions();
            dispatch(commonActions.setLeaderOptions(LeadersDropdown));
            const data = await getLetterTemplates(userDetails?.leaderId as string);
            dispatch(letterActions.storeLetterTemplate(data));
          }
        } else {
          router.push(AuthRoutes.login)
        }
      })();
    }
  }, [dispatch, allcookies?.TOKEN_KEY, userDetails?.leaderId])

  return (
    <>
      <nav className="py-3 px-8 bg-sky-950 text-orange-50 flex items-center gap-5 max-[1000px]:hidden">
        {/* LOGO */}
        <CustomImage
          src={POILogo}
          alt="poi logo"
          className="h-12 w-auto"
          onClick={() => router.push("/user")}
        />
        {usertype == "leader" ?
          <>
            {/* Search Bar */}

            <label htmlFor="searchBox" className="relative w-[20%]" >
              <input
                onChange={(e) => setSearchUserStr(e.target.value.toLowerCase())}
                type="search"
                className="rounded-full bg-sky-50 bg-opacity-20 py-3 px-5 text-md text-sky-50 outline-none w-full capitalize placeholder:text-sky-50 placeholder:text-opacity-70"
                placeholder="search politicians"
              />
              <FaSearch className="absolute top-1/2 right-5 translate-y-[-50%] text-opacity-70 text-sky-50 text-xl" />

              {/* Search box */}
              {searchUserStr.length > 0 && (
                <ul className="absolute rounded-md shadow-md border bg-white overflow-hidden top-[110%] left-0 w-full z-[100]">
                  {searchFilterFunction(searchUserStr)?.map((item: any) =>
                    <BriefUserInfo
                      key={item?.id}
                      designation={item?.username?.political_party}
                      userPic={getImageUrl(item?.image)}
                      name={item?.username}
                      id={item?.id}
                      isFollowing={following?.find((i: any) => i.leaderid == item.id) ? true : false}
                    />
                  )}
                  <p style={{ display: searchFilterFunction(searchUserStr)?.length == 0 ? "flex" : "none" }} className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
                    no politician found❗
                  </p>
                </ul>
              )}
            </label>

            <h3 className="capitalize">{heading}</h3>

            <div className="h-10 w-[2px] bg-sky-50 bg-opacity-40" />

            {/* CTA's */}
            <section className="flex items-center gap-8 ml-5">
              <button type="button" onClick={() => router.push(`/user`)}>
                <BsHouseFill className="text-sky-50 text-2xl" />
              </button>

              <button
                type="button"
                className="relative"
                onClick={() => setShowNotifications((lst) => !lst)}
                id="briefNotiBox"
              >
                <FaBell className="text-sky-50 text-2xl" />

                <span className="absolute -top-3 -right-2 bg-orange-500 text-orange-50 w-4 text-[12px] aspect-square flex items-center justify-center rounded-full">
                  {notification?.length}
                </span>

                {showNotifications && (
                  <div className="absolute top-[210%] left-1/2 translate-x-[-50%] z-50">
                    <BriefNotifications />
                  </div>
                )}
              </button>

              <Link href={''} target="_parent">
                <MdSpaceDashboard className="text-sky-50 text-2xl" />
              </Link>
            </section>

            {/* USER Profile */}
            <section className="flex items-center gap-4 ml-auto relative">
              <button
                id="userDisplayPic"
                onClick={() => setShowAdminMenu((lst) => !lst)}
              >
                <CustomImage
                  src={getImageUrl(leaderProfile?.image) as string}
                  alt="user pic"
                  className="w-14 aspect-square object-cover object-center rounded-full"
                  width={100}
                  height={100}
                />
              </button>

              {/* admin nav */}
              {showAdminMenu && (
                <div className="absolute top-[120%] right-0 w-max z-50">
                  <AdminControls />
                </div>
              )}
            </section>
          </>
          :
          <>
            <h3 className="capitalize ml-2">{heading}</h3>
            <div className="h-10 w-[2px] bg-sky-50 bg-opacity-40" />
            <section className="flex items-center gap-8">
              <button type="button" onClick={() => router.push(`/user/employeehome`)}>
                <BsHouseFill className="text-sky-50 text-2xl" />
              </button>
            </section>

            <section className="flex items-center gap-4 ml-auto relative">
              <button className="flex items-center gap-2" onClick={() => { dispatch(authActions.logout()) }}>
                <FaPowerOff />log out
              </button>
            </section>
          </>
        }
      </nav>
      <nav className="py-3 px-8 bg-sky-950 text-sky-50 flex-col gap-5 hidden max-[1000px]:flex  max-[500px]:px-4">
        {usertype == "leader" ?
          <>
            <div className="flex justify-between items-center w-full">
              <FaHamburger
                className="text-3xl"
                onClick={() => setShowMobileNav(true)}
              />

              <CustomImage
                src={POILogo}
                alt="poi logo"
                className="h-12 w-auto"
                onClick={() => router.push("/user")}
              />

              <button id="userMobileDisplayPic">
                <CustomImage
                  src={getImageUrl(leaderProfile?.image)}
                  alt="user pic"
                  className="w-14 aspect-square object-cover object-center rounded-full"
                  width={100}
                  height={100}
                />
              </button>
            </div>
            <label htmlFor="searchBox" className="relative w-full">
              <input
                onChange={(e) => setSearchUserStr(e.target.value.toLowerCase())}
                type="search"
                className="rounded-full bg-sky-50 bg-opacity-20 py-3 px-5 text-md text-sky-50 outline-none w-full capitalize placeholder:text-sky-50 placeholder:text-opacity-70"
                placeholder="search politicians"
              />
              <FaSearch className="absolute top-1/2 right-5 translate-y-[-50%] text-opacity-70 text-sky-50 text-xl" />


              {searchUserStr.length > 0 && (
                <ul className="absolute rounded-md shadow-md border bg-white overflow-hidden top-[110%] left-0 w-full z-[100]">
                  {searchFilterFunction(searchUserStr)?.map((item: any) =>
                    <BriefUserInfo
                      key={item?.id}
                      designation={item?.username?.political_party}
                      userPic={getImageUrl(item?.image)}
                      name={item?.username}
                      id={item?.id}
                      isFollowing={following?.find((i: any) => i.leaderid == item.id) ? true : false}
                    />
                  )}
                  <p style={{ display: searchFilterFunction(searchUserStr)?.length == 0 ? "flex" : "none" }} className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
                    no politician found❗
                  </p>
                </ul>
              )}
            </label>
          </>
          :
          <>
            <div className="flex gap-5 items-center w-full h-12">
              <CustomImage
                src={POILogo}
                alt="poi logo"
                className="h-12 w-auto"
                style={{ display: showMobileNav ? "none" : "flex" }}
              />
              <FaHamburger
                className="text-2xl pointer"
                onClick={() => { setShowMobileNav(!showMobileNav) }}
              />
            </div>
          </>
        }
      </nav>

      {/* {showMobileNav && ( */}
      <AnimatePresence mode="wait"  >
        <MobileLeftNavbar showMobileNav={showMobileNav} onClose={() => setShowMobileNav(false)} />
      </AnimatePresence>
      {/* )} */}
    </>
  );
};

const BriefUserInfo: FC<{
  name: string;
  userPic: string | StaticImageData;
  designation: string;
  id: string;
  isFollowing: boolean
}> = ({ designation, name, userPic, id, isFollowing }) => {
  const { userDetails } = cusSelector((state: RootState) => state.auth);
  const dispatch = cusDispatch();
  const handleClick = async (id: string, isFollowing: boolean) => {
    const postBody = {
      senderid: userDetails?.leaderId,
      receiverid: id,
    };
    tryCatch(
      async () => {
        const response = await (!isFollowing ? followLeader(postBody) : unFollowLeader(postBody));
        if (response?.success) {
          const res = await getFollowering(userDetails?.leaderId as string)
          dispatch(leaderActions.setFollowing(res))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }

      })
  };




  return (
    <>
      <Link href={"#"}>
        <li className="flex items-center p-4 last_noti gap-2 hover:bg-gray-100">
          <CustomImage
            src={userPic}
            alt="user dp"
            width={1000}
            height={1000}
            className="w-12 aspect-square rounded-full object-center object-cover"
          />
          <p className="text-lg font-semibold text-sky-950 flex flex-col capitalize">
            {name}
            <span className="font-medium text-[14px]">{designation}</span>
          </p>
          {!isFollowing &&
            <button onClick={() => { handleClick(id, isFollowing) }} type="button" className="ml-auto">
              <RiUserAddFill className="text-sky-950 text-2xl hover:text-orange-500" />
            </button>
          }
        </li>
      </Link>
    </>
  );
};
