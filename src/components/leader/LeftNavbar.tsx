import { CusLink } from "@/utils/CusLink";
import { FC, ReactNode } from "react";
import { LEFT_NAV_ROUTES } from "@/utils/routes";
import { cusSelector } from "@/redux_store/cusHooks";

const LeftNavLink: FC<{
  children: ReactNode;
  link: string;
  info: string;
  target?: boolean;
}> = ({ children, link, info, target }) => {
  return (
    <CusLink
      activeLinkClasses="bg-sky-950 text-sky-50"
      normalClasses="text-sky-950 bg-sky-100"
      href={link}
      target={target}
      className="rounded-full w-12 aspect-square flex items-center justify-center text-2xl relative cus_link"
    >
      {children}
      <span className="hover_text z-[120]">
        <span className="triangle" />
        {info}
      </span>
    </CusLink>
  );
};

export const LeftNavbar: FC = () => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  var tabfilter = (accesstabs: [], usertype: string) => {
    var tabs = [...LEFT_NAV_ROUTES]
    tabs = tabs.filter((item: any) => ((usertype === "leader" && item?.tabname == "Leader") || accesstabs.some((element2: any) => element2?.tabname === item?.tabname)))
    return accesstabs?.length > 0 || usertype === "leader" ? tabs : []
  }



  return (
    <section className="py-8 px-3 bg-white flex flex-col shadow_left gap-5 h-full max-[1000px]:hidden">
      {loader ? LEFT_NAV_ROUTES.map((El: any) => (
        <LeftNavLink key={El.id} info={''} link={''}><></></LeftNavLink>
      )) : [...tabfilter(accesstabs, usertype) as []]?.map((El: any) => (
        <LeftNavLink
          key={El.id}
          info={El.name}
          link={El.link}
        >
          {<El.Icon />}
        </LeftNavLink>
      ))}
    </section>
  );
};
