"use client";
import { useEffect, useState } from "react";
import { DevelopmentPost } from "@/components/posts/development/Post";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { getCategory } from "@/redux_store/agenda/agendaApi";
import { AGENDA_STATUS, AGENDA_VAL } from "@/utils/utility";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { agendaAction } from "@/redux_store/agenda/agendaSlice";
import { getDevelopment } from "@/redux_store/development/developmentApi";
import { developmentAction } from "@/redux_store/development/developmentSlice";
import DevelopmentForm from "@/components/posts/development/Form";
import { ProfileShortcutsBox } from "@/components/timlineComponents/ProfileShortcutsBox";
import { BiX } from "react-icons/bi";
import { Datanotfound } from "@/utils/Datanotfound";
import { PeoplesComponentWrapper } from "@/utils/PeoplesComponentWrapper";

const AdminDevelopmentPage = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAgenda, setIsAgenda] = useState(false);
  const [development, setDevelopment] = useState({});

  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((st) => st.auth);
  const { categories } = cusSelector((st) => st.agenda);
  const { developments } = cusSelector((st) => st.development);
  useEffect(() => {
    (async () => {
      const data = await getDevelopment(userDetails?.leaderId as string);
      dispatch(developmentAction.storeDevelopments(data))
      const categories = await getCategory(userDetails?.leaderId as string);
      dispatch(agendaAction.storeCategories(categories))
    })()
  }, [dispatch, userDetails?.leaderId]);

  const filterDataOnPriority = developments?.filter((el) =>
    priorityFilter ? el.priority === priorityFilter : el
  );

  const filterDataOnStatus = filterDataOnPriority?.filter((el) =>
    statusFilter ? el.status === statusFilter : el
  );

  const filterData = filterDataOnStatus?.filter((el) =>
    categoryFilter ? el.categoryid === categoryFilter : el
  );

  const developmentJSX = filterData?.map((el) => (
    <DevelopmentPost
      setDevelopment={(data: any) => {
        setDevelopment(data);
        setIsAgenda(true)
      }}
      userId={el.id}  {...el} key={el.id} el={el} />
  ));

  const onCancel = () => {
    setIsAgenda(false);
  };

  return (
    <>
      <div className="flex gap-5 w-full">
        <ProfileShortcutsBox />
        <section className="flex-1">
          <PeoplesComponentWrapper
            heading='Development'
            searchStr={''}
            setSearchStr={''}
            rightButton={
              <div className="flex items-center justify-end">
                <button
                  className={`flex items-center gap-2 self-right text-sm transition-all px-3 py-1 rounded-[5px] capitalize bg-orange-500 text-orange-50 hover:text-orange-500 hover:bg-orange-100 hover:font-medium`}
                  onClick={() => { setDevelopment({}); setIsAgenda(true) }}
                >
                  Add Development
                </button>
              </div>
            }
          >
            <section className="flex flex-col gap-8 max-[450px]:px-3">
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
              {filterData?.length > 0 ?
                <ul className='grid min-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5'>
                  {developmentJSX}
                </ul>
                :
                <Datanotfound name={"Development"} />

              }
            </section>
          </PeoplesComponentWrapper>
        </section>

        <AnimatePresence mode="wait">
          {isAgenda && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
                }`}
            >
              <div className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center main_scrollbar`}>
                <m.section
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  className='z-30  border self-start bg-white mt-10 relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
                  <button
                    type='button'
                    onClick={onCancel}
                    className='absolute top-3 right-3 z-40'>
                    <BiX className='text-3xl' />
                  </button>
                  <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
                    Add Development
                  </h3>
                  <DevelopmentForm
                    onCancel={onCancel}
                    development={development}
                  />
                </m.section>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AdminDevelopmentPage;
