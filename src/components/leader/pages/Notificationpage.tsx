'use client'
import { FC, lazy, Suspense, memo, useCallback } from 'react'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { ClearAllLeaderNotification, getNotification } from '@/redux_store/leader/leaderAPI'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { Savedby } from '@/constants/common'

// Lazy load components
const Notification = lazy(() => import('../Notification').then(mod => ({ default: mod.Notification })))
const Datanotfound = lazy(() => import('@/utils/Datanotfound').then(mod => ({ default: mod.Datanotfound })))

const NotificationSkeleton = () => (
    <div className="animate-pulse flex items-center gap-4 p-4">
        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
    </div>
)

export const NotificationPage: FC = memo(() => {
    const { notification } = cusSelector((state) => state.leader);
    const { userDetails } = cusSelector((state) => state.auth);
    const dispatch = cusDispatch();

    const handleClearAll = useCallback(async () => {
        if (!userDetails?.leaderId) return;
        await ClearAllLeaderNotification(userDetails.leaderId);
        const response = await getNotification({ 
            leaderId: userDetails?.leaderId, 
            employeeId: userDetails?.employeeId 
        });
        dispatch(leaderActions.setNotification(response));
    }, [userDetails?.leaderId, userDetails?.employeeId, dispatch]);

    return (
        <div className='bg-white border shadow-sm m-5 rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
            <div className='flex items-center justify-between border-b py-3'>
                <h2 className='flex items-center h-[30px] after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-3 font-[500] text-[16px] capitalize'>
                    all notifications
                </h2>
                {(notification?.length > 0 && Savedby()?.saved_by_type === "leader") && (
                    <h2
                        onClick={handleClearAll}
                        className='cursor-pointer flex items-center font-[500] text-[13px] capitalize px-3 hover:underline hover:text-orange-500'>
                        Clear
                    </h2>
                )}
            </div>
            <div className='px-6 w-full overflow-auto main_scrollbar'>
                <Suspense fallback={[1, 2, 3].map(i => <NotificationSkeleton key={i} />)}>
                    <ul className='flex flex-col'>
                        {notification?.length > 0 ? (
                            notification?.map((noti: any, index: number) => (
                                <Notification
                                    key={noti.id || index}
                                    noti={noti}
                                    title={noti.title}
                                    description={noti.description}
                                    userimg={""}
                                />
                            ))
                        ) : (
                            <Datanotfound name="notifications" />
                        )}
                    </ul>
                </Suspense>
            </div>
        </div>
    )
})

NotificationPage.displayName = 'NotificationPage'

export default NotificationPage
