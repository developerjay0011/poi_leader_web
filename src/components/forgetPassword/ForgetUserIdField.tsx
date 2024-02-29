'use client'
import { ToastType } from '@/constants/common';
import { sendOtp } from '@/redux_store/auth/authAPI';
import { commonActions } from '@/redux_store/common/commonSlice';
import { cusDispatch } from '@/redux_store/cusHooks';
import { motion as m } from 'framer-motion'
import { FC, FormEvent, useState } from 'react'

interface ForgetUserIdFieldProps {
  proceedFn: () => void;
  setUserINP: (data: any) => void;
  userINP: string;
}

export const ForgetUserIdField: FC<ForgetUserIdFieldProps> = ({
  proceedFn,
  setUserINP,
  userINP,
}) => {
  const dispatch = cusDispatch();
  const [registering, setRegistering] = useState(false);

  const resendOTP = async () => {
    try {
      if (userINP.length !== 0) {
        setRegistering(true);
        const body = { mobile: userINP || "" };
        const sandOtp = await sendOtp(body as any);
        setRegistering(false);
        if (sandOtp?.success) {
          proceedFn();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: sandOtp.message }))
        }
      }
    } catch (err) {
      setRegistering(false);
    }
  };
  const userIdSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    resendOTP();
  };


  return (
    <>
      <m.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col gap-8 w-full'
        onSubmit={userIdSubmitHandler}>
        <label htmlFor='userId' className='flex flex-col gap-4'>
          <span className='max-[500px]:text-[14px]'>
            Enter your Phone Number
          </span>

          <input
            value={userINP}
            type='text'
            id='userId'
            onChange={(e) => setUserINP(e.target.value)}
            className='bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600'
          />
        </label>

        <div className='flex items-center self-center gap-2'>
          <button
            type='submit'
            disabled={registering}
            className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400'>
            {registering ? "Proceed..." : "Proceed"}
          </button>
        </div>
      </m.form>
    </>
  )
}
