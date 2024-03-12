"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { HiUserAdd } from "react-icons/hi";
import { useForm } from "react-hook-form";
import Logo from "@/assets/favicon.png";
import { OTPForm } from "../common-forms/OTPForm";
import { AnimatePresence } from "framer-motion";
import { LoginFormFields, RegisterFormFields } from "@/utils/typesUtils";
import { LPInputField } from "@/utils/LPInputField";
import { MdLock, MdMail, MdPerson, MdPhone } from "react-icons/md";
import { USER_TYPE } from "@/utils/utility";
import { useRouter } from "next/navigation";
import { AuthRoutes } from "@/constants/routes";
import CustomImage from "@/utils/CustomImage";
import { cusDispatch } from "@/redux_store/cusHooks";
import { commonActions } from "@/redux_store/common/commonSlice";
import { LOGIN_BODY, TOKEN_KEY, ToastType, USER_INFO, USER_VERIFY } from "@/constants/common";
import { CheckLeaderUserRegExists, registerUser, sendOtp, userLogin, verifyOtp } from "@/redux_store/auth/authAPI";
import { setCookie } from "cookies-next";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { authActions } from "@/redux_store/auth/authSlice";


let interval: NodeJS.Timer;
let OTP_TIME = 120;

export const RegisterForm: FC = () => {
  const router = useRouter();
  const dispatch = cusDispatch();
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [resendOTPTime, setResendOTPTime] = useState(OTP_TIME);
  const [registering, setRegistering] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [registerdata2, setRegisterdata] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    leadertype: ''
  });
  const openOTPForm = () => setShowOTPForm(true);
  const closeOTPForm = () => {
    clearInterval(interval); // clearing Interval
    setResendOTPTime(OTP_TIME); // resetting time
    setRegistering(false); // stopping registration
    setShowOTPForm(false); // closing OTP form
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<RegisterFormFields | LoginFormFields>({
    mode: "onChange",
  });

  const resendOTP = async () => {
    try {
      const userData = getValues() as RegisterFormFields;
      setRegistering(true);
      const body = { mobile: userData.phoneNo || "" };
      const sandOtp = await sendOtp(body as any);
      if (sandOtp?.success) {
        interval = setInterval(() => {
          if (resendOTPTime > 0)
            setResendOTPTime((lst) => {
              if (lst > 0) return lst - 1;
              return 0;
            });
          else {
            setResendOTPTime(OTP_TIME);
            clearInterval(interval);
          }
        }, 1000);
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: sandOtp.message }))
      }
    } catch (err) {
      console.error(err);
      setRegistering(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setVerifying(true);
    const userData = getValues() as RegisterFormFields;
    clearInterval(interval);
    setResendOTPTime(OTP_TIME)

    try {
      const payload = {
        mobile: userData.phoneNo,
        otp: otp,
      };
      setRegistering(true);
      const res = await verifyOtp(payload);
      if (res?.success) {
        setVerifying(false);
        const resBody = {
          name: registerdata2?.name,
          email: registerdata2?.email,
          mobile: registerdata2?.mobile,
          password: registerdata2?.password,
          leadertype: registerdata2?.leadertype,
        };
        const response = await registerUser(resBody as any);
        if (response?.success) {
          const resBody = {
            email: registerdata2?.email,
            password: registerdata2?.password,
            fcm_token: {
              deviceid: "",
              token: "",
            },
          };
          const userlogin = await userLogin(resBody);
          const loginResponse = userlogin as any;
          const { data } = loginResponse;
          SetCookieAndRedux(data, loginResponse, data?.user_detail?.usertype, resBody)
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
          return
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
        closeOTPForm();
        router.push(AuthRoutes.login);
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: res.message }))
      }
    } catch (err) {
      setRegistering(false);
      setVerifying(false);
    }
  };
  const SetCookieAndRedux = async (data: any, loginResponse: any, usertype: string, resBody: any) => {
    const userData = { ...data.user_detail, leaderId: data?.leader_detail.id };
    setCookie(USER_VERIFY, 'false');
    setCookie(LOGIN_BODY, resBody);
    router.push(AuthRoutes.leaderinfo);
    dispatch(leaderActions.setLeaderProfile(data.leader_detail));
    setCookie(TOKEN_KEY, loginResponse.token);
    dispatch(authActions.setUserData(userData));
    const serializedData = JSON.stringify(userData);
    setCookie(USER_INFO, serializedData);
  }
  const formSubmitHandler = async (data: RegisterFormFields | LoginFormFields) => {
    setRegistering(true);
    const resBody = {
      name: data?.fullName,
      email: data?.email,
      mobile: data?.phoneNo,
      password: data?.password,
      leadertype: data?.userType,
    };
    setRegisterdata(resBody)
    try {
      const checkReg = await CheckLeaderUserRegExists({ email: data?.email, mobile: data?.phoneNo, });
      if (checkReg?.success == true) {
        const otpBody = { mobile: data?.phoneNo as "string", };
        const sandOtp = await sendOtp(otpBody);
        if (sandOtp?.success) {
          setShowOTPForm(true);
          interval = setInterval(() => {
            if (resendOTPTime > 0)
              setResendOTPTime((lst) => {
                if (lst > 0) return lst - 1;
                return 0;
              });
            else {
              setResendOTPTime(OTP_TIME);
              clearInterval(interval);
            }
          }, 1000);
          openOTPForm();
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: sandOtp.message }))
        }
      } else {
        dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: checkReg.message }))
      }
      setRegistering(false);
    } catch (error) {
      setRegistering(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        noValidate
        className="text-sky-800 rounded-xl shadow-xl bg-sky-50 flex flex-col items-center py-9 px-7 gap-5 max-[500px]:px-4 font-[500] max-lg:w-full"
      >
        {/* For Screens less than 1090px */}

        <CustomImage
          src={Logo}
          alt="poi logo"
          className="hidden w-auto self-start m-auto max-lg:block h-[10rem]"
        />

        <h3 className="hidden capitalize text-[2rem] font-[300] mt-4 max-lg:text-center max-lg:block">
          Welcome to the Politician of India
        </h3>
        {/* ----------------------------- */}

        <h2 className="uppercase font-[200] text-6xl flex flex-col items-center gap-2 max-lg:hidden">
          <HiUserAdd className="text-6xl" />
          sign up
        </h2>

        <p className="text-center text-sm">
          Sign Up And Connect With The Leaders & Emerging Leaders Around The
          India.
        </p>

        <div className="flex items-center justify-between px-4 mt-5 w-full max-[500px]:px-0">
          <label
            htmlFor="leader"
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              type="radio"
              id="leader"
              defaultChecked
              value={USER_TYPE.leader}
              className="hidden checkbox"
              {...register("userType", {
                required: "field is required",
              })}
            />
            <span className="select-none w-5 aspect-square rounded-full inline-block relative border-sky-800 border-[4px] cursor-pointer after:bg-sky-800 after:w-[65%] after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0" />
            <span>Leader</span>
          </label>

          <label
            htmlFor="emergingLeader"
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              type="radio"
              id="emergingLeader"
              value={USER_TYPE.emergingLeader}
              className="hidden checkbox"
              {...register("userType", {
                required: "field is required",
              })}
            />
            <span className="select-none w-5 aspect-square rounded-full inline-block relative border-sky-800 border-[4px] cursor-pointer after:bg-sky-800 after:w-[65%] after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0" />
            <span>Emerging Leader</span>
          </label>
        </div>

        <section className="px-4 w-full max-[500px]:px-0">
          <div className="w-full bg-sky-100 flex flex-col overflow-hidden rounded-lg shadow-md">
            <LPInputField
              iconSize="text-2xl"
              register={register}
              errors={errors}
              id="fullName"
              title="full name"
              type="text"
              validations={{
                required: "Field is required",
                validate: {
                  notAValidFullname(val) {
                    return val.includes(" ") || "Please enter a valid name";
                  },
                },
              }}
              Icon={MdPerson}
            />

            <LPInputField
              iconSize="text-2xl"
              register={register}
              errors={errors}
              id="email"
              title="email"
              type="email"
              validations={{
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message:
                    "Please enter a valid email EX: something@example.com",
                },
              }}
              Icon={MdMail}
            />

            <LPInputField
              iconSize="text-2xl"
              register={register}
              errors={errors}
              id="phoneNo"
              title="(+91) phone number"
              type="number"
              validations={{
                required: "Field is required",
                validate: {
                  notAValidNo(val) {
                    return (
                      val.toString().length === 10 ||
                      "please enter a valid phone no"
                    );
                  },
                },
              }}
              Icon={MdPhone}
            />

            <LPInputField
              iconSize="text-2xl"
              Icon={MdLock}
              register={register}
              errors={errors}
              id="password"
              title="password"
              type="password"
              validations={{
                required: "Field is required",
                validate: {
                  checkLength(val) {
                    return (
                      val.length >= 8 || "Password must atleast 8 char long"
                    );
                  },
                  checkNum(val) {
                    if (val.split("").some((el: string) => !isNaN(+el)))
                      return true;

                    return "Password should contain atleast one number";
                  },
                  checkSpecialCharacter(val) {
                    const specialChar = `~!@#$%^&*()-_+={}[]|:;"'<>,.`.split(
                      ""
                    );

                    if (
                      val
                        .split("")
                        .some((el: string) => specialChar.includes(el))
                    )
                      return true;

                    return `Password should contain atleast one special character`;
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || registering}
            className="py-2 px-6 font-semibold bg-sky-800 text-sky-50 rounded-full mt-8 max-[500px]:ml-3 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {!registering ? "Register" : "Registering..."}
          </button>

          <p className="mt-8">
            Already Registered ?{" "}
            <Link href={AuthRoutes.login} className="underline hover:font-[600]">
              Login
            </Link>
          </p>
        </section>
      </form>

      <AnimatePresence mode="wait">
        {showOTPForm && (
          <OTPForm
            onClose={closeOTPForm}
            phoneNo={getValues("phoneNo")}
            resendOtpTime={resendOTPTime}
            resendOtpFn={resendOTP}
            verifyOTP={verifyOTP}
            verifying={verifying}
          />
        )}
      </AnimatePresence>
    </>
  );
};
