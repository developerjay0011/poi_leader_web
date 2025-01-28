'use client'
import { ReactNode, FC, ChangeEvent, memo, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { AdminProfileNavbar } from '@/components/leader/AdminProfileNavbar'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { MdVerified } from 'react-icons/md'
import CustomImage from '@/utils/CustomImage'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { uploadProfileImage } from '@/redux_store/leader/leaderAPI'
import { BsPencilSquare } from 'react-icons/bs'
import { ProtectedRoutes } from '@/constants/routes'
import { getImageUrl, setusername } from '@/config/get-image-url'
import { authActions } from '@/redux_store/auth/authSlice'
import { ErrorBoundary } from 'react-error-boundary'

interface AdminProfileLayoutProps {
  children: ReactNode;
}

// Memoized components
const ProfileImage = memo(({ src, alt, className }: { src: string; alt: string; className: string }) => (
  <CustomImage
    src={src}
    alt={alt}
    width={1000}
    height={1000}
    className={className}
    priority
  />
));
ProfileImage.displayName = 'ProfileImage';

const StatsLink = memo(({ href, label, count }: { href: string; label: string; count: number }) => (
  <Link
    href={href}
    className='flex flex-col items-center font-[500] capitalize hover:text-orange-500 transition-colors'>
    {label}
    <span className='text-orange-500 text-2xl font-normal'>
      {count}
    </span>
  </Link>
));
StatsLink.displayName = 'StatsLink';

const AdminProfileLayout: FC<AdminProfileLayoutProps> = memo(({ children }) => {
  const { leaderProfile, followers, following } = cusSelector((state) => state.leader);
  const { posts } = cusSelector((state) => state.posts);
  const { userDetails } = cusSelector((st) => st.auth);
  const dispatch = cusDispatch();

  const onChangeHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>, fieldName: 'image' | 'bgimage') => {
    try {
      const files = e.target.files;
      if (!files?.length || !userDetails?.leaderId) return;

      const formData = new FormData();
      formData.append("leaderid", userDetails.leaderId);
      formData.append(fieldName, files[0]);

      const profileRes = await uploadProfileImage(formData);

      if (profileRes?.data) {
        dispatch(leaderActions.setLeaderProfile({ [fieldName]: profileRes.data }));
        dispatch(authActions.setUserData({ [fieldName]: profileRes.data }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // You might want to show a toast notification here
    }
  }, [dispatch, userDetails?.leaderId]);

  const bgImageUrl = useMemo(() => getImageUrl(leaderProfile?.bgimage) as string, [leaderProfile?.bgimage]);
  const profileImageUrl = useMemo(() => getImageUrl(leaderProfile?.image) as string, [leaderProfile?.image]);
  const username = useMemo(() => setusername(leaderProfile), [leaderProfile]);

  const renderFileInput = useCallback((id: string, fieldName: 'image' | 'bgimage') => (
    <input
      type="file"
      className="hidden"
      id={id}
      accept="image/*"
      onChange={(e) => onChangeHandler(e, fieldName)}
    />
  ), [onChangeHandler]);

  return (
    <ErrorBoundary FallbackComponent={({ error }) => (<div className="text-red-500 p-4">Error loading profile: {error.message}</div>)} >
      <section className='m-auto my-10 w-[75%] overflow-y-scroll main_scrollbar flex flex-col gap-5 max-[1650px]:w-[90%] max-[1370px]:w-[95%] max-[1000px]:w-[94%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
        <div className='flex flex-col gap-5'>
          <section className='flex flex-col text-sky-950 border-b border-l border-r w-full'>
            {/* USER PIC and BG pic*/}
            <figure className='relative rounded-tr-lg rounded-tl-lg overflow-hidden'>
              <label htmlFor="bgimage" className="cursor-pointer group">
                {renderFileInput("bgimage", "bgimage")}
                <BsPencilSquare className="absolute top-3 right-3 z-10 text-orange-500 text-[25px] shadow group-hover:scale-110 transition-transform" />
              </label>
              <ProfileImage
                src={bgImageUrl}
                alt='bg image'
                className='w-full h-[25rem] object-cover object-center max-[750px]:h-[16rem]'
              />

              <ProfileImage
                src={profileImageUrl}
                alt='display image'
                className='w-[9rem] border-4 aspect-square object-cover object-center rounded-full shadow-lg absolute bottom-5 left-8 max-[750px]:w-[7.5rem] max-[750px]:border-2 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%]'
              />
              <label htmlFor="image" className='hover:opacity-100 hover:text-orange-500 hover:bg-opacity-70 hover:bg-white text-transparent transition-all cursor-pointer absolute aspect-square border-4 bottom-5 flex items-center justify-center left-8 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%] max-[750px]:border-2 max-[750px]:w-[7.5rem] object-center object-cover rounded-full shadow-lg w-[9rem] group'>
                {renderFileInput("image", "image")}
                <BsPencilSquare className="text-[25px] shadow group-hover:scale-110 transition-transform" />
              </label>
            </figure>

            <div className='bg-white py-5 px-7 flex items-center max-[1428px]:px-5 max-[1302px]:flex-wrap max-[950px]:gap-5 max-[450px]:flex-nowrap max-[450px]:flex-col'>
              <Link href={ProtectedRoutes.userProfile} className="hover:text-orange-500 transition-colors">
                <h5 className='flex flex-col text-xl font-[600] capitalize'>
                  <span className='flex gap-2 items-center'>
                    {username}
                    <MdVerified className='text-2xl text-orange-500' />
                  </span>
                </h5>
                <h5 className='text-[14px] font-normal'>
                  {leaderProfile?.political_info?.political_party}
                </h5>
                <h5 className='text-[14px] font-normal'>
                  {leaderProfile?.political_info?.designation || leaderProfile?.political_info?.post_in_party || " "}
                </h5>
                {leaderProfile?.political_info?.parliament_house && (
                  <h5 className='text-[14px] font-normal capitalize'>
                    {leaderProfile.political_info.parliament_house}
                  </h5>
                )}
              </Link>

              <AdminProfileNavbar />

              <div className='ml-auto flex items-center gap-8 max-[450px]:ml-0 max-[450px]:gap-4'>
                <StatsLink href="/user/profile/feed" label="posts" count={posts?.length || 0} />
                <StatsLink href="/user/profile/followers" label="Followers" count={followers?.length || 0} />
                <StatsLink href="/user/profile/following" label="following" count={following?.length || 0} />
              </div>
            </div>
          </section>
        </div>

        <section className='w-full relative'>{children}</section>
      </section>
    </ErrorBoundary>
  );
});

AdminProfileLayout.displayName = 'AdminProfileLayout';

export default AdminProfileLayout;
