'use client'
import { ReactNode, FC, useEffect, ChangeEvent } from 'react'
import Link from 'next/link'
import { AdminProfileNavbar } from '@/components/leader/AdminProfileNavbar'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { MdVerified } from 'react-icons/md'
import CustomImage from '@/utils/CustomImage'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { getFollowers, getProfile, uploadProfileImage } from '@/redux_store/leader/leaderAPI'
import { BsPencilSquare } from 'react-icons/bs'
import { ProtectedRoutes } from '@/constants/routes'
import { getImageUrl } from '@/config/get-image-url'
import { authActions } from '@/redux_store/auth/authSlice'

const AdminProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { leaderProfile, followers } = cusSelector((state) => state.leader);
  const dispatch = cusDispatch();

  useEffect(() => {
    (async () => {
      if (leaderProfile?.id) {
        // Get Leader Profiles
        const res = await getProfile(leaderProfile?.id);
       
        dispatch(leaderActions.setLeaderProfile(res));
        
        // Get Followers of Leader
        const followersRes = await getFollowers(leaderProfile?.id);
        dispatch(leaderActions.setFollowers(followersRes));
      }
    })()
  }, [dispatch, leaderProfile?.id]);

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = e.target.files as FileList;
    if(files.length > 0) {
      const formData = new FormData();
      formData.append("leaderid", leaderProfile?.id || "");
      formData.append(fieldName, files[0] || "");
      const profileRes = await uploadProfileImage(formData);
      // Leader data update in redux
      dispatch(leaderActions.setLeaderProfile({
        [fieldName]: profileRes.data
      }));
      // User data update in redux
      dispatch(authActions.setUserData({
        [fieldName]: profileRes.data
      }))
    }
  }

  return (
    <>
      <section className='m-auto my-10 w-[75%] overflow-y-scroll main_scrollbar flex flex-col gap-5 max-[1650px]:w-[90%] max-[1370px]:w-[95%] max-[1000px]:w-[94%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
        <div className='flex flex-col gap-5'>
          <section className='flex flex-col text-sky-950 border-b border-l border-r w-full'>
            {/* USER PIC and BG pic*/}
            <figure className='relative rounded-tr-lg rounded-tl-lg overflow-hidden'>
              <label htmlFor="bgimage" className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="bgimage"
                  multiple
                  onChange={(e) => onChangeHandler(e, 'bgimage')}
                />
                <BsPencilSquare className="absolute top-3 right-3 z-10 text-orange-500 text-[25px] shadow" />
              </label>
              <CustomImage
                src={getImageUrl(leaderProfile?.bgimage) as string}
                alt='bg image'
                width={1000}
                height={1000}
                className='w-full h-[25rem] object-cover object-center max-[750px]:h-[16rem]'
              />

              <CustomImage
                src={getImageUrl(leaderProfile?.image) as string}
                alt='display image'
                width={1000}
                height={1000}
                className='w-[9rem] border-4 aspect-square object-cover object-center rounded-full shadow-lg absolute bottom-5 left-8 max-[750px]:w-[7.5rem] max-[750px]:border-2 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%]'
              />
              <label htmlFor="image" className='hover:opacity-100 hover:text-orange-500 hover:bg-opacity-70 hover:bg-white text-transparent transition-all cursor-pointer absolute aspect-square border-4 bottom-5 flex items-center justify-center left-8 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%] max-[750px]:border-2 max-[750px]:w-[7.5rem] object-center object-cover rounded-full shadow-lg w-[9rem]'>
                <input
                  type="file"
                  className="hidden"
                  id="image"
                  multiple
                  onChange={(e) => onChangeHandler(e, 'image')}
                />
                <BsPencilSquare className="text-[25px] shadow" />
              </label>
            </figure>

            <div className='bg-white py-5 px-14 flex items-center max-[1428px]:px-5 max-[1302px]:flex-wrap max-[950px]:gap-5 max-[450px]:flex-nowrap max-[450px]:flex-col'>
              <Link href={ProtectedRoutes.userProfile}>
                <h5 className='flex flex-col items-center text-xl font-[600] capitalize'>
                  <span className='flex items-center gap-2'>
                    {leaderProfile?.username}
                    <MdVerified className='text-2xl text-orange-500' />
                  </span>
                  <span className='text-[14px] font-normal max[1100px]:text-center'>
                    {leaderProfile.political_info?.designation}
                  </span>
                </h5>
              </Link>

              {/* User Nav */}
              <AdminProfileNavbar />

              {/* Brief Info */}
              <div className='ml-auto flex items-center gap-8 max-[450px]:ml-0 max-[450px]:gap-4'>
                <Link
                  href={'/leader/profile/posts'}
                  className='flex flex-col items-center font-[500] capitalize'>
                  posts
                  <span className='text-orange-500 text-2xl font-normal'>
                    0
                  </span>
                </Link>
                <Link
                  href={'/leader/profile/followers'}
                  className='flex flex-col items-center font-[500] capitalize'>
                  Followers
                  <span className='text-orange-500 text-2xl font-normal'>
                    { followers.length }
                  </span>
                </Link>
                <Link
                  href={'/leader/profile/following'}
                  className='flex flex-col items-center font-[500] capitalize'>
                  following
                  <span className='text-orange-500 text-2xl font-normal '>
                    0
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Data will get rendered acc. to route clicked */}
        <section className='w-full relative'>{children}</section>
      </section>
    </>
  )
}

export default AdminProfileLayout
