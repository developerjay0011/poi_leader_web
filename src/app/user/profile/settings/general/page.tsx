'use client'
import { GenerateId } from '@/utils/utility'
import Link from 'next/link'
import { FC, useState, useId } from 'react'
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { tryCatch } from '@/config/try-catch';
import { submitLeaderForm } from '@/redux_store/APIFunctions';
import { leaderActions } from '@/redux_store/leader/leaderSlice';
import { commonActions } from '@/redux_store/common/commonSlice';
import { ToastType } from '@/constants/common';
import { AnimatePresence } from 'framer-motion';
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox';
import { closeAccount, deActiveAccount } from '@/redux_store/common/commonAPI';
import { authActions } from '@/redux_store/auth/authSlice';

const AdminGeneralSettingPage: FC = () => {
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { userDetails } = cusSelector((state) => state.auth);
  const general_setting = leaderProfile?.general_setting
  const dispatch = cusDispatch();
  const [enableFollowMe, setEnableFollowMe] = useState(general_setting?.enable_follow_me)
  const [sendMeNotifications, setSendMeNotifications] = useState(general_setting?.send_me_notifications)
  const [showAgendas, setShowAgendas] = useState(general_setting?.show_agendas)
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const deleteHandler = async () => {
    tryCatch(
      async () => {
        const response = await (isDelete ? closeAccount(userDetails?.id as string) : deActiveAccount(userDetails?.id as string));
        if (response?.success) {
          dispatch(authActions.logout())
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    )
  }
  const formSubmitHandler = async () => {
    const resBody = {
      "enable_follow_me": enableFollowMe || false,
      "show_agendas": showAgendas || false,
      "send_me_notifications": sendMeNotifications || false
    }

    tryCatch(
      async () => {
        const param = {
          ...leaderProfile,
          'general_setting': resBody,
          political_info: {
            ...leaderProfile?.political_info?.activity_pictures,
            activity_pictures: leaderProfile?.political_info?.activity_pictures || []
          }
        }
        param.password = ""
        const response = await submitLeaderForm(param);

        if (response?.success) {
          // Update only personal info in redux store
          dispatch(leaderActions.setLeaderProfile({
            general_setting: resBody
          }));
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    );
  }
  return (
    <>
      <section className='flex flex-col gap-5'>
        <div className='text-sky-950 flex flex-col gap-1'>
          <h2 className='text-3xl capitalize font-medium'>general setting</h2>
          <p>
            Set your login preference, help us personalize your experience and
            make big account change here.
          </p>
        </div>

        <ul>
          <GeneralSetting
            description='user can follow you if this setting is on'
            title='enable follow me'
            value={enableFollowMe || false}
            onChange={(value: boolean) => setEnableFollowMe(value)}
          />

          <GeneralSetting
            description='user can see your agendas'
            title='show agendas'
            value={sendMeNotifications || false}
            onChange={(value: boolean) => setSendMeNotifications(value)}
          />

          <GeneralSetting
            description='send me notification emails my friends like, share or message me'
            title='Send Me Notifications'
            value={showAgendas || false}
            onChange={(value: boolean) => setShowAgendas(value)}
          />
        </ul>

        <div className='flex justify-end gap-3'>
          {/* <Link
            href={'/leader/profile'}
            className='rounded-full px-8 py-3 text-[14px] bg-gray-400 text-gray-50 transition-all capitalize hover:bg-orange-500 hover:text-orange-50'>
            cancel
          </Link> */}
          <button
            onClick={() => { formSubmitHandler() }}
            type='button'
            className='rounded-full px-8 py-3 text-[14px] bg-orange-500 text-orange-50 transition-all capitalize hover:bg-gray-400 hover:text-gray-50'>
            save
          </button>
        </div>

        <div className='mt-5 bg-gray-200 rounded py-4 px-5 text-sky-950'>
          <h4 className='text-2xl capitalize font-medium'>Account changes</h4>

          <p className='mt-4 flex items-center justify-between text-gray-600'>
            <span>Hide your Posts and profile</span>
            <button
              onClick={() => { setShowConfirmBox(true), setIsDelete(false) }}
              type='button'
              className='rounded-full bg-gray-400 text-[14px] text-gray-50 py-2 px-6 hover:bg-orange-500 hover:text-orange-50 capitalize'>
              deactivate account
            </button>
          </p>

          <p className='mt-4 flex items-center justify-between text-gray-600'>
            <span>Delete your account and data</span>
            <button
              onClick={() => { setShowConfirmBox(true), setIsDelete(true) }}
              type='button'
              className='rounded-full bg-gray-400 text-[14px] text-gray-50 py-2 px-6 hover:bg-orange-500 hover:text-orange-50 capitalize'>
              close account
            </button>
          </p>
        </div>
        <AnimatePresence mode="wait">
          {showConfirmBox && (
            <ConfirmDialogBox
              noAllowed={false}
              onCancel={() => {
                setShowConfirmBox(false);
              }}
              onOk={deleteHandler}
            />
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

export default AdminGeneralSettingPage

interface GeneralSettingProps {
  title: string
  description: string
  value: boolean
  onChange: (value: boolean) => void
}

const GeneralSetting: FC<GeneralSettingProps> = ({ description, title, value, onChange }) => {
  const [checked, setChecked] = useState(value)
  const id = useId()

  return (
    <>
      <li className='flex items-center justify-between border-b py-5'>
        <div className='flex flex-col'>
          <h3 className='capitalize font-[500]'>{title}</h3>
          <p className='text-[15px] first-letter:capitalize text-gray-600'>
            {description}
          </p>
        </div>

        <label htmlFor={id} className='cursor-pointer'>
          <input
            type='checkbox'
            id={id}
            checked={checked}
            onChange={(e) => { setChecked((e) => !e), onChange(!checked) }}
            className='hidden cus_check_box'
          />
          <div className='inline-block rounded-full w-16 h-8 bg-gray-400 relative transition-all'>
            <p className='text-white uppercase text-[12px] absolute top-1/2 translate-y-[-50%] left-[51%]'>
              {checked ? 'on' : 'off'}
            </p>
            <span className='absolute h-[80%] aspect-square rounded-full bg-white top-1/2 translate-y-[-50%] left-[7%] transition-all' />
          </div>
        </label>
      </li>
    </>
  )
}
