'use client'
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Logo from '@/assets/favicon.png'
import { motion as m } from 'framer-motion'
import { ErrObj } from '@/utils/typesUtils'
import { cusSelector } from '@/redux_store/cusHooks'
import { useRouter } from 'next/navigation'
import { AuthRoutes } from '@/constants/routes'

interface OTPFormProps {
  onClose: () => void
  phoneNo: string
  resendOtpTime: number
  resendOtpFn: () => void
  verifyOTP: (otp: string) => void
  verifying: boolean
}

let curOtpIndex: number = 0

export const OTPForm: FC<OTPFormProps> = ({
  onClose,
  phoneNo,
  resendOtpTime,
  resendOtpFn,
  verifyOTP,
  verifying,
}) => {
  const [OTP, setOTP] = useState(['', '', '', '', '', ''])
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const [err, setErr] = useState<ErrObj>({
    errTxt: '',
    isErr: false,
  })
  const otpInpRef = useRef<HTMLInputElement>(null)

  const { registering, otpVerified, verifyingOTP, otpErr } = cusSelector(
    (st) => st.UI
  )

  const router = useRouter()

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

    if (otp.length !== 6)
      return setErr({ errTxt: 'please enter a valid otp', isErr: true })

    verifyOTP(otp)
  }

  useEffect(() => {
    if (!registering && otpVerified && !verifyingOTP) {
     
      onClose()
      router.push(AuthRoutes.login);
    }
  }, [onClose, otpVerified, router, verifyingOTP, registering])

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut' }}
        className='w-full h-[100dvh] fixed top-0 left-0 otp_modal backdrop-blur-[4px]'>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut' }}
          className='z-20 w-full h-full bg-sky-950 bg-opacity-40 backdrop-blur-[4px] absolute top-0 left-0'
        />

        <m.div
          initial={{ rotateX: 80 }}
          animate={{ rotateX: 0 }}
          exit={{ rotateX: -80 }}
          transition={{ ease: 'easeOut' }}
          className='bg-sky-50 origin-top rounded-md shadow-md z-30 w-max relative m-auto px-10 py-8 flex flex-col items-center gap-10 mt-10'>
          <Image src={Logo} alt='poi logo' className='w-auto h-[8rem]' />

          <form
            className='text-sky-950 flex flex-col gap-3'
            onSubmit={otpSubmitHandler}>
            {otpErr.isErr && (
              <span className='text-red-500 block text-center'>
                {otpErr.errTxt}
              </span>
            )}
            {err.isErr && (
              <span className='text-red-500 block text-center'>
                {err.errTxt}
              </span>
            )}
            <h4 className='text-xl'>
              Enter OTP sent on Mobile No XXXXXXX
              {phoneNo.slice(7, 10)}
            </h4>
            <div className='flex items-center m-auto gap-3'>
              {OTP.map((_, i) => {
                return (
                  <label
                    key={i}
                    htmlFor='mobileOTP'
                    className='flex justify-center gap-4 text-sky-700 font-[600] text-xl'>
                    <input
                      type='number'
                      ref={i === activeOtpIndex ? otpInpRef : null}
                      id='mobileOTP'
                      onChange={otpChangeHandleHandler}
                      maxLength={1}
                      className='bg-sky-100 w-9 h-12 border-sky-300 border rounded-md text-center outline-none num_inp'
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

            {/* Resend OTP button */}
            {!verifying && (
              <button
                disabled={resendOtpTime !== 0}
                onClick={resendOtpFn}
                type='button'
                className='text-sky-600 font-medium mt-3 disabled:text-zinc-400 disabled:cursor-not-allowed'>
                Resend OTP{' '}
                {resendOtpTime !== 0 && (
                  <span className='text-sky-600'>
                    after {resendOtpTime} seconds
                  </span>
                )}
              </button>
            )}

            <div className='flex items-center self-center gap-2 mt-6'>
              <button
                type='button'
                onClick={onClose}
                className='text-sky-800 font-[600] bg-sky-200 py-2 px-5 rounded-full'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={verifying || OTP.join('').length !== 6}
                className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400'>
                {verifying ? 'Verifying..' : 'Verify'}
              </button>
            </div>
          </form>
        </m.div>
      </m.div>
    </>
  )
}
