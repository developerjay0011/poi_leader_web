'use client'
import { FC, useState } from 'react'
import { CommonBox } from '@/utils/CommonBox'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { Notification } from '../Notification'
import { ClearAllLeaderNotification, getNotification } from '@/redux_store/leader/leaderAPI'
import { leaderActions } from '@/redux_store/leader/leaderSlice'
import { NODATA } from 'dns'
import { Datanotfound } from '@/utils/Datanotfound'
import { Savedby } from '@/constants/common'

export const NotificationPage: FC = () => {
    const { notification } = cusSelector((state) => state.leader);
    const { userDetails }: any = cusSelector((state) => state.auth);
    const dispatch = cusDispatch();
    return (
        <>
            <div className='flex flex-col gap-5 border rounded-md w-full bg-white text-sky-950'>
                <div className='flex items-center justify-between border-b py-3'>
                    <h2 className='flex items-center h-[30px] after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-3  font-[500] text-[16px] capitalize'>
                        all notifications
                    </h2>
                    {(notification.length > 0 && Savedby()?.saved_by_type == "leader") &&
                        <h2
                            onClick={async () => {
                                await ClearAllLeaderNotification(userDetails.leaderId)
                                const response = await getNotification({ "leaderId": userDetails?.leaderId, "employeeId": userDetails?.employeeId });
                                dispatch(leaderActions.setNotification(response));
                            }}
                            className='cursor-pointer flex items-center font-[500] text-[13px] capitalize px-3 hover:underline hover:text-orange-500 '>
                            Clear
                        </h2>
                    }
                </div>
                <div className='px-6 w-full overflow-auto main_scrollbar'>
                    <ul className='flex flex-col'>
                        {notification.length > 0 ?
                            notification.map((noti: any, index: number) => {
                                return (
                                    <Notification noti={noti} key={index} title={noti.title} description={noti.description} userimg={""} />
                                )
                            })
                            :
                            <Datanotfound name="notifications" />
                        }
                    </ul>

                </div>
            </div>
        </>
    )
}

