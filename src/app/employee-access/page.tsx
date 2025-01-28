"use client";
import { FC, useMemo, memo, Suspense } from "react";
import { cusSelector } from "@/redux_store/cusHooks";
import { LEFT_NAV_ROUTES } from "@/utils/routes";
import { tabfilter } from "@/redux_store/accesstab/tabApi";
import { CusLink } from "@/utils/CusLink";
import dynamic from 'next/dynamic';

const ShortcutBtn: FC<{ Icon: JSX.ElementType, title: string, link: string }> = memo(({ Icon, title, link }) => (
  <CusLink
    normalClasses='text-sky-950'
    className='flex items-center gap-4 hover:text-orange-600 transition-all'
    href={link}
    activeLinkClasses='text-orange-600'>
    <Suspense fallback={<div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />}>
      <Icon />
    </Suspense>
    <span className='capitalize'>{title}</span>
  </CusLink>
));

ShortcutBtn.displayName = 'ShortcutBtn';

const EmployeeHomePage = () => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);

  const navs = useMemo(() => {
    return tabfilter(accesstabs, usertype, LEFT_NAV_ROUTES)
  }, [accesstabs, usertype]);

  return (
    <section className="flex m-auto my-5 w-full relative">
      <div className="flex flex-col w-full py-5 px-5 w-full bg-white shadow-lg border m-5 rounded-[10px]">
        <strong className='capitalize mb-5 text-[20px]'>Tab Access</strong>
        {loader ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        ) : navs?.length > 0 ? (
          <aside className='grid grid-cols-2 w-full md:grid-cols-3 gap-5'>
            {navs?.map((El: any, index: number) => (
              <ShortcutBtn
                key={index}
                Icon={dynamic(() => Promise.resolve(El.Icon), {
                  loading: () => <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />,
                  ssr: false
                })}
                link={usertype === "leader" ? El.link : El.link2}
                title={El.name}
              />
            ))}
          </aside>
        ) : (
          <span className='capitalize mb-5 w-full text-[16px] text-center text-red-500'>
            No Employee Access Found !!
          </span>
        )}
      </div>
    </section>
  );
};

export default memo(EmployeeHomePage);
