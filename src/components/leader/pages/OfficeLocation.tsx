'use client'
import { FC, useEffect, useState } from 'react'
import { TableWrapper } from '@/utils/TableWrapper'

import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { OfficelocationTable } from '../officelocation/OfficelocationTable'
import { OfficeLocationForm } from '../forms/OfficeLocationForm'
import { GetOfficeLocations } from '@/redux_store/location/locationApi'
import { locationAction } from '@/redux_store/location/locationSlice'

export const OfficeLocation: FC = () => {
    const [showAdd, setShowAdd] = useState(false)
    const [searchFilter, setSearchFilter] = useState('');
    const [isEdit, setEdit] = useState<any>();
    const dispatch = cusDispatch();
    const { location } = cusSelector((state) => state.location);
    const { userDetails } = cusSelector((state) => state.auth);
    const changeFilterData = (str: string) => setSearchFilter(str)
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)
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

    return (
        <>
            <div className='bg-white border shadow-sm m-5 rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                <TableWrapper
                    heading='Manage Office Location'
                    addBtnTitle='add Location'
                    addBtnClickFn={() => {
                        setEdit(null)
                        setShowAdd(true)
                    }}
                    curDataCount={1}
                    totalCount={location?.length}
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


