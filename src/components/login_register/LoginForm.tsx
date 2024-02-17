"use client";
import { FC, useState } from "react";
import { BiUser } from "react-icons/bi";
import { LuLock } from "react-icons/lu";
import { AiOutlineKey } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
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
import { TOKEN_KEY } from "@/constants/common";
import { AuthRoutes, ProtectedRoutes } from "@/constants/routes";
import CustomImage from "@/utils/CustomImage";
import { userLogin } from "@/redux_store/auth/authAPI";

interface LoginFormProps {}
export const LoginForm: FC<LoginFormProps> = () => {
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = cusDispatch();

  const [showForgetPassForm, setShowForgetPassForm] = useState(false);
  const [err, setErr] = useState<ErrObj>({ isErr: false, errTxt: "" });

  const openModal = () => setShowForgetPassForm(true);
  const closeModal = () => setShowForgetPassForm(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormFields | RegisterFormFields>({
    defaultValues: {
      remember: true,
    },
    mode: "onChange",
  });

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
      const response = await userLogin(resBody);

      const loginResponse = response as any;
      const { success, message, data } = loginResponse;

      if (success) {
        if (data?.leader_detail?.is_profile_complete) {
          if (data?.leader_detail?.request_status === "Approved") {
            router.push(ProtectedRoutes.user);
            dispatch(authActions.setUserData(loginResponse));

            const userData = {
              id: loginResponse.data.leader_detail.id,
              userId: loginResponse.data.user_detail.id,
              username: loginResponse.data.leader_detail.username,
              email: loginResponse.data.leader_detail.email,
              mobile: loginResponse.data.leader_detail.mobile,
              displayPic: loginResponse.data.leader_detail.image,
              personal_info: loginResponse.data.leader_detail.personal_info,
              fcm_tokens: loginResponse.data.user_detail.fcm_tokens,
              token: loginResponse.token,
            };

            const serializedData = JSON.stringify(userData);

            // Store the serialized data in session storage
            setCookie('userData', serializedData);
            setCookie(TOKEN_KEY, userData.token);
          } else {
            setErr({
              errTxt: `Your Request Is ${data?.leader_detail?.request_status} `,
              isErr: true,
            });
          }
        } else {
          router.push(ProtectedRoutes.userManagement);
        }
      } else {
        setErr({ errTxt: message, isErr: true });
      }
      setLoggingIn(false);
    } catch (error: any) {
      setLoggingIn(false);
      setErr({ errTxt: error.message, isErr: true });
    }
  };

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
            {loggingIn ? "Logging.." : "Login"}
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
