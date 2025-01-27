import { FC, ReactNode, useMemo, useState } from "react";
import { cusSelector } from "@/redux_store/cusHooks";
import { tabfilter } from "@/redux_store/accesstab/tabApi";
import { LEFT_NAV_ROUTES } from "@/utils/routes";
import { CusLink } from "@/utils/CusLink";

const LeftNavLink: FC<{ children: ReactNode; link: string; info: string; target?: boolean, setIsTooltipVisible: any, handleLinkMouseEnter: any }> = ({ handleLinkMouseEnter, children, link, info, target, setIsTooltipVisible }) => {
  return (
    <CusLink
      activeLinkClasses="bg-sky-950 text-sky-50"
      normalClasses="text-sky-950 bg-sky-100"
      href={link}
      target={target}
      className="rounded-full w-12 aspect-square flex items-center justify-center text-2xl relative cus_link"
    >
      <div
        className="h-full w-full flex items-center justify-center"
        onMouseOver={(e) => handleLinkMouseEnter(e, info)} onMouseLeave={() => setIsTooltipVisible(false)}>
        {children}
      </div>
    </CusLink>
  );
};

export const LeftNavbar: FC = () => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleLinkMouseEnter = (event: React.MouseEvent<HTMLAnchorElement>, info: any) => {
    const linkRect = event.currentTarget.getBoundingClientRect();
    const linkWidth = linkRect.width;
    const tooltipLeft = linkRect.left + linkWidth * 1.2;
    setTooltipPosition({ top: linkRect.top + (linkWidth / 2), left: tooltipLeft });
    setIsTooltipVisible(info);
  };

  const leftnav = useMemo(() => {
    return tabfilter(accesstabs, usertype, LEFT_NAV_ROUTES)
  }, [accesstabs, usertype, LEFT_NAV_ROUTES])


  return (
    <>
      <section className={`py-8 px-3 bg-white shadow_left min-h-full max-[1000px]:hidden overflow-y-auto main_scrollbar relative`}>
        <section className="flex flex-col gap-5 min-w-12">
          {leftnav?.map((El: any, index: number) => (
            <LeftNavLink
              key={index}
              info={El.name}
              link={usertype === "leader" ? El.link : El.link2}
              setIsTooltipVisible={setIsTooltipVisible}
              handleLinkMouseEnter={handleLinkMouseEnter}
            >
              <El.Icon />
            </LeftNavLink>
          ))}
        </section>
      </section>
      {(isTooltipVisible != false && tooltipPosition) && (
        <div className="hover_text text-[14px]  pt-[4px] pb-[5px] capitalize w-max inline z-[120]" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          <span className="triangle" />
          {isTooltipVisible}
        </div>
      )}
    </>
  );
};