"use client";
import { FC, useEffect, useState } from "react";
import POILogo from "@/assets/poi_logo_1.png";
import MODI from "@/assets/politicians-images/narendar_modi.jpg";
import { StaticImageData } from "next/image";
import { FaSearch, FaBell, FaHamburger } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { AdminControls } from "./AdminControls";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { BriefNotifications } from "./BriefNotifications";
import Link from "next/link";
import { BsExclamationCircleFill, BsHouseFill } from "react-icons/bs";
import { RiUserAddFill } from "react-icons/ri";
import { AnimatePresence, motion as m } from "framer-motion";
import { MobileLeftNavbar } from "./MobileLeftNavbar";
import { MdSpaceDashboard } from "react-icons/md";
import { RootState } from "@/redux_store";
import CustomImage from "@/utils/CustomImage";
import { getImageUrl } from "@/config/get-image-url";

export const TopNavbar: FC = () => {
  const router = useRouter();
  const curRoute = usePathname();
  const dispatch = cusDispatch();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { leaderProfile } = cusSelector((state: RootState) => state.leader);
  const [searchUserStr, setSearchUserStr] = useState("");
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      // hiding usernav bar when clicked anywhere except usericon
      if (!(e.target as HTMLElement).closest("#userDisplayPic"))
        setShowAdminMenu(false);

      // hiding notification box when clicked anywhere except usericon
      if (!(e.target as HTMLElement).closest("#briefNotiBox"))
        setShowNotifications(false);
    });
  }, [dispatch]);

  // Converting pathname to heading
  let heading = curRoute?.split("/").at(-1)?.includes("-")
    ? curRoute?.split("/").at(-1)?.replaceAll("-", " ")
    : curRoute?.split("/").at(-1);

  heading = heading === "user" ? "home" : heading;

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

        {/* Search Bar */}
        <label htmlFor="searchBox" className="relative w-[20%]">
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
              <BriefUserInfo
                designation="prime minister"
                userPic={MODI}
                name="narendar modi"
              />
              <p className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
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
              0
            </span>

            {showNotifications && (
              <div className="absolute top-[210%] left-1/2 translate-x-[-50%] z-50">
                <BriefNotifications />
              </div>
            )}
          </button>

          <Link href={"http://localhost:5000/"} target="_parent">
            <MdSpaceDashboard className="text-sky-50 text-2xl" />
          </Link>
        </section>

        {/* USER Profile */}

        <section className="flex items-center gap-4 ml-auto relative">
          <button
            type="button"
            onClick={() => setShowWarningMsg((lst) => !lst)}
            className={`${showWarningMsg ? "" : "animate-bounce"}`}
          >
            <BsExclamationCircleFill className="text-3xl text-red-500" />
          </button>
          <AnimatePresence>
            {showWarningMsg && (
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center bg-white w-max gap-3 text-sky-950 absolute top-full left-0 translate-x-[-50%] py-3 font-medium px-6 rounded-md border shadow-md z-[100]"
              >
                Your Profile is Incomplete
                <Link
                  onClick={() => setShowWarningMsg(false)}
                  href={"/admin/profile/settings/edit-profile"}
                  className="hover:underline hover:font-medium"
                >
                  Click Here
                </Link>
              </m.p>
            )}
          </AnimatePresence>

          <p className="capitalize">{""}</p>
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
      </nav>

      <nav className="py-3 px-8 bg-sky-950 text-sky-50 flex-col gap-5 hidden max-[1000px]:flex  max-[500px]:px-4">
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
              src={getImageUrl(leaderProfile?.image) as string}
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

          {/* Search box */}
          {searchUserStr.length > 0 && (
            <ul className="absolute rounded-md shadow-md border bg-white overflow-hidden top-[110%] left-0 w-full z-[100]">
              <p className="text-xl capitalize text-center text-sky-950 font-semibold py-3">
                no politician found❗
              </p>
            </ul>
          )}
        </label>
      </nav>

      {showMobileNav && (
        <AnimatePresence mode="wait">
          <MobileLeftNavbar onClose={() => setShowMobileNav(false)} />
        </AnimatePresence>
      )}
    </>
  );
};

const BriefUserInfo: FC<{
  name: string;
  userPic: string | StaticImageData;
  designation: string;
}> = ({ designation, name, userPic }) => {
  return (
    <>
      <Link href={"#"}>
        <li className="flex items-center p-4 last_noti gap-2 hover:bg-gray-100">
          <CustomImage
            src={userPic}
            alt="user dp"
            width={1000}
            height={1000}
            className="w-16 aspect-square rounded-full object-center object-cover"
          />
          <p className="text-lg font-semibold text-sky-950 flex flex-col capitalize">
            {name}
            <span className="font-medium text-[14px]">{designation}</span>
          </p>

          <button type="button" className="ml-auto">
            <RiUserAddFill className="text-sky-950 text-2xl hover:text-orange-500" />
          </button>
        </li>
      </Link>
    </>
  );
};
