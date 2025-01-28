import { CusLink } from '@/utils/CusLink'
import { motion as m } from 'framer-motion'
import { FC, ReactNode, useEffect, useMemo } from 'react'
import POILogo from '@/assets/poi_logo_1.png'
import CustomImage from '@/utils/CustomImage'
import { cusSelector } from '@/redux_store/cusHooks'
import { tabfilter } from '@/redux_store/accesstab/tabApi'
import { LEFT_NAV_ROUTES } from '@/utils/routes'
interface MobileLeftNavbarProps {
  onClose: () => void
  showMobileNav: boolean
}
const TopNavLink: FC<{
  children: ReactNode;
  link: string;
  target?: boolean;
}> = ({ children, link, target }) => {
  return (
    <li>
      <CusLink
        activeLinkClasses='text-orange-500'
        normalClasses='text-sky-950'
        href={link}
        target={target}
        className='flex items-center gap-2 py-2 pl-5 uppercase font-medium'
      >
        {children}
      </CusLink>
    </li>
  );
};

export const MobileLeftNavbar: FC<MobileLeftNavbarProps> = ({ onClose, showMobileNav }) => {
  const { accesstabs, usertype, loader } = cusSelector((state) => state.access);
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 1000 && showMobileNav) { onClose(); } };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showMobileNav]);

  const navs = useMemo(() => {
    return tabfilter(accesstabs, usertype, LEFT_NAV_ROUTES)
  }, [accesstabs, usertype, LEFT_NAV_ROUTES])

  return (
    <>
      <m.div layout initial={{ opacity: 0 }} className='z-[100]' animate={showMobileNav ? { opacity: 1 } : { opacity: 0 }} exit={{ opacity: 0 }} transition={{ ease: 'easeInOut' }} onClick={onClose}>
        {showMobileNav &&
          <m.div className='fixed top-0 left-0 h-[100dvh] z-[100] w-[100dvw]'>
            <m.div
              initial={{ opacity: 0 }}
              animate={showMobileNav ? { opacity: 1 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut' }}
              className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-[2px]'
              onClick={onClose}
            />
            <m.ul
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ ease: 'easeOut' }}
              onClick={onClose}
              className='w-1/2 bg-white flex flex-col gap-2 relative h-full z-[102] items-start max-[500px]:w-[75%] max-w-[300px] '>
              <div
                className='w-full text-center bg-sky-950 flex justify-center py-3'>
                <CustomImage src={POILogo} alt='poi logo' className='h-12 w-auto' />
              </div>

              <div className='w-full flex flex-col gap-2 relative h-full items-start  main_scrollbar overflow-y-auto'>
                {navs?.map((El: any) => (
                  <TopNavLink key={El.id} link={usertype === "leader" ? El.link : El.link2}>
                    {<El.Icon className='text-xl' />}{El.name}
                  </TopNavLink>
                ))}
              </div>
            </m.ul>
          </m.div>
        }
      </m.div>
    </>
  )
}
