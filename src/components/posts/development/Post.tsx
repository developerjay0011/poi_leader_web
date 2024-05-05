"use client";
import { FC, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AgendaOptions } from "../AgendaOptions";
import { GrClose } from "react-icons/gr";
import {
  PRIORITIES,
  PRIORITY,
} from "@/utils/utility";
import { DevelopmentDetails, developmentAction } from "@/redux_store/development/developmentSlice";
import { AnimatePresence } from "framer-motion";
import moment from 'moment'
import { TimeLineDetails } from "@/utils/typesUtils";
import { motion as m } from "framer-motion";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import TimeLineForm from "./TineLineForm";
import { commonActions } from "@/redux_store/common/commonSlice";
import { ToastType } from "@/constants/common";
import { tryCatch } from "@/config/try-catch";
import { deleteDevelopment, getDevelopment, makeDevelopmentPost } from "@/redux_store/development/developmentApi";
import { DevelopmentTimeLine } from "./TimeLine";
import { BiX } from "react-icons/bi";
interface DevelopmentPostProps extends DevelopmentDetails {
  userId: string;
  timeline: TimeLineDetails[]
  setDevelopment: any
  el: any
}

export const DevelopmentPost: FC<DevelopmentPostProps> = ({
  description,
  priority,
  development_title,
  status,
  userId,
  creation_date,
  created_by_type,
  categoryid,
  timeline,
  attachments,
  access, id,
  setDevelopment,
  el
}) => {
  const dispatch = cusDispatch();
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [addMileStone, setAddMileStone] = useState(false);
  const { userDetails } = cusSelector((state) => state.auth);
  const deletehandler = async () => {
    tryCatch(
      async () => {
        const response = await deleteDevelopment(id, userDetails?.leaderId as string);
        if (response?.success) {
          const agendaData = await getDevelopment(userDetails?.leaderId as string);
          dispatch(developmentAction.storeDevelopments(agendaData))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    )
  }
  const posthandler = async () => {
    tryCatch(
      async () => {
        const response = await makeDevelopmentPost(id, userDetails?.leaderId as string);
        if (response?.success) {
          const agendaData = await getDevelopment(userDetails?.leaderId as string);
          dispatch(developmentAction.storeDevelopments(agendaData))
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  }


  return (
    <>
      <article className="border bg-white rounded-md relative flex items-start max-[700px]:flex-col">
        {priority && (
          <h3
            className={`self-stretch uppercase border flex flex-col-reverse justify-evenly items-center px-[10px] text-[18px] max-[700px]:flex-row max-[700px]:justify-around max-[700px]:py-1 min-[700px]:py-3 ${PRIORITIES[priority as PRIORITY].classes
              } `}
          >
            {PRIORITIES[priority as PRIORITY].name.split("").map((el, i) => (
              <span className="min-[700px]:-rotate-90" key={i}>
                {el}
              </span>

            ))}
          </h3>
        )}

        <section className="flex flex-col w-full">
          <div className="flex items-center gap-3 py-3 px-5 text-sky-950 border-b max-[650px]:flex-wrap">
            {/* Info and date of publish */}
            <div>
              <h4 className="font-[600] text-lg text-orange-500">Created by : {created_by_type}</h4>
              <p className="flex items-center capitalize gap-2 text-sm font-[500]">
                <span>created date: {moment(creation_date).format("YYYY-MM-DD")}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center ml-auto gap-5 max-[700px]:flex-col-reverse max-[700px]:items-end">
              <label
                className={`ml-auto border text-[13px] rounded-full px-5 py-[2px] uppercase `}
              >
                {status}
              </label>

              <button
                className="relative"
                id="moreOptions"
                onClick={() => setShowMorePostOptions((lst) => !lst)}
              >
                {showMorePostOptions ? <GrClose /> : <BsThreeDots className="text-2xl" />}

                {showMorePostOptions && (
                  <AgendaOptions
                    deleteAgendaHandler={() => deletehandler()}
                    editAgendaHandler={() =>
                      setDevelopment({
                        description,
                        priority,
                        development_title,
                        status,
                        created_by_type,
                        categoryid,
                        timeline, access,
                        attachments,
                        id
                      })
                    }
                    onClose={() => setShowMorePostOptions(false)}
                    postAgendaHandler={() => posthandler()}
                    ispost={el?.make_post}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Agenda */}
          <div className="py-5 flex flex-col gap-4 px-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium capitalize flex items-center justify-between gap-3">
                {development_title}
                <button
                  onClick={() => setShowTimeline(true)}
                  className="hover:text-orange-500 underline text-sm capitalize"
                >
                  {timeline?.length != 0 ? "timeline" : "add timeline"}
                </button>
              </h2>
              <p
                className="text-[15px]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </section>
      </article>
      <AnimatePresence mode="wait">
        {showTimeline && (
          <DevelopmentTimeLine
            timeline={timeline}
            onClose={() => setShowTimeline(false)}
            onAddMileStone={() => { setShowTimeline(false), setAddMileStone(true) }}
            developmentid={id}
            title={development_title}
            status={status}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {addMileStone && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""}`}  >
            <div className='bg-black bg-opacity-20 backdrop-blur-[2px] w-full h-full main_scrollbar overflow-y-scroll'>
              <m.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                className='m-auto my-5 bg-white relative overflow-hidden rounded shadow-md w-[40%] max-[1600px]:w-1/2 max-[1050px]:w-[70%] max-[750px]:w-[85%] max-[600px]:w-[95%] max-[600px]:my-3'>
                <button
                  type='button'
                  onClick={() => setAddMileStone(false)}
                  className='absolute top-3 right-3 z-40'>
                  <BiX className='text-3xl' />
                </button>
                <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-5 border-b font-semibold text-2xl capitalize'>
                  Add Milestone
                </h3>
                <div className="py-5 px-5">
                  <TimeLineForm isedit={false} developmentid={id} data={null} onCancel={() => setAddMileStone(false)} />
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
