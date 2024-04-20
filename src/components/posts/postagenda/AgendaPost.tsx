"use client";
import { FC, useState } from "react";
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

interface AgendaPostProps {
  userdetails: any;
  post: any;
  type: string;
  index: string,
}

export const AgendaPost: FC<AgendaPostProps> = ({ userdetails, post, type, index }) => {
  const [showTimeline, setShowTimeline] = useState(false);
  var status = post?.status === 'not started yet' ? '2' : post?.status === 'in progress' ? '1' : '0'
  var title = type == "developments" ? post?.development_title : post?.title


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
          <Link href={window.location?.origin + `/user/leader/about?id=${post?.leaderid}`}
            className="flex items-center pr-5 gap-3 py-4 px-5 text-sky-950 border-b max-[650px]:flex-wrap">
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
                {userdetails?.name}
              </h4>
              <p className="flex items-center capitalize gap-2 text-sm font-[500]">
                <span>
                  Published on:{" "}{dateConverter(post?.createddate)}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center ml-auto gap-5 max-[700px]:flex-col-reverse max-[700px]:items-end">
              <label className={`ml-auto border text-[13px] rounded-full px-5 py-[2px] uppercase ${AGENDA_STATUS[status as AGENDA_VAL].classes}`}>
                {AGENDA_STATUS[status as AGENDA_VAL].name}
              </label>
            </div>
          </Link>

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
