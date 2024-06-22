"use client";
import { FC, useEffect, useState } from "react";
import {
  AGENDA_STATUS,
  AGENDA_VAL,
  PRIORITIES,
  PRIORITY,
  dateConverter,
} from "@/utils/utility";
import { DevelopmentAgendaTimeLine } from "./DevelopmentAgendaTimeLine";
import { AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ProtectedRoutes } from "@/constants/routes";
import { AgendaOptions } from "../AgendaOptions";
import { GrClose } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { deleteAgenda, deleteAgendapost, getAgenda } from "@/redux_store/agenda/agendaApi";
import { tryCatch } from "@/config/try-catch";
import { agendaAction } from "@/redux_store/agenda/agendaSlice";
import { useDispatch } from "react-redux";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { cusSelector } from "@/redux_store/cusHooks";
import { Nave } from "../utils";

interface AgendaPostProps {
  userdetails: any;
  post: any;
  type: string;
  index: string,
  allData?: any
  Getpost?: any
}

export const AgendaPost: FC<AgendaPostProps> = ({ userdetails, post, type, index, allData, Getpost }) => {
  const [showTimeline, setShowTimeline] = useState(false);
  var status = post?.status === 'not started yet' ? '2' : post?.status === 'in progress' ? '1' : '0'
  var title = type == "developments" ? post?.development_title : post?.title
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const types = searchParams.get('type');
  const referenceid = searchParams.get('referenceid');
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const { userDetails } = cusSelector((state) => state.auth);
  const deletehandler = async () => {
    tryCatch(
      async () => {
        const response = await deleteAgendapost(post?.id, userDetails?.leaderId as string, type);
        if (response?.success) {
          Getpost()
          const agendaData = await getAgenda(userDetails?.leaderId as string);
          dispatch(agendaAction.storeAgendas(agendaData))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    )
  }

  useEffect(() => {
    if (types == "post_timeline" && referenceid == post?.id && referenceid && showTimeline == false) {
      router.replace(ProtectedRoutes.user);
    }
  }, [types == "post_timeline" && referenceid == post?.id, showTimeline])

  return (
    <>
      <article className="border bg-white rounded-md relative flex items-start overflow-hidden max-[700px]:flex-col">
        <h3 className={`self-stretch uppercase border flex flex-col-reverse justify-evenly items-center px-[10px] text-[18px] max-[700px]:flex-row max-[700px]:justify-around max-[700px]:py-1 min-[700px]:py-3 ${PRIORITIES[post?.priority as PRIORITY].classes} `}>
          {PRIORITIES[post?.priority as PRIORITY].name.split("").map((el, index) => (
            <span className="min-[700px]:-rotate-90" key={index}>
              {el}
            </span>
          ))}
        </h3>

        <section className="flex flex-col w-full">
          <div className="flex items-center pr-5 gap-3 py-4 px-5 text-sky-950 border-b max-[650px]:flex-wrap">
            <Link href={Nave({ id: post?.leaderid, leader: userDetails?.leaderId })} className="flex items-center gap-3">
              <CustomImage
                src={getImageUrl(userdetails?.image)}
                alt="user pic"
                className="w-12 aspect-square object-cover object-center rounded-full"
                width={100}
                height={100}
              />

              {/* Info and date of publish */}
              <div >
                <h4 className="font-[600] text-lg text-orange-500">
                  {userdetails?.name}
                </h4>
                <p className="flex items-center capitalize gap-2 text-sm font-[500]">
                  <span>
                    Published on:{" "}{dateConverter(post?.createddate)}
                  </span>
                </p>
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center ml-auto gap-5 max-[700px]:flex-col-reverse max-[700px]:items-end">
              <label className={`ml-auto border text-[13px] rounded-full px-5 py-[2px] uppercase ${AGENDA_STATUS[status as AGENDA_VAL].classes}`}>
                {AGENDA_STATUS[status as AGENDA_VAL].name}
              </label>
              <button
                className="relative"
                id="moreOptions"
                onClick={() => setShowMorePostOptions((lst) => !lst)}
                style={{ display: userDetails?.leaderId === post?.leaderid ? "flex" : "none" }}
              >
                {showMorePostOptions ? <GrClose /> : <BsThreeDots className="text-2xl" />}

                {showMorePostOptions && (
                  <AgendaOptions
                    deleteAgendaHandler={() => deletehandler()}
                    onClose={() => setShowMorePostOptions(false)}
                    ispost={true}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Agenda */}
          <div className="py-5 flex flex-col gap-4 pr-5 px-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium capitalize flex items-center justify-between gap-3">
                {title}
                {post?.timeline?.length > 0 &&
                  <button onClick={() => setShowTimeline(true)} className="hover:text-orange-500 underline text-sm capitalize">
                    timeline
                  </button>
                }
              </h2>
              <p
                className="text-[15px]"
                dangerouslySetInnerHTML={{ __html: post?.description }}
              />
            </div>
          </div>
        </section>
      </article>
      <AnimatePresence mode="wait">
        {showTimeline && (
          <DevelopmentAgendaTimeLine
            onClose={() => setShowTimeline(false)}
            title={title}
            timeline={post?.timeline}
            status={post?.status === 'not started yet' ? '0' : post?.status === 'in progress' ? '1' : '2'}
          />
        )}
      </AnimatePresence>
    </ >
  );
};
