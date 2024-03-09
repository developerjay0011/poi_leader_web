import { getImageUrl } from '@/config/get-image-url';
import { tryCatch } from '@/config/try-catch';
import { ToastType } from '@/constants/common';
import { commonActions } from '@/redux_store/common/commonSlice';
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import { getFollowering, unFollowLeader } from '@/redux_store/leader/leaderAPI';
import { leaderActions } from '@/redux_store/leader/leaderSlice';
import CustomImage from '@/utils/CustomImage'
import { FC } from 'react'
import { BsThreeDots } from 'react-icons/bs'

interface FollowerProps {
  displayImg: string;
  name: string;
  count?: number;
  item?: any
}

export const Following: FC<FollowerProps> = ({ displayImg, name, count = 0, item }) => {
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((state) => state.auth);
  const handleFollowers = async () => {
    const postBody = {
      senderid: userDetails?.leaderId,
      receiverid: item?.leaderid,
    };
    tryCatch(
      async () => {
        const response = await unFollowLeader(postBody);
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
    <li className='border rounded-md bg-white p-4 flex gap-2 items-center relative'>
      {/* <button className='absolute top-2 right-3 text-xl'>
        <BsThreeDots />
      </button> */}
      <CustomImage
        src={getImageUrl(displayImg)}
        alt='user display pic'
        width={1000}
        height={1000}
        className='rounded-full w-20 aspect-square object-cover object-center bg-rose-100'
      />

      <div className='flex flex-col flex-grow'>
        <h3 className='flex flex-col font-semibold text-lg capitalize'>
          {name}
          {item?.leaderid &&
            <span className='text-[14px] font-normal'>{item?.designation}</span>
          }
        </h3>

        {item?.leaderid &&
          <p className='text-[14px] flex justify-between'>
            {item?.followers} followers
            <button
              type='button'
              onClick={() => { handleFollowers() }}
              className='border border-orange-500 text-orange-500 font-medium text-sm bg-orange-50 px-2 py-[2px] rounded hover:bg-orange-500 hover:text-orange-50 transition-all'>
              un Follow
            </button>
          </p>
        }
      </div>
    </li>
  )
}
