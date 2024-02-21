"use client";
import { FC, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PostOptions } from "./PostOptions";
import {
  AGENDA_STATUS,
  AGENDA_VAL,
  PRIORITIES,
  PRIORITY,
  dateConverter,
  userImg,
} from "@/utils/utility";
import { AgendaDetails } from "@/redux_store/agenda/agendaSlice";
import { DevelopmentAgendaTimeLine } from "./DevelopmentAgendaTimeLine";
import { AnimatePresence } from "framer-motion";
import { MdTimeline } from "react-icons/md";
import CustomImage from "@/utils/CustomImage";
import moment from 'moment'
interface AgendaPostProps extends AgendaDetails {
  userId: string;
}

export const AgendaPost: FC<AgendaPostProps> = ({
  description,
  priority,
  title,
  status,
  userId,
  created_date,
  created_by_type,
  timeline
}) => {


  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const deletehandler = () => {
    
  }

  return (
    <>
      <article className="border bg-white gap-5 rounded-md relative flex items-start overflow-hidden max-[700px]:flex-col">
        <h3
          className={`self-stretch uppercase border flex flex-col-reverse justify-evenly items-center px-[10px] text-[18px] max-[700px]:flex-row max-[700px]:justify-around max-[700px]:py-1 min-[700px]:py-3 ${
            PRIORITIES[priority as PRIORITY].classes
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
                <span>created an agenda: {moment(created_date).format("YYYY-MM-DD")}</span>
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
                <BsThreeDots className="text-2xl" />

                {showMorePostOptions && (
                  <PostOptions
                    deletePostHandler={() => deletehandler()}
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
                  {timeline?.length != 0? "timeline" : "add timeline"} 
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
          <DevelopmentAgendaTimeLine
            timeline={timeline}
            onClose={() => setShowTimeline(false)}
            title={title}
          />
        )}
      </AnimatePresence>
    </>
  );
};
