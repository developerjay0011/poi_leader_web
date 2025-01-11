'use client'
import { FC, useEffect, useState } from 'react'
import { TableWrapper, searchFilterFunction } from '@/utils/TableWrapper'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { Savedby, statusticketOption } from '@/constants/common'
import { getTickets } from '@/redux_store/ticket/ticketApi'
import { ticketActions } from '@/redux_store/ticket/ticketSlice'
import { ManageTicketTable } from '@/components/ticket/ManageTicketTable'
import { TicketForm } from '../forms/TicketForm'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Shortarray } from '@/components/Input'

export const TicketTemplateManagePage: FC = () => {
    const dispatch = cusDispatch();
    const searchParams = useSearchParams();
    const [showTicket, setShowTicket] = useState(false)
    const [ischecked, setIschecked] = useState<any>([])
    const [searchFilter, setSearchFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)
    const changeFilterData = (str: string) => setSearchFilter(str)
    const { ticket } = cusSelector((state) => state.ticket);
    const { leaderOptions } = cusSelector((state) => state.common);
    const { userDetails } = cusSelector((st) => st.auth);
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }

    const getTicket = async () => {
        const data = await getTickets(userDetails?.leaderId as string);
        dispatch(ticketActions.storeTicket(data));
    };
    useEffect(() => {
        (async () => {
            getTicket();
        })();
    }, [userDetails, dispatch]);
    const handleFilter = (ticket: any, statusFilter: any, categoryFilter: any, locationFilter: any) => {
        var filteredResult = Array.isArray(ticket) ? [...ticket] : []
        if (filteredResult?.length > 0) {
            if (statusFilter !== '') {
                filteredResult = filteredResult?.filter(item => item?.status?.slice(-1).pop()?.status === statusFilter);
            }
            if (categoryFilter !== '') {
                filteredResult = filteredResult?.filter(item => item?.category === categoryFilter);
            }
            if (locationFilter !== '') {
                filteredResult = filteredResult?.filter(item => item?.citizen_detail?.citizen_stateid === locationFilter);
            }
        }

        return Array.isArray(ticket) ? searchFilterFunction(searchFilter, filteredResult, "ticket_code", { curPageNo, filterDataCount }) : { mainlist: [], filterlist: [] }
    };




    return (
        <>
            <div className='bg-white border shadow-sm m-5 rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                <TableWrapper
                    heading='Manage Ticket'
                    addBtnTitle='add Ticket'
                    addBtnClickFn={() => { setShowTicket(true) }}
                    curDataCount={1}
                    totalCount={handleFilter(ticket, statusFilter, categoryFilter, locationFilter)?.mainlist?.length}
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
                                    className="py-1 px-1 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
                                >
                                    <option value="">All</option>
                                    {Shortarray(leaderOptions?.categories, "category")?.map((item: any) =>
                                        <option value={item?.category}>{item?.category}</option>
                                    )}
                                </select>
                            </label>
                            <label className="flex gap-2 items-center" htmlFor="status">
                                <span className="font-medium">Status</span>
                                <select
                                    id="status"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="py-1 px-1 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
                                >
                                    <option value="">All</option>
                                    {Shortarray(statusticketOption)?.map((item: any) =>
                                        <option value={item?.id}>{item?.value}</option>
                                    )}
                                </select>
                            </label>
                            <label className="flex gap-2 items-center" htmlFor="status">
                                <span className="font-medium">Location</span>
                                <select
                                    id="status"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="py-1 px-1 text-md border border-gray-300 text-gray-900 bg-white rounded-md capitalize cursor-pointer"
                                >
                                    <option value="">All</option>
                                    {leaderOptions?.states?.length > 0 &&
                                        Shortarray(leaderOptions?.states, "state")?.map((item: any) =>
                                            <option value={item?.id}>{item?.state}</option>
                                        )}
                                </select>
                            </label>
                        </>
                    }
                >
                    <ManageTicketTable
                        handleDelete={(id) => { }}
                        handleEdit={(value) => { }}
                        searchStr={searchFilter}
                        ticket={handleFilter(ticket, statusFilter, categoryFilter, locationFilter)?.filterlist || []}
                        ischecked={ischecked}
                        alldata={ticket}
                        setIschecked={setIschecked}
                        curPageNo={curPageNo}
                        filterDataCount={filterDataCount}
                    />
                </TableWrapper>
            </div>
            {showTicket &&
                <TicketForm
                    heading="New Ticket"
                    onClose={() => setShowTicket(false)}
                    edit={false}
                    submitting={() => { getTicket() }}
                />
            }
        </>
    )
}


