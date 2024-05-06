"use client";
import { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from './firebase';
import useFcmToken from '../hooks/useFcmToken';
import { ProtectedRoutes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { USER_INFO } from '@/constants/common';
import { GetLeaderAddedPosts, GetPostsForLeader } from '@/redux_store/posts/postAPI';
import { postActions } from '@/redux_store/posts/postSlice';
import { cusDispatch } from '@/redux_store/cusHooks';
import { getFollowers, getProfile } from '@/redux_store/leader/leaderAPI';
import { leaderActions } from '@/redux_store/leader/leaderSlice';
import { getTickets } from '@/redux_store/ticket/ticketApi';
import { ticketActions } from '@/redux_store/ticket/ticketSlice';


export default function Notificationpage() {
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    const dispatch = cusDispatch()
    const router = useRouter();
    let userDetails: any = getCookie(USER_INFO);
    userDetails = userDetails && JSON.parse(userDetails);
    const Getdata = async (type: any) => {
        if (type == "new_post" || type == "development" || type == "agenda" || type == "poll" || type == "post_timeline") {
            const postsForLeader = await GetPostsForLeader(userDetails?.leaderId);
            dispatch(postActions.setPost(postsForLeader));
        }
        if (type == "like_post" || type == "comment_post") {
            const leaderpost = await GetLeaderAddedPosts(userDetails?.leaderId);
            dispatch(postActions.listPosts(leaderpost as any));
            const postsForLeader = await GetPostsForLeader(userDetails?.leaderId);
            dispatch(postActions.setPost(postsForLeader));
        }
        if (type == "follow_leader" || type == "unfollow_leader") {
            const followingRes = await getFollowers(userDetails?.leaderId as string);
            dispatch(leaderActions.setFollowers(followingRes));
        }
        if (type == "new_letter" || type == "thumbs_down" || type == "thumbs_up" || type == "letter_reminder" || type == "unopen_letter") {
            const postsForLeader = await GetPostsForLeader(userDetails?.leaderId);
            dispatch(postActions.setPost(postsForLeader)); const Tickets = await getTickets(userDetails?.leaderId as string);
            dispatch(ticketActions.storeTicket(Tickets));
        }
        if (type == "profile_approval" || type == "approval") {
            const leaderRes = await getProfile(userDetails?.leaderId);
            dispatch(leaderActions.setLeaderProfile(leaderRes));
        }
    }



    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload: any) => {
                const notificationTitle = payload.notification.title;
                const notificationOptions = {
                    body: payload.notification.body,
                    data: payload?.data ? payload?.data : {}
                };
                Getdata(payload?.data?.type)
                var notification = new Notification(notificationTitle, notificationOptions);
                notification.onclick = async function (event: any) {
                    notification.close();
                    event.preventDefault();
                    const data = payload?.data
                    const type = data?.type;
                    const referenceid = data?.referenceid;
                    const leaderid = data?.leaderid;
                    const notificationid = data?.notificationid;
                    let urlToOpen = ProtectedRoutes.user
                    let endurl = ""
                    let urlparams = ''
                    let notitype = ''
                    try {
                        if (type) {
                            notitype = "?type=" + type
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
                            router.replace(endurl + "&isnotification=" + "unread")
                        } else {
                            if (notificationid) {
                                endurl = urlToOpen + "?notificationid=" + notificationid + "&isnotification=" + "unread"
                            } else {
                                endurl = urlToOpen + "?isnotification=" + "unread"
                            }
                            router.replace(endurl)
                        }
                    } catch (error) {
                        router.replace(urlToOpen + "?isnotification=" + "unread")
                    }
                };
            });
            return () => {
                unsubscribe();
            };
        }
    }, []);


    return null;
}