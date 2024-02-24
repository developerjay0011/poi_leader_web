"use client";
import { FC, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AgendaOptions } from "./AgendaOptions";
import { GrClose } from "react-icons/gr";
import {
  AGENDA_STATUS,
  AGENDA_VAL,
  PRIORITIES,
  PRIORITY,
  dateConverter,
  userImg,
} from "@/utils/utility";
import { AgendaDetails, agendaAction } from "@/redux_store/agenda/agendaSlice";
import { DevelopmentAgendaTimeLine } from "./DevelopmentAgendaTimeLine";
import { AnimatePresence } from "framer-motion";
import { MdTimeline } from "react-icons/md";
import CustomImage from "@/utils/CustomImage";
import moment from 'moment'
import { TimeLineDetails } from "@/utils/typesUtils";
import { motion as m } from "framer-motion";
import AgendaEditForm from "@/components/posts/AgendaEditForm";
import { deleteAgenda, getAgenda } from "@/redux_store/agenda/agendaApi";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import toast from "react-hot-toast";
import TimeLineForm from "./TineLineForm";
interface AgendaPostProps extends AgendaDetails {
  userId: string;
  timeline: TimeLineDetails[]
}

export const AgendaPost: FC<AgendaPostProps> = ({
  description,
  priority,
  title,
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
  const [isAgenda, setIsAgenda] = useState(false);
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [addMileStone, setAddMileStone] = useState(false);

  const { leaderProfile } = cusSelector((state) => state.leader);
  const deletehandler = async() => {
    try {
      const Data = await deleteAgenda(id, leaderProfile?.id as string);
      if (Data?.success) {
        toast.success(() => (
          <p>
            {Data?.message}
          </p>
        ));
        const agendaData = await getAgenda(leaderProfile?.id as string);
        dispatch(agendaAction.storeAgendas(agendaData))
        onCancel()
      }
      console.log("Data", Data)
    } catch (error) {
      console.log(error);

    }
  }
  const edithandler = () => {
    setIsAgenda(true)
  }

  const onCancel = () => {
    setIsAgenda(false);
  };
  return (
    <>
      <article className="border bg-white gap-5 rounded-md relative flex items-start overflow-hidden max-[700px]:flex-col">
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
      
        <section className="flex flex-col pr-5 w-full max-[700px]:px-5">
          <div className="flex items-center gap-3 py-4 text-sky-950 border-b max-[650px]:flex-wrap">


            {/* Info and date of publish */}
            <div>
              <h4 className="font-[600] text-lg text-orange-500">Created by : {created_by_type}</h4>
              <p className="flex items-center capitalize gap-2 text-sm font-[500]">
                <span>created an agenda: {moment(creation_date).format("YYYY-MM-DD")}</span>
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
                {showMorePostOptions ? <GrClose /> : <BsThreeDots className="text-2xl" /> }  

                {showMorePostOptions && (
                  <AgendaOptions
                    deleteAgendaHandler={() => deletehandler()}
                    editAgendaHandler={() => edithandler()}
                    onClose={() => setShowMorePostOptions(false)}
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
                {title}
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
        {isAgenda && (
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
              <h2 className="mt-4 mb-8 text-3xl">Edit Agenda</h2>

              <AgendaEditForm data={{
                description,
                priority,
                title,
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
          <DevelopmentAgendaTimeLine
            timeline={timeline}
            onClose={() => setShowTimeline(false)}
            onAddMileStone={() =>{ setShowTimeline(false) ,setAddMileStone(true)}}
            agendaid={id}
            title={title}
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
              onClick={()=>setAddMileStone(false)}
            />
            <m.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center"
            >
              <h2 className="mt-4 mb-8 text-3xl">Add Milestone</h2>

              <TimeLineForm isedit={false} agendaid={id} data={null} onCancel={() => setAddMileStone(false)} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
