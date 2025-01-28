"use client";
import { FC, useEffect, useState } from "react";
import POILogo from "@/assets/poi_logo_1.png";
import { StaticImageData } from "next/image";
import { FaSearch, FaBell, FaHamburger, FaUserTimes } from "react-icons/fa";
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
import { getImageUrl, setusername } from "@/config/get-image-url";
import { followLeader, getFollowering, unFollowLeader } from "@/redux_store/leader/leaderAPI";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { getCookies } from "cookies-next";
import { tryCatch } from "@/config/try-catch";
import { FaPowerOff } from 'react-icons/fa6'
import { getLeaderAddedStories } from "@/redux_store/posts/postAPI";
import { postActions } from "@/redux_store/posts/postSlice";
import { Nave } from "../posts/utils";
import { LogoutUser } from "@/redux_store/auth/authAPI";


export const TopNavbar: FC<{ user_type: any }> = ({ user_type }) => {
  const router = useRouter();
  const curRoute = usePathname();
  const dispatch = cusDispatch();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { userDetails } = cusSelector((state: RootState) => state.auth);
  const { leaderProfile, leaderlist, following } = cusSelector((state: RootState) => state.leader);
  const [searchUserStr, setSearchUserStr] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { notification } = cusSelector((state) => state.leader);
  const notification_isread = notification?.filter((e) => e?.isread == false)

  const allcookies: any = getCookies()
  const heading = curRoute?.split("/").at(-1)?.includes("-") ? curRoute?.split("/").at(-1)?.replaceAll("-", " ") : curRoute?.split("/").at(-1);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = leaderlist?.filter(
        function (item) {
          const itemData = item?.["name"] ? item?.["name"].toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      )
      return newData
    } else {
      return leaderlist
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

      if (!(e.target as HTMLElement).closest("#searchBox") && searchUserStr != "")
        setSearchUserStr('');
    });
  }, [])

  useEffect(() => {
    if (user_type == "leader") {
      (async () => {
        if (allcookies?.USER_VERIFY == "true" && allcookies?.TOKEN_KEY && userDetails?.leaderId) {
          var mypostdata = { image: leaderProfile?.image, name: setusername(leaderProfile), leaderid: userDetails?.leaderId }
          const LeaderAddedStories = await getLeaderAddedStories(userDetails?.leaderId, mypostdata) as any
          dispatch(postActions.storeMyStories(LeaderAddedStories))
        }
      })();
    }
  }, [dispatch, leaderProfile?.image])

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
        {user_type == "leader" ?
          <>
            {/* Search Bar */}

            <label htmlFor="searchBox" className="relative w-[20%]" >
              <input
                onChange={(e) => setSearchUserStr(e.target.value.toLowerCase())}
                type="search"
                className="rounded-full bg-sky-50 bg-opacity-20 py-3 px-5 text-md text-sky-50 outline-none w-full capitalize placeholder:text-sky-50 placeholder:text-opacity-70"
                placeholder="search politicians"
                id="searchBox"
                value={searchUserStr}
              />
              {searchUserStr.length == 0 && (
                <FaSearch className="absolute top-1/2 right-5 translate-y-[-50%] text-opacity-70 text-sky-50 text-xl" />
              )}              {/* Search box */}
              {searchUserStr.length > 0 && (
                // <ul className="absolute overflow-hidden bg-red w-full">
                <ul className="absolute rounded-md shadow-md border bg-white overflow-x-hidden overflow-y-auto main_scrollbar max-h-[80vh] top-[110%] left-0 w-full z-[100]">
                  {searchFilterFunction(searchUserStr)?.map((item: any) =>
                    <BriefUserInfo
                      key={item?.id}
                      designation={item?.username?.political_party}
                      userPic={getImageUrl(item?.image)}
                      name={item?.name}
                      id={item?.id}
                      setSearchUserStr={() => setSearchUserStr("")}
                      isFollowing={following?.find((i: any) => i.leaderid == item.id) ? true : false}
                    />
                  )}
                  {searchFilterFunction(searchUserStr)?.length == 0 &&
                    <p style={{ display: searchFilterFunction(searchUserStr)?.length == 0 ? "flex" : "none" }} className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
                      no politician found❗
                    </p>
                  }
                </ul>
                // </ul>
              )}
            </label>

            <h3 className="capitalize">{heading === "user" || heading === "employee access" ? "home" : heading}</h3>

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

                <span style={{ display: notification_isread?.length > 0 ? "flex" : "none" }} className="absolute -top-3 -right-2 p-[2px] bg-orange-500 text-orange-50 text-[11px] aspect-square flex items-center justify-center rounded-full">
                  {notification_isread?.length}
                </span>

                {showNotifications && (
                  <div onClick={(e) => e.stopPropagation()} className="absolute top-[210%] left-1/2 translate-x-[-50%] z-50">
                    <BriefNotifications
                      onClick={() => setShowNotifications((lst) => !lst)}
                    />
                  </div>
                )}
              </button>

              <Link href={'/user'} >
                <MdSpaceDashboard className="text-sky-50 text-2xl" />
              </Link>
            </section>

            {/* USER Profile */}
            <section className="flex items-center gap-4 ml-auto relative">
              {setusername(leaderProfile) && <p className="capitalize">{setusername(leaderProfile)}</p>}
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
            <h3 className="capitalize ml-2">{heading === "user" || heading === "employee access" ? "home" : heading}</h3>
            <div className="h-10 w-[2px] bg-sky-50 bg-opacity-40" />
            <section className="flex items-center gap-8">
              <button type="button" onClick={() => router.push(`/user/employeehome`)}>
                <BsHouseFill className="text-sky-50 text-2xl" />
              </button>
              <button
                type="button"
                className="relative"
                onClick={() => setShowNotifications((lst) => !lst)}
                id="briefNotiBox"
              >
                <FaBell className="text-sky-50 text-2xl" />
                <span style={{ display: notification_isread?.length > 0 ? "flex" : "none" }} className="absolute -top-3 -right-2 p-[2px] bg-orange-500 text-orange-50 text-[11px] aspect-square flex items-center justify-center rounded-full">
                  {notification_isread?.length}
                </span>


                {showNotifications && (
                  <div onClick={(e) => e.stopPropagation()} className="absolute top-[210%] left-1/2 translate-x-[-50%] z-50">
                    <BriefNotifications
                      onClick={() => setShowNotifications((lst) => !lst)}
                    />
                  </div>
                )}
              </button>
            </section>

            <section className="flex items-center gap-4 ml-auto relative">
              <button className="flex items-center gap-2" onClick={async () => { LogoutUser(dispatch, true) }}>
                <FaPowerOff />log out
              </button>
            </section>
          </>
        }
      </nav>
      <nav className="py-3 px-8 bg-sky-950 text-sky-50 flex-col gap-5 hidden max-[1000px]:flex  max-[500px]:px-4">
        {user_type == "leader" ?
          <>
            <div className="flex justify-between items-center w-full">
              <FaHamburger
                className="text-2xl cursor-pointer"
                onClick={() => setShowMobileNav(true)}
              />

              <CustomImage
                src={POILogo}
                alt="poi logo"
                className="h-12 w-auto"
                onClick={() => router.push("/user")}
              />

              <section className="flex items-center  relative">
                <button onClick={() => { setShowAdminMenu((lst) => !lst) }} id="userDisplayPic">
                  <CustomImage
                    src={getImageUrl(leaderProfile?.image)}
                    alt="user pic"
                    className="w-14 aspect-square object-cover object-center rounded-full"
                    width={100}
                    height={100}
                  />
                </button>
                {showAdminMenu && (
                  <div className="absolute top-[120%] right-0 w-max z-50">
                    <AdminControls />
                  </div>
                )}
              </section>
            </div>
            <label htmlFor="searchBox" className="relative w-full">
              <input
                onChange={(e) => setSearchUserStr(e.target.value.toLowerCase())}
                type="search"
                className="rounded-full bg-sky-50 bg-opacity-20 py-3 px-5 text-md text-sky-50 outline-none w-full capitalize placeholder:text-sky-50 placeholder:text-opacity-70"
                placeholder="search politicians"
                value={searchUserStr}
                id="searchBox"
              />
              {searchUserStr.length == 0 && (
                <FaSearch className="absolute top-1/2 right-5 translate-y-[-50%] text-opacity-70 text-sky-50 text-xl" />
              )}
              {searchUserStr.length > 0 && (
                <ul className="absolute rounded-md shadow-md border bg-white overflow-x-hidden overflow-y-auto main_scrollbar max-h-[80vh] top-[110%] left-0 w-full z-[100] ">
                  {searchFilterFunction(searchUserStr)?.map((item: any) =>
                    <BriefUserInfo
                      key={item?.id}
                      designation={item?.username?.political_party}
                      userPic={getImageUrl(item?.image)}
                      name={item?.name}
                      setSearchUserStr={() => setSearchUserStr("")}
                      id={item?.id}
                      isFollowing={following?.find((i: any) => i.leaderid == item.id) ? true : false}
                    />
                  )}
                  {searchFilterFunction(searchUserStr)?.length == 0 &&
                    <p style={{ display: searchFilterFunction(searchUserStr)?.length == 0 ? "flex" : "none" }} className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
                      no politician found❗
                    </p>
                  }
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
                className="text-2xl cursor-pointer"
                onClick={() => { setShowMobileNav(!showMobileNav) }}
              />
              <section className="flex items-center gap-4 ml-auto relative">
                <button className="flex items-center gap-2" onClick={async () => { LogoutUser(dispatch, true) }}>
                  <FaPowerOff />log out
                </button>
              </section>
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
  setSearchUserStr: any
}> = ({ designation, name, userPic, id, isFollowing, setSearchUserStr }) => {
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
      <Link href={Nave({ id: id, leader: userDetails?.leaderId })} >
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
          <button onClick={() => { handleClick(id, isFollowing) }} style={{ display: userDetails?.leaderId == id ? "none" : "flex" }} type="button" className="ml-auto">
            {!isFollowing ? <RiUserAddFill className="text-sky-950 text-2xl hover:text-orange-500" /> :
              <FaUserTimes className="text-sky-950 text-2xl hover:text-orange-500" />
            }
          </button>
        </li>
      </Link>
    </>
  );
};
