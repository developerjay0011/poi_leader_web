'use client'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { ManageTemplateForm } from '../forms/TemplateForm'
import { TableWrapper } from '@/utils/TableWrapper'
import { ManageTemplateTable } from '../letter/ManageTemplateTable'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deleteLetterTemplates, getLetterTemplates } from '@/redux_store/letter/letterApi'
import { tryCatch } from '@/config/try-catch'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType, statusticketOption } from '@/constants/common'
import { getTickets } from '@/redux_store/ticket/ticketApi'
import { ticketActions } from '@/redux_store/ticket/ticketSlice'
import { ManageTicketTable } from '@/components/ticket/ManageTicketTable'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'

export const TicketTemplateManagePage: FC = () => {
    const dispatch = cusDispatch();
    const [showAddTemplateForm, setShowAddTemplateForm] = useState(false)
    const [searchFilter, setSearchFilter] = useState('');
    const [isEdit, setEdit] = useState<any>();
    const { leaderProfile } = cusSelector((state) => state.leader);
    const { ticket, ticketcategory } = cusSelector((state) => state.ticket);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)
    const changeFilterData = (str: string) => setSearchFilter(str)
    const { userDetails } = cusSelector((st) => st.auth);
    const openModal = () => { setShowAddTemplateForm(true); setEdit(null) };
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }
    const getTicket = async () => {
        const data = await getTickets(userDetails?.leaderId as string);
        dispatch(ticketActions.storeTicket(data));
    };
    const handleTemplateDelete = async (id: string) => {
        tryCatch(
            async () => {
                const response = await deleteLetterTemplates(id, leaderProfile.id as string);
                if (response?.success) {
                    getTicket()
                    dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
                } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
                }
            })

    }
    useEffect(() => {
        (async () => {
            getTicket();
        })();
    }, [userDetails, dispatch, leaderProfile]);


    return (
        <>
            <div className='bg-white border shadow-sm m-5 rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                <TableWrapper
                    heading='Manage Ticket'
                    addBtnTitle=''
                    addBtnClickFn={openModal}
                    curDataCount={1}
                    totalCount={ticket?.length}
                    changeFilterFn={changeFilterCount}
                    filterDataCount={filterDataCount}
                    changePageNo={changeCurPageNo}
                    curPageNo={curPageNo}
                    searchFilterFn={changeFilterData}
                    jsonDataToDownload={ticket}
                    addedFilters={
                        <>
                            <label className="flex gap-2 items-center" htmlFor="category">
                                <span className="font-medium">Category</span>
                                <select
                                    id="category"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
                                >
                                    <option value="">All</option>
                                    {ticketcategory?.map((item: any) =>
                                        <option value={item?.id}>{item?.category}</option>
                                    )}
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
                                    {statusticketOption?.map((item: any) =>
                                        <option value={item?.id}>{item?.value}</option>
                                    )}
                                </select>
                            </label>
                        </>
                    }
                >
                    <>

                        <ManageTicketTable handleDelete={(id) => { handleTemplateDelete(id) }} handleEdit={(value) => { setShowAddTemplateForm(true), setEdit(value) }} searchStr={searchFilter} />
                    </>
                </TableWrapper>
            </div>


            <AnimatePresence>
                {showAddTemplateForm && (
                    <ManageTemplateForm
                        isEdit={isEdit}
                        err={"err"}
                        heading={isEdit ? 'Edit Template' : 'Add Template'}
                        status='1'
                        submitting={false}
                        submitHandler={() => { }}
                        tempHeader=''
                        onClose={() => setShowAddTemplateForm(false)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}


