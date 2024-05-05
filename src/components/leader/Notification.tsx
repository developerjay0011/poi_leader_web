import { getImageUrl } from '@/config/get-image-url'
import { ProtectedRoutes } from '@/constants/routes'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { DeleteLeaderNotification, ReadLeaderNotification, getNotification } from '@/redux_store/leader/leaderAPI'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import CustomImage from '@/utils/CustomImage'
import { user2Img } from '@/utils/utility'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi'
interface NotificationProps {
  title: string
  description: string
  userimg: string
  noti: any
}
export const Notification: FC<NotificationProps> = ({ title, description, userimg, noti }) => {
  const { userDetails }: any = cusSelector((state) => state.auth);
  const dispatch = cusDispatch();
  const router = useRouter();



  return (
    <li className='py-5 last_noti px-3 flex items-center gap-2' onClick={async (e) => {
      if (noti?.isread != true) {
        ReadLeaderNotification({ "id": noti?.id, "leaderid": userDetails.leaderid })
        const response = await getNotification({ "leaderId": userDetails?.leaderId, "employeeId": userDetails?.employeeId });
        dispatch(leaderActions.setNotification(response));
      }
      var type = noti?.moduletype
      var notificationid = noti?.id
      var referenceid = noti?.referenceid
      var leaderid = userDetails.leaderid
      let urlToOpen = ProtectedRoutes.user
      let endurl = ""
      let urlparams = ''
      let notitype = ''
      if (noti?.referenceid) {
        notitype = "?type=" + type
        if (type) {
          if (type == "new_post" || type == "development" || type == "agenda" || type == "poll" || type == "post_timeline") {
            if (type == "post_timeline") {
              urlToOpen = ProtectedRoutes.user
              urlparams = "&referenceid=" + referenceid + "&leaderid=" + leaderid
            } else {
              urlToOpen = ProtectedRoutes.user
              urlparams = ''
            }
          }
          if (type == "like_post" || type == "comment_post") {
            urlToOpen = ProtectedRoutes.feed
            urlparams = "&referenceid=" + referenceid
          }
          if (type == "follow_leader" || type == "unfollow_leader") {
            urlToOpen = ProtectedRoutes.followers
          }
          if (type == "new_letter" || type == "thumbs_down" || type == "thumbs_up" || type == "letter_reminder" || type == "unopen_letter") {
            urlToOpen = ProtectedRoutes.ticket
            urlparams = "&referenceid=" + referenceid
          }
          if (urlparams) {
            endurl = notificationid ? urlToOpen + notitype + urlparams + "&notificationid=" + notificationid : urlToOpen + notitype + urlparams
          } else {
            endurl = notificationid ? urlToOpen + notitype + "&notificationid=" + notificationid : urlToOpen + notitype
          }
          router.replace(endurl + "&isnotification=" + 'read')
        } else {
          if (notificationid) {
            endurl = urlToOpen + "?notificationid=" + notificationid + "&isnotification=" + "read"
          } else {
            endurl = urlToOpen + "?isnotification=" + "read"
          }
          router.replace(endurl)
        }
      }
    }} style={{ cursor: "pointer" }} >
      {userimg &&
        <CustomImage
          src={getImageUrl(userimg)}
          alt='user 2 pic'
          width={1000}
          height={1000}
          className='w-14 aspect-square rounded-full object-cover object-center '
        />
      }
      {/* Info box */}
      <div className='flex flex-col text-left'>
        <p style={{ flexDirection: "row", display: "flex", alignItems: "center" }} className='text-[13px] object-left'>{title} <div className='ml-2' style={{ display: noti?.isread == false ? "flex" : "none", width: "8px", height: "8px", background: "red", borderRadius: "10px" }} /></p>
        <p className='text-[13px] object-left'>
          {description}
        </p>
      </div>

      {/* Notification */}
      <button onClick={async (e) => {
        await DeleteLeaderNotification({
          "id": noti?.id,
          "leaderid": userDetails.leaderId
        })
        const response = await getNotification({ "leaderId": userDetails?.leaderId, "employeeId": userDetails?.employeeId });
        dispatch(leaderActions.setNotification(response));
      }} className='ml-auto hover:text-orange-500'>
        <BiSolidTrashAlt className='' />
      </button>
    </li>
  )
}
