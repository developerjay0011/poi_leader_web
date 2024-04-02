"use client";
import { FC, useState } from "react";
import { BiUser } from "react-icons/bi";
import { LuLock } from "react-icons/lu";
import { AiOutlineKey } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";
import Logo from "@/assets/favicon.png";
import { useForm } from "react-hook-form";
import {
  ErrObj,
  LoginFormFields,
  RegisterFormFields,
} from "@/utils/typesUtils";
import { LPInputField } from "@/utils/LPInputField";
import { cusDispatch } from "@/redux_store/cusHooks";
import { ForgetPassword } from "../common-forms/ForgetPasswordForm";
import { AnimatePresence } from "framer-motion";
import { authActions } from "@/redux_store/auth/authSlice";
import { EMPLOYEE_ID, LEADER_ID, LOGIN_BODY, TOKEN_KEY, ToastType, USER_INFO, USER_TYPE, USER_VERIFY } from "@/constants/common";
import { AuthRoutes, EmployeeProtectedRoutes, ProtectedRoutes } from "@/constants/routes";
import CustomImage from "@/utils/CustomImage";
import { userLogin } from "@/redux_store/auth/authAPI";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { commonActions } from "@/redux_store/common/commonSlice";
import { fetchAccessTabs, fetchEmployeeAccessTabs } from "@/redux_store/accesstab/tabApi";
import { accessAction } from "@/redux_store/accesstab/tabSlice";

interface LoginFormProps { }
export const LoginForm: FC<LoginFormProps> = () => {
  const router = useRouter();
  const dispatch = cusDispatch();
  const [loggingIn, setLoggingIn] = useState(false);
  const [showForgetPassForm, setShowForgetPassForm] = useState(false);
  const [err, setErr] = useState<ErrObj>({ isErr: false, errTxt: "" });
  const openModal = () => setShowForgetPassForm(true);
  const closeModal = () => setShowForgetPassForm(false);
  const { register, formState: { errors, isValid }, handleSubmit, } = useForm<LoginFormFields | RegisterFormFields>({ defaultValues: { remember: true, }, mode: "onChange", });

  const formSubmitHandler = async (
    data: LoginFormFields | RegisterFormFields
  ) => {
    setErr({ errTxt: "", isErr: false });

    const resBody = {
      email: data?.userId,
      password: data?.password,
      fcm_token: {
        deviceid: "123",
        token: "",
      },
    };

    try {
      setLoggingIn(true);
      const response = await userLogin(resBody);
      const loginResponse = response as any;
      const { success, message, data } = loginResponse;
      if (success) {
        if (data?.user_detail?.usertype == "leader employee") {
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: message }))
          await SetCookieAndRedux(data, loginResponse, "leader employee", data?.employee_detail)
        } else {
          await SetCookieAndRedux(data, loginResponse, data?.user_detail?.usertype, null)
        }
      } else {
        setCookie(USER_VERIFY, 'false');
        if ((loginResponse.token && (data?.leader_detail?.is_profile_complete == false || data?.leader_detail?.request_status == "Rejected")) && (data?.user_detail?.usertype == "leader" || data?.user_detail?.usertype == "emerging leader")) {
          await SetCookieAndRedux(data, loginResponse, data?.user_detail?.usertype, null)
          if (data?.leader_detail?.request_status == "Rejected") { dispatch(leaderActions.setReason(data.reason)) }
          await setCookie(LOGIN_BODY, resBody);
          await router.push(AuthRoutes.leaderinfo);
          return
        } else {
          setErr({ errTxt: message, isErr: true });
          setLoggingIn(false);
        }
      }
    } catch (error: any) {
      setLoggingIn(false);
      setErr({ errTxt: error.message, isErr: true });
    }
  };


  const SetCookieAndRedux = async (data: any, loginResponse: any, usertype: string, employee_detail: any) => {
    setCookie(TOKEN_KEY, loginResponse.token);
    if (usertype == "leader employee") {
      await setCookie(USER_VERIFY, 'true');
      const userData = { ...data.user_detail, leaderId: data?.user_detail.leaderid, employeeId: data?.user_detail.employeeid, employee_detail };
      const serializedData = JSON.stringify(userData);
      await setCookie(USER_INFO, serializedData);
      await dispatch(leaderActions.setLeaderProfile(data.leader_detail));
      await dispatch(authActions.setUserData(userData));
      await setCookie(USER_TYPE, 'employee');
      await setCookie(EMPLOYEE_ID, data?.user_detail.employeeid);
      await router.push(EmployeeProtectedRoutes.employee);
      var tabs = await fetchEmployeeAccessTabs(data?.user_detail.employeeid, { nav: true, router: router, setLoggingIn: setLoggingIn })
      if (Array.isArray(tabs)) { await dispatch(accessAction.storeAccesstabs(tabs as any)) }
      return
    }
    if (usertype != "leader employee") {
      const userData = { ...data.user_detail, leaderId: data?.leader_detail.id };
      await dispatch(leaderActions.setLeaderProfile(data.leader_detail));
      await dispatch(authActions.setUserData(userData));
      const serializedData = JSON.stringify(userData);
      await setCookie(USER_INFO, serializedData);
      if (data?.leader_detail?.is_profile_complete && data?.leader_detail?.request_status === "Approved") {
        await setCookie(USER_TYPE, 'leader');
        await setCookie(USER_VERIFY, 'true');
        var tabs = await fetchAccessTabs(data.user_detail?.id, { nav: true, router: router, setLoggingIn: setLoggingIn })
        if (Array.isArray(tabs)) { await dispatch(accessAction.storeAccesstabs(tabs as any)) }
        await router.push(ProtectedRoutes.user);
        return
      }
      setLoggingIn(false);
    }
  }


  return (
    <>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        noValidate
        className="text-sky-800 rounded-xl shadow-xl bg-sky-50 flex flex-col items-center  py-9 px-7 gap-5 font-[500] max-[500px]:px-4 max-lg:w-full"
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
          <AiOutlineKey className="text-5xl" />
          Login
          <span className="text-base font-medium">as leader</span>
        </h2>

        <p className="text-center text-sm">
          Sign In And Connect With The Leaders & Emerging Leaders Around The
          India.
        </p>

        {err.isErr && <span className="text-red-500"> {err.errTxt}</span>}

        <section className="px-4 w-full mt-5 max-[500px]:px-0">
          <div className="w-full bg-sky-100 flex flex-col overflow-hidden rounded-lg shadow-md">
            <LPInputField
              iconSize="text-3xl"
              register={register}
              Icon={BiUser}
              errors={errors}
              id="userId"
              title="email / phone no"
              type="text"
              validations={{ required: "please enter email / password" }}
            />

            <LPInputField
              iconSize="text-3xl"
              register={register}
              Icon={LuLock}
              errors={errors}
              id="password"
              title="password"
              type="password"
              validations={{ required: "please enter a password" }}
            />
          </div>

          {/* Rember and forget password */}
          <div className="flex justify-between w-full mt-8 max-[500px]:flex-col max-[500px]:gap-6 max-[500px]:items-start  max-[500px]:px-3">
            <label
              htmlFor="remember"
              className="flex gap-2 items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="remember"
                className="hidden checkbox"
                {...register("remember")}
              />
              <span className="select-none w-5 aspect-square rounded-full inline-block relative border-sky-800 border-[4px] cursor-pointer after:bg-sky-800 after:w-[65%] after:aspect-square after:absolute after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:opacity-0" />
              <span>Remember me</span>
            </label>

            <button type="button" onClick={openModal} className="underline">
              Forget Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!isValid || loggingIn}
            className="py-2 px-6 font-semibold bg-sky-800 text-sky-50 rounded-full mt-8 max-[500px]:ml-3 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {loggingIn ? "Logging..." : "Login"}
          </button>

          <p className="mt-5 max-[500px]:ml-3">
            Dont have an account?{" "}
            <Link href={AuthRoutes.register} className="underline hover:font-[600]">
              Register with us
            </Link>
          </p>
        </section>
      </form>

      <AnimatePresence mode="wait">
        {showForgetPassForm && <ForgetPassword onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
};
