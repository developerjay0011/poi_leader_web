'use client'
import { FC, useState } from 'react'
import { CommonBox } from '@/utils/CommonBox'
import { cusSelector } from '@/redux_store/cusHooks'
import { Notification } from '../Notification'

export const NotificationPage: FC = () => {
    const { notification } = cusSelector((state) => state.leader);

    return (
        <>
            <div className='flex gap-5'>
                <CommonBox title='all notifications' width='flex-1 self-start'>
                    <ul className='flex flex-col'>
                        {notification.length > 0 &&
                            notification.map((noti: any, index: number) => {
                                return (
                                    <Notification key={index} title={noti.title} description={noti.description} userimg={noti.userimg} />
                                )
                            })}
                    </ul>
                </CommonBox>
            </div>
        </>
    )
}

