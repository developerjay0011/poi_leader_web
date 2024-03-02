"use client";
import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { authActions } from "@/redux_store/auth/authSlice";
import { LOGIN_BODY, TOKEN_KEY, ToastType } from "@/constants/common";
import { AuthRoutes } from "@/constants/routes";
import CustomImage from "@/utils/CustomImage";
import { userLogin } from "@/redux_store/auth/authAPI";
import { leaderActions } from "@/redux_store/leader/leaderSlice";
import { BsPencilSquare } from "react-icons/bs";
import { uploadProfileImage } from "@/redux_store/leader/leaderAPI";
import { getImageUrl } from "@/config/get-image-url";
import { PersonalInformationForm } from "@/app/leaderinfo/personal-information/PersonalInformationForm";
import { ContactForm } from "@/app/leaderinfo/contact-information/ContactInformationForm";
import { commonActions } from "@/redux_store/common/commonSlice";
import { getLeadersOptions } from "@/redux_store/common/commonAPI";
import { LeaderPoliticalInfoFrom } from "@/app/leaderinfo/political-information/from";
import { Rejectedfrom } from "@/app/leaderinfo/Rejectedfrom";


export const LeaderDetailFrom: FC = () => {
    const { leaderProfile } = cusSelector((state) => state.leader);
    const [page, setPage] = useState("0")
    const router = useRouter();
    const dispatch = cusDispatch();
    const [userimage, setUserimage] = useState('')
    const [userbg, setUserbg] = useState('')

    useEffect(() => {
        (async () => {
            const LeadersDropdown = await getLeadersOptions();
            dispatch(commonActions.setLeaderOptions(LeadersDropdown));
        })()
        if (leaderProfile?.id) {
            setUserbg(leaderProfile?.bgimage ? leaderProfile?.bgimage : "")
            setUserimage(leaderProfile?.image ? leaderProfile?.image : "")
        } else {
            const resBody = getCookie(LOGIN_BODY);
            (async () => {
                const response = await userLogin(JSON.parse(resBody as any));
                const loginResponse = response as any;
                const { success, message, data } = loginResponse;
                if (loginResponse.token && (data?.leader_detail?.is_profile_complete == false || data?.leader_detail?.request_status == "Rejected")) {
                    if (data?.leader_detail?.request_status == "Rejected") {
                        dispatch(leaderActions.setReason(data.reason));
                    }
                    const userData = {
                        ...data.user_detail,
                        leaderId: data?.leader_detail.id
                    };
                    setCookie(LOGIN_BODY, resBody);
                    setCookie(TOKEN_KEY, loginResponse.token);
                    dispatch(authActions.setUserData(userData));
                    dispatch(leaderActions.setLeaderProfile(data.leader_detail));
                    return
                } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: 'Leader Information Not Found Login Again.' }))
                    router.push(AuthRoutes.login);
                }
            })();
        }
    }, [leaderProfile?.id])



    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const files = e.target.files as FileList;
        if (files.length > 0) {
            const formData = new FormData();
            formData.append("leaderid", leaderProfile?.id as string);
            formData.append(fieldName, files[0] || "");
            const profileRes = await uploadProfileImage(formData);
            if (profileRes?.success) {
                if (fieldName == "image") {
                    setUserimage(profileRes?.data ? profileRes.data : "")
                } else {
                    setUserbg(profileRes.data)
                }
            }
        }
    }


    return (
        <>
            <section className='m-auto my-10 w-[75%] gap-10 overflow-y-scroll main_scrollbar flex flex-col max-[1650px]:w-[90%] max-[1370px]:w-[95%] max-[1000px]:w-[94%] max-[1000px]:my-6 max-[400px]:w-[98%] max-[400px]:my-2'>
                {leaderProfile?.id &&
                    <>
                        <FromBg className="" >
                            <section className='flex flex-col text-sky-950 w-full'>
                                {/* USER PIC and BG pic*/}
                                <figure className='relative rounded-lg  overflow-hidden'>
                                    <label htmlFor="bgimage" className="cursor-pointer">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*" id="bgimage"
                                            multiple
                                            onChange={(e) => onChangeHandler(e, 'bgimage')}
                                        />
                                        <BsPencilSquare className="absolute top-3 right-3 z-10 text-orange-500 text-[25px] shadow" />
                                    </label>
                                    <CustomImage
                                        src={getImageUrl(userbg) as string}
                                        alt='bg image'
                                        width={1000}
                                        height={1000}
                                        className='w-full h-[25rem] object-cover object-center max-[750px]:h-[16rem]'
                                    />

                                    <CustomImage
                                        src={getImageUrl(userimage) as string}
                                        alt='display image'
                                        width={1000}
                                        height={1000}
                                        className='w-[9rem] border-4 aspect-square object-cover object-center rounded-full shadow-lg absolute bottom-5 left-8 max-[750px]:w-[7.5rem] max-[750px]:border-2 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%]'
                                    />
                                    <label htmlFor="image" className='hover:opacity-100 hover:text-orange-500 hover:bg-opacity-70 hover:bg-white text-transparent transition-all cursor-pointer absolute aspect-square border-4 bottom-5 flex items-center justify-center left-8 max-[450px]:left-1/2 max-[450px]:translate-x-[-50%] max-[750px]:border-2 max-[750px]:w-[7.5rem] object-center object-cover rounded-full shadow-lg w-[9rem]'>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*" id="image"
                                            multiple
                                            onChange={(e) => onChangeHandler(e, 'image')}
                                        />
                                        <BsPencilSquare className="text-[25px] shadow" />
                                    </label>
                                </figure>
                            </section>
                        </FromBg>
                        <section className='gap-10 flex flex-col  w-full'>
                            {leaderProfile?.request_status === "Rejected" &&
                                <FromBg className='p-5' >
                                    <Rejectedfrom />
                                </FromBg>
                            }
                            {page == "0" ? (
                                <FromBg className='p-10' >
                                    <PersonalInformationForm
                                        setPage={setPage}
                                    />
                                </FromBg>
                            ) : page == "1" ? (
                                <FromBg className='p-10' >
                                    <LeaderPoliticalInfoFrom
                                        setPage={setPage}
                                    />
                                </FromBg>
                            ) : page == "2" ? (
                                <FromBg className='p-10' >
                                    <ContactForm
                                        setPage={setPage}
                                        moveLogin={() => router.push(AuthRoutes.login)}
                                    />
                                </FromBg>
                            ) :
                                null}
                        </section>
                    </>
                }
            </section>
        </>
    );
};

interface FromBgProps {
    children: ReactNode,
    className: string
}
export const FromBg: FC<FromBgProps> = ({ children, className }) => {
    return (
        <>
            <section className={`bg-zinc-100 gap-10 flex flex-col rounded-xl ${className}`}>
                {children}
            </section>
        </>
    );
};