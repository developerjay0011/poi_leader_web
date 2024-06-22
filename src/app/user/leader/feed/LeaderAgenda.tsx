"use client";
import { FC, useState } from "react";
import { AGENDA_STATUS, AGENDA_VAL, PRIORITIES, PRIORITY, dateConverter, } from "@/utils/utility";
import { AgendaDetails } from "@/redux_store/agenda/agendaSlice";
import { AnimatePresence } from "framer-motion";
import { TimeLineDetails } from "@/utils/typesUtils";
import { DevelopmentAgendaTimeLine } from "@/components/posts/postagenda/DevelopmentAgendaTimeLine";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
interface AgendaPostProps extends AgendaDetails {
  userId: string;
  timeline: TimeLineDetails[]
  setAgenda: any,
  Agenda: any,
  el: any,
  userdetails: any
}

export const AgendaDevelopmentsPost: FC<AgendaPostProps> = ({
  description,
  priority,
  title,
  status,
  creation_date,
  timeline,
  userdetails
}) => {
  const [showTimeline, setShowTimeline] = useState(false);
  var substatus = status === 'not started yet' ? '2' : status === 'in progress' ? '1' : '0'


  return (
    <>
      <article className="border bg-white rounded-md relative flex items-start max-[450px]:flex-col">
        <h3 className={`self-stretch uppercase border flex flex-col-reverse justify-evenly items-center px-[10px] text-[18px] max-[700px]:flex-row max-[700px]:justify-around max-[700px]:py-1 min-[700px]:py-3 ${PRIORITIES[priority as PRIORITY]?.classes} `}>
          {PRIORITIES[priority as PRIORITY]?.name?.split("")?.map((el, i) => (
            <span className="min-[700px]:-rotate-90" key={i}>
              {el}
            </span>
          ))}
        </h3>

        <section className="flex flex-col max-[450px]:px-3 w-[100%]">
          <div className="flex items-center gap-3 py-3 px-5 text-sky-950 border-b max-[650px]:flex-wrap">
            <CustomImage
              src={getImageUrl(userdetails?.image)}
              alt="user pic"
              className="w-12 aspect-square object-cover object-center rounded-full"
              width={100}
              height={100}
            />
            {/* Info and date of publish */}
            <div>
              <h4 className="font-[600] text-lg text-orange-500">
                {userdetails?.personal_info?.last_name && userdetails?.personal_info?.first_name ? userdetails?.personal_info?.first_name + " " + userdetails?.personal_info?.last_name : userdetails?.personal_info?.first_name}
              </h4>
              <p className="flex items-center capitalize gap-2 text-sm font-[500]">
                <span>
                  Published on:{" "}{dateConverter(creation_date)}
                </span>
              </p>
            </div>

            <div className="flex items-center ml-auto gap-5 max-[700px]:flex-col-reverse max-[700px]:items-end">
              <label className={`ml-auto border text-[13px] rounded-full px-5 py-[2px] uppercase ${AGENDA_STATUS[substatus as AGENDA_VAL]?.classes}`}>
                {AGENDA_STATUS[substatus as AGENDA_VAL]?.name}
              </label>
            </div>
          </div>

          <div className="py-5 flex flex-col gap-4 pr-5 px-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium capitalize flex items-center justify-between gap-3">
                {title}
                {timeline?.length > 0 &&
                  <button onClick={() => setShowTimeline(true)} className="hover:text-orange-500 underline text-sm capitalize">
                    timeline
                  </button>
                }
              </h2>
              <p
                className="text-[15px]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </section>
      </article >



      <AnimatePresence mode="wait">
        {showTimeline && (
          <DevelopmentAgendaTimeLine
            onClose={() => setShowTimeline(false)}
            title={title}
            timeline={timeline}
            status={status === 'not started yet' ? '0' : status === 'in progress' ? '1' : '2'}
          />
        )}
      </AnimatePresence >
    </>
  );
};
