'use client'
import { FC, FormEvent, useState } from 'react'
import { motion as m } from 'framer-motion'
import { ForgotPassword } from '@/redux_store/auth/authAPI'
import { cusDispatch } from '@/redux_store/cusHooks'
import { ToastType } from '@/constants/common'
import { commonActions } from '@/redux_store/common/commonSlice'


interface CreateNewPasswordFormProps {
  proceedFn: () => void
  number: string;
}


export const CreateNewPasswordForm: FC<CreateNewPasswordFormProps> = ({
  proceedFn,
  number,
}) => {
  const dispatch = cusDispatch()
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [registering, setRegistering] = useState(false);

  const Password = () => {
    const specialChar = `~!@#$%^&*()-_+={}[]|:;"'<>,.`.split("");
    if (pass1.length < 8) {
      dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Password must atleast 8 char long" }))
      return false
    }
    if (!pass1.split("").some((el: string) => !isNaN(+el))) {
      dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Password should contain atleast one number" }))
      return false
    }
    if (!pass1.split("").some((el: string) => specialChar.includes(el))) {
      dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: `Password should contain atleast one special character` }))
      return false
    }
    return true
  }

  const newPasswordSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      email: number,
      password: pass1,
    };
    if (pass1 != pass2) {
      dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: "Please check both password" }))
      return;
    }
    if (Password()) {
      setRegistering(true);
      const forgot = await ForgotPassword(body);
      setRegistering(false);
      if (forgot?.success) {
        dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: forgot.message }))
        proceedFn();
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: forgot.message }))
      }
      return;
    }
  };
  return (
    <>
      <m.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col gap-5 w-full'
        onSubmit={newPasswordSubmitHandler}>
        <label htmlFor='userId' className='flex flex-col gap-2'>
          <span className='max-[500px]:text-[14px]'>Enter New password</span>
          <input
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            type="password"
            className="bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600"
          />
        </label>

        <label htmlFor='userId' className='flex flex-col gap-2'>
          <span className='max-[500px]:text-[14px]'>Confirm New password</span>

          <input
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            type="password"
            className="bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600"
          />
        </label>

        <div className='flex items-center self-center gap-2 mt-4'>
          <button
            disabled={registering}
            type='submit'
            className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full capitalize'>
            {registering ? "submit.." : "submit"}
          </button>
        </div>
      </m.form>
    </>
  )
}
