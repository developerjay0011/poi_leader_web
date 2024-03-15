'use client'
import { FC, useEffect, useState } from 'react'
import { TableWrapper } from '@/utils/TableWrapper'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deleteLetter, getLetters } from '@/redux_store/letter/letterApi'
import { letterActions } from '@/redux_store/letter/letterSlice'
import { tryCatch } from '@/config/try-catch'
import { commonActions } from '@/redux_store/common/commonSlice'
import { Savedby, ToastType } from '@/constants/common'
import { ManageLetterTable } from '../letter/ManageLetterTable'

export const LetterManagePage: FC = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const changeFilterData = (str: string) => setSearchFilter(str)
    const { letter_templete } = cusSelector((state) => state.letter);
    const { userDetails } = cusSelector((st) => st.auth);
    const { leaderProfile } = cusSelector((state) => state.leader);
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }
    const dispatch = cusDispatch();
    const getletter = async () => {
        const data = await getLetters(userDetails?.leaderId as string);
        dispatch(letterActions.storeLetter(data));
    };
    const handleTemplateDelete = async (id: string) => {
        tryCatch(
            async () => {
                const response = await deleteLetter(id, leaderProfile.id as string);
                if (response?.success) {
                    getletter()
                    dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
                } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
                }
            })

    }
    useEffect(() => {
        (async () => {
            getletter();
        })();
    }, [userDetails, dispatch]);

    return (
        <>
            <div className='bg-white border shadow-sm rounded-md m-5 overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                <TableWrapper
                    heading='Manage Letter'
                    addBtnTitle='add Letter'
                    addBtnClickFn={(Savedby().saved_by_type == "leader" ? "/user" : "/employee-access") + "/letter/add-letter"}
                    curDataCount={1}
                    totalCount={letter_templete?.length}
                    changeFilterFn={changeFilterCount}
                    filterDataCount={filterDataCount}
                    changePageNo={changeCurPageNo}
                    curPageNo={curPageNo}
                    searchFilterFn={changeFilterData}
                    jsonDataToDownload={letter_templete}
                >
                    <ManageLetterTable
                        handleDelete={(id) => { handleTemplateDelete(id) }}
                        handleEdit={(value) => { }}
                        searchStr={searchFilter}
                        curPageNo={curPageNo}
                        filterDataCount={filterDataCount}
                    />
                </TableWrapper>
            </div>
        </>
    )
}


