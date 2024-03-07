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
import DevelopmentEditForm from "./EditForm";
import { DevelopmentTimeLine } from "./TimeLine";
interface DevelopmentPostProps extends DevelopmentDetails {
  userId: string;
  timeline: TimeLineDetails[]
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
  access, id
}) => {
  const dispatch = cusDispatch();
  const [isDevelopment, setIsDevelopment] = useState(false);
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
          onCancel()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      }
    )
  }
  const edithandler = () => {
    setIsDevelopment(true)
  }

  const onCancel = () => {
    setIsDevelopment(false);
  };
  const posthandler = async () => {
    tryCatch(
      async () => {
        const response = await makeDevelopmentPost(id, userDetails?.leaderId as string);
        if (response?.success) {
          const agendaData = await getDevelopment(userDetails?.leaderId as string);
          dispatch(developmentAction.storeDevelopments(agendaData))
          onCancel()
          dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
        } else {
          dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
        }
      })
  }


  return (
    <>
      <article className="border bg-white gap-5 rounded-md relative flex items-start overflow-hidden max-[700px]:flex-col">
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

        <section className="flex flex-col pr-5 w-full max-[700px]:px-5">
          <div className="flex items-center gap-3 py-4 text-sky-950 border-b max-[650px]:flex-wrap">


            {/* Info and date of publish */}
            <div>
              <h4 className="font-[600] text-lg text-orange-500">Created by : {created_by_type}</h4>
              <p className="flex items-center capitalize gap-2 text-sm font-[500]">
                <span>created an development: {moment(creation_date).format("YYYY-MM-DD")}</span>
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
                    editAgendaHandler={() => edithandler()}
                    onClose={() => setShowMorePostOptions(false)}
                    postAgendaHandler={() => posthandler()}
                    userId={userId}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Agenda */}
          <div className="py-5 flex flex-col gap-4">
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
        {isDevelopment && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
              }`}
          >
            <div
              className="bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20"
              onClick={onCancel}
            />
            <m.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center"
            >
              <h2 className="mt-4 mb-8 text-3xl">Edit Development</h2>

              <DevelopmentEditForm data={{
                description,
                priority,
                development_title,
                status,
                created_by_type,
                categoryid,
                timeline, access, attachments, id
              }} onCancel={onCancel} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showTimeline && (
          <DevelopmentTimeLine
            timeline={timeline}
            onClose={() => setShowTimeline(false)}
            onAddMileStone={() => { setShowTimeline(false), setAddMileStone(true) }}
            developmentid={id}
            title={development_title}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {addMileStone && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
              }`}
          >
            <div
              className="bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20"
              onClick={() => setAddMileStone(false)}
            />
            <m.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center"
            >
              <h2 className="mt-4 mb-8 text-3xl">Add Milestone</h2>

              <TimeLineForm isedit={false} developmentid={id} data={null} onCancel={() => setAddMileStone(false)} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
