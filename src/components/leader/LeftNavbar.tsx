import { CusLink } from "@/utils/CusLink";
import { FC, ReactNode, useState } from "react";
import { LEFT_NAV_ROUTES } from "@/utils/routes";
import { cusSelector } from "@/redux_store/cusHooks";
import { tabfilter } from "@/redux_store/accesstab/tabApi";


const LeftNavLink: FC<{ children: ReactNode; link: string; info: string; target?: boolean; setIsTooltipVisible: any }> = ({ children, link, info, target, setIsTooltipVisible }) => {
  return (
    <CusLink
      activeLinkClasses="bg-sky-950 text-sky-50"
      normalClasses="text-sky-950 bg-sky-100"
      href={link}
      target={target}
      className="rounded-full w-12 aspect-square flex items-center justify-center text-2xl relative cus_link"
    >
      {children}
      <span className="hover_text z-[120]" onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)}>
        <span className="triangle" />
        {info}
      </span>
    </CusLink>
  );
};

export const LeftNavbar: FC = () => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  return (
    // <section dir="rtl" className={`py-8 px-3 bg-white shadow_left min-h-full max-[1000px]:hidden overflow-y-auto main_scrollbar`}>
    <section dir="rtl" className={`py-8 px-3 bg-white shadow_left min-h-full max-[1000px]:hidden`}>
      <section className="flex flex-col gap-5 ">
        {loader ? LEFT_NAV_ROUTES.map((El: any, index: number) => (
          <LeftNavLink setIsTooltipVisible={setIsTooltipVisible} key={index} info={''} link={''}><></></LeftNavLink>
        )) : [...tabfilter(accesstabs, usertype, LEFT_NAV_ROUTES as any) as []]?.map((El: any, index: number) => (
          <LeftNavLink
            key={index}
            info={El.name}
            setIsTooltipVisible={setIsTooltipVisible}
            link={usertype === "leader" ? El.link : El.link2}
          >
            {<El.Icon />}
          </LeftNavLink>
        ))}
      </section>
    </section>
  );
};
