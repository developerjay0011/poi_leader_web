"use client";

import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";

import { ReactNode, FC, useEffect, } from "react";
import { getSingleLeader } from "@/redux_store/auth/authAPI";
import { authActions } from "@/redux_store/auth/authSlice";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import { useSearchParams } from 'next/navigation'

const LeaderProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { leaderData } = cusSelector((st) => st.auth);
  const dispatch = cusDispatch();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  useEffect(() => {
    (async () => {
      if (id) {
        const res = await getSingleLeader(id);
        dispatch(authActions.setLeaderData(res));
      }
    })();
  }, [dispatch, id]);



  return (
    <section className='m-auto my-10 w-[80%] overflow-y-scroll main_scrollbar flex flex-col gap-8 max-[1850px]:w-[85%] max-[1650px]:w-[90%] max-[1570px]:w-[95%] max-[1470px]:w-[97%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
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

        <div className="bg-white py-5 px-14 flex items-center max-[1428px]:px-5 max-[1302px]:flex-wrap max-[950px]:gap-5 max-[450px]:flex-nowrap max-[450px]:flex-col">
          {/* <Link href={ProtectedRoutes.userProfile}> */}
          <div>
            <h5 className="flex flex-col items-center text-xl font-[600] capitalize">
              {leaderData?.personal_info?.last_name && leaderData?.personal_info?.first_name ? leaderData?.personal_info?.first_name + " " + leaderData?.personal_info?.last_name : leaderData?.personal_info?.first_name}
            </h5>
            <span className='text-[14px] font-normal'>
              {leaderData?.political_info?.political_party && leaderData?.political_info?.political_party + " ( " + (leaderData?.political_info?.designation || leaderData?.political_info?.post_in_party) + " )"}
            </span>
          </div>
          {/* </Link> */}

          {/* Leader Nav */}
          {/* <LeaderProfileNavbar /> */}
        </div>
      </section>

      {/* Data will get rendered acc. to route clicked */}
      <section className="w-full">{children}</section>
    </section>
  );
};

export default LeaderProfileLayout;
