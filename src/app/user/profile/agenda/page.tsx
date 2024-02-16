"use client";
import { useEffect, useState } from "react";
import { AgendaPost } from "@/components/posts/AgendaPost";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { fetchAllAgendas } from "@/redux_store/agenda/agendaApi";
import { AGENDA_STATUS, AGENDA_VAL } from "@/utils/utility";
import { ShortcutsBox } from "@/components/timlineComponents/ShortcutsBox";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import AgendaForm from "@/components/posts/AgendaForm";

const AdminAgendaPage = () => {
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAgenda, setIsAgenda] = useState(false);

  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((st) => st.auth);
  const { categories, agendas } = cusSelector((st) => st.agenda);

  useEffect(() => {
    dispatch(fetchAllAgendas(userDetails?.id as string));
  }, [userDetails, dispatch]);

  const filterDataOnPriority = agendas.filter((el) =>
    priorityFilter ? el.priority === priorityFilter : el
  );

  const filterDataOnStatus = filterDataOnPriority.filter((el) =>
    statusFilter ? el.status === statusFilter : el
  );

  const filterData = filterDataOnStatus.filter((el) =>
    categoryFilter ? el.category === categoryFilter : el
  );

  console.log(filterData);

  const data = [
    {
      access: "public",
      attachments: "1233",
      category: "leader",
      createDate: "12",
      description: "bsdjhb ihfsnd sjh ifs   , hg b",
      documents: "1234dcfd",
      priority: "high",
      status: "1",
      title: "titalbgdkjsd135",
      id: "13sdsdfs31",
    },
  ];

  /* const agendaJSX =
    filterData.length > 0 &&
    filterData.map((el) => <AgendaPost userId={el.id} {...el} key={el.id} />) */

  const agendaJSX = data.map((el) => (
    <AgendaPost userId={el.id} {...el} key={el.id} />
  ));

  const onCancel = () => {
    setIsAgenda(false);
  };

  return (
    <>
      <div className="flex gap-5 w-full">
        <div className="sticky top-0 left-0 self-start max-[1000px]:hidden w-max">
          <ShortcutsBox />
        </div>

        <section className="border bg-white shadow-sm flex flex-col rounded-md flex-1">
          <section className="flex justify-between flex-col">
            <div className="flex justify-between">
              <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize">
                Agendas
              </h2>
            </div>

            <div className="w-[96%] h-[1px] bg-zinc-200 m-auto" />

            <section className="px-7 py-8 flex flex-col gap-8 max-[450px]:px-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 max-[750px]:flex-wrap">
                  <p className="font-semibold text-lg">Filters</p>

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
                      {categories.map((el) => (
                        <option key={el._id} value={el._id}>
                          {el.category_name}
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
                <button
                  className={`text-sm mt-5 transition-all px-5 py-1 rounded-full capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                  onClick={() => setIsAgenda(true)}
                >
                  Add Agenda
                </button>
              </div>
              {agendaJSX}
            </section>
          </section>
        </section>
        <AnimatePresence mode="wait">
          {isAgenda && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${
                false ? "cursor-not-allowed" : ""
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
                <h2 className="mt-4 mb-8 text-3xl">Add Directory</h2>

                <AgendaForm onCancel={onCancel} />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AdminAgendaPage;
