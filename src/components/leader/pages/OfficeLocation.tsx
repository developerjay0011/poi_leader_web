'use client'
import { FC, useEffect, useState } from 'react'
import { TableWrapper, searchFilterFunction } from '@/utils/TableWrapper'

import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { OfficelocationTable } from '../officelocation/OfficelocationTable'
import { OfficeLocationForm } from '../forms/OfficeLocationForm'
import { GetOfficeLocations } from '@/redux_store/location/locationApi'
import { locationAction } from '@/redux_store/location/locationSlice'

export const OfficeLocation: FC = () => {
    const dispatch = cusDispatch();
    const [showAdd, setShowAdd] = useState(false)
    const [isEdit, setEdit] = useState<any>();
    const [searchFilter, setSearchFilter] = useState('');
    const [curPageNo, setCurPageNo] = useState(1)
    const [filterDataCount, setFilterAmount] = useState(5)
    const changeFilterData = (str: string) => setSearchFilter(str)
    const { location } = cusSelector((state) => state.location);
    const { userDetails } = cusSelector((state) => state.auth);
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }
    const GetofficeLocations = async () => {
        if (userDetails?.leaderId) {
            const OfficeLocations = await GetOfficeLocations(userDetails?.leaderId);
            if (Array.isArray(OfficeLocations)) {
                dispatch(locationAction.storeLocation(OfficeLocations));
            }
        }
    };

    useEffect(() => {
        (async () => {
            await GetofficeLocations();
        })();
    }, [userDetails?.leaderId, dispatch]);

    // handleFilter(ticket, statusFilter, categoryFilter, locationFilter)?.mainlist?.length

    return (
        <>
            <div className='bg-white border shadow-sm m-5 rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                <TableWrapper
                    heading='Manage Office Location'
                    addBtnTitle='add Location'
                    addBtnClickFn={() => { setEdit(null); setShowAdd(true) }}
                    curDataCount={1}
                    totalCount={searchFilterFunction(searchFilter, location, "location", { curPageNo, filterDataCount })?.mainlist?.length}
                    changeFilterFn={changeFilterCount}
                    filterDataCount={filterDataCount}
                    changePageNo={changeCurPageNo}
                    curPageNo={curPageNo}
                    searchFilterFn={changeFilterData}
                    jsonDataToDownload={null}
                >
                    <OfficelocationTable
                        handleEdit={(value) => { setShowAdd(true), setEdit(value) }}
                        searchStr={searchFilter}
                        GetofficeLocations={GetofficeLocations}
                        curPageNo={curPageNo}
                        filterDataCount={filterDataCount}
                        locations={searchFilterFunction(searchFilter, location, "location", { curPageNo, filterDataCount })?.filterlist}
                    />
                </TableWrapper>
            </div>
            {showAdd && (
                <OfficeLocationForm
                    edit={isEdit?.id}
                    heading={isEdit?.id ? 'Edit Location' : 'Add Location'}
                    details={isEdit}
                    submitting={false}
                    onClose={() => setShowAdd(false)}
                    GetofficeLocations={GetofficeLocations}
                />
            )}
        </>
    )
}


