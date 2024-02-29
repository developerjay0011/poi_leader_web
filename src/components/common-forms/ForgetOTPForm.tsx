'use client'
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { motion as m } from 'framer-motion'
import { verifyOtp } from '@/redux_store/auth/authAPI'
import { ToastType } from '@/constants/common'
import { commonActions } from '@/redux_store/common/commonSlice'
import { cusDispatch } from '@/redux_store/cusHooks'
interface ForgetOTPFormProps {
  proceedFn: () => void
  number: string

}

let curOtpIndex: number = 0


export const ForgetOTPForm: FC<ForgetOTPFormProps> = ({
  proceedFn,
  number,
}) => {
  const dispatch = cusDispatch();
  const [OTP, setOTP] = useState(['', '', '', '', '', ''])
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const otpInpRef = useRef<HTMLInputElement>(null)
  const [registering, setRegistering] = useState(false);
  const verifyOTP = async (otp: string) => {
    try {
      setRegistering(true);
      const body = {
        mobile: number,
        otp: otp,
      };
      const verify = await verifyOtp(body);
      setRegistering(false);
      if (verify?.success) {
        proceedFn()
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: verify.message }))
      }
    } catch (err) {
      console.error(err);
      setRegistering(false);
    }
  };
  useEffect(() => {
    otpInpRef.current?.focus()
  }, [activeOtpIndex])

  const otpChangeHandleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const userEnteredOtp = [...OTP]

    userEnteredOtp[curOtpIndex] = e.target.value.substring(
      e.target.value.length - 1
    )

    if (!e.target.value) setActiveOtpIndex(curOtpIndex - 1)
    else setActiveOtpIndex(curOtpIndex + 1)

    setOTP(userEnteredOtp)
  }

  const otpSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    const otp = OTP.join('')
    if (otp.length !== 6) return
    verifyOTP(otp)
  }

  return (
    <m.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='text-sky-950 flex flex-col gap-3 w-full'
      onSubmit={otpSubmitHandler}>
      {/* {otpErr.isErr && (
        <span className='text-red-500 block text-center'>{otpErr.errTxt}</span>
      )} */}
      <h4 className='text-xl max-[500px]:text-[14px]'>
        Enter OTP sent on number ending with XXXXXXX{number.slice(7, 10)}
      </h4>
      <div className='flex items-center m-auto gap-3'>
        {OTP.map((_, i) => {
          return (
            <label
              key={i}
              htmlFor='mobileOTP'
              className='flex justify-center gap-4 text-sky-700 font-[600] text-xl max-[500px]:gap-2'>
              <input
                type='number'
                ref={i === activeOtpIndex ? otpInpRef : null}
                id='mobileOTP'
                onChange={otpChangeHandleHandler}
                maxLength={1}
                className='bg-sky-100 w-9 h-12 border-sky-300 border rounded-md text-center outline-none num_inp max-[500px]:w-7'
                value={OTP[i]}
                onKeyDown={(e) => {
                  curOtpIndex = i
                  if (e.key === 'Backspace') setActiveOtpIndex(i - 1)
                }}
              />
            </label>
          )
        })}
      </div>

      <div className='flex items-center self-center gap-2 mt-6'>
        <button
          type='submit'
          disabled={registering}
          className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full'>
          {registering ? 'Verify....' : "Verify"}
        </button>
      </div>
    </m.form>
  )
}
