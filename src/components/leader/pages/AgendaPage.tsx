"use client";
import { FC, useEffect, useState } from "react";
import { AgendaPost } from "@/components/posts/agenda/AgendaPost";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { getAgenda, getCategory } from "@/redux_store/agenda/agendaApi";
import { AGENDA_STATUS, AGENDA_VAL } from "@/utils/utility";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import AgendaForm from "@/components/posts/agenda/AgendaForm";
import { agendaAction } from "@/redux_store/agenda/agendaSlice";
import { ProfileShortcutsBox } from "@/components/timlineComponents/ProfileShortcutsBox";
import { BiX } from "react-icons/bi";
import { Datanotfound } from "@/utils/Datanotfound";
import { PeoplesComponentWrapper } from "@/utils/PeoplesComponentWrapper";
import { Modal } from "@/components/modal/modal";

export const AgendaPage: FC = () => {
    const dispatch = cusDispatch();
    const [categoryFilter, setCategoryFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isAgenda, setIsAgenda] = useState(false);
    const [Agenda, setAgenda] = useState({}) as any
    const { userDetails } = cusSelector((st) => st.auth);
    const { categories, agendas } = cusSelector((st) => st.agenda);
    const filterDataOnPriority = agendas?.filter((el) => priorityFilter ? el.priority === priorityFilter : el);
    const filterDataOnStatus = filterDataOnPriority?.filter((el) => statusFilter ? el.status === statusFilter : el);
    const filterData = filterDataOnStatus?.filter((el) => categoryFilter ? el.categoryid === categoryFilter : el);
    const onCancel = () => { setIsAgenda(false); };
    useEffect(() => {
        (async () => {
            const data = await getAgenda(userDetails?.leaderId as string);
            dispatch(agendaAction.storeAgendas(data))
            const categories = await getCategory(userDetails?.leaderId as string);
            dispatch(agendaAction.storeCategories(categories))
        })()
    }, [dispatch, userDetails?.leaderId]);



    const agendaJSX = filterData?.map((el) => (
        <AgendaPost
            userId={el.id}
            setAgenda={(data: any) => { setAgenda(data); setIsAgenda(true) }}
            Agenda={Agenda}
            {...el}
            key={el.id}
            el={el}
        />
    ));


    return (
        <>
            <PeoplesComponentWrapper
                heading='Agenda'
                searchStr={''}
                setSearchStr={''}
                rightButton={
                    <div className="flex items-center justify-end">
                        <button
                            className={`flex items-center gap-2 self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                            onClick={() => { setAgenda({}); setIsAgenda(true) }}
                        >
                            Add Agenda
                        </button>
                    </div>
                }
            >
                <section className="flex flex-col gap-8 max-[450px]:px-3">
                    <div className="flex flex-col w-full gap-2">
                        <p className="font-semibold text-lg">Filters</p>
                        <div className="flex items-center w-full gap-3 max-[750px]:flex-wrap">

                            <label className="flex gap-2 items-center" htmlFor="priority">
                                <span className="font-medium">Priority</span>
                                <select
                                    id="priority"
                                    value={priorityFilter}
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
                                >
                                    <option value="">All</option>
                                    <option value="low">low</option>
                                    <option value="moderate">moderate</option>
                                    <option value="high">high</option>
                                </select>
                            </label>

                            <label className="flex gap-2 items-center" htmlFor="category">
                                <span className="font-medium">Category</span>
                                <select
                                    id="category"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
                                >
                                    <option value="">All</option>
                                    {categories?.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.category}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex gap-2 items-center" htmlFor="status">
                                <span className="font-medium">Status</span>
                                <select
                                    id="status"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
                                >
                                    <option value="">All</option>
                                    {Object.keys(AGENDA_STATUS).map((el) => (
                                        <option value={el} key={el}>
                                            {AGENDA_STATUS[el as AGENDA_VAL].name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                    {filterData?.length > 0 ?
                        <ul className='max-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5'>
                            {agendaJSX}
                        </ul>
                        :
                        <Datanotfound name={"Agenda"} />
                    }
                </section>
            </PeoplesComponentWrapper>
            {isAgenda && (
                <Modal heading={Agenda?.id as string ? "Edit Agenda" : "Add Agenda"} onClose={onCancel}>
                    <AgendaForm onCancel={onCancel} Agenda={Agenda} />
                </Modal >
            )}
        </>
    );
};
