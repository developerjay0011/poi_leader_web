'use client'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { ManageTemplateForm } from '../forms/TemplateForm'
import { TableWrapper } from '@/utils/TableWrapper'

import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deleteLetter, getLetters } from '@/redux_store/letter/letterApi'
import { letterActions } from '@/redux_store/letter/letterSlice'
import { tryCatch } from '@/config/try-catch'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { ManageLetterTable } from '../letter/ManageLetterTable'

export const LetterManagePage: FC = () => {
    const [showAddTemplateForm, setShowAddTemplateForm] = useState(false)
    const [searchFilter, setSearchFilter] = useState('');
    const [isEdit, setEdit] = useState<any>();
    const { letter_templete } = cusSelector((state) => state.letter);

    const changeFilterData = (str: string) => setSearchFilter(str)
    const { userDetails } = cusSelector((st) => st.auth);
    const openModal = () => {
        setShowAddTemplateForm(true)
            setEdit(null)
    };
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }
    const { leaderProfile } = cusSelector((state) => state.leader);
    const dispatch = cusDispatch();

    const getletter = async () => {
        const data = await getLetters(leaderProfile?.id as string);
        dispatch(letterActions.storeLetter(data));
    };
    const handleTemplateDelete = async (id:string) => {
        tryCatch(
            async () => {
                const response = await deleteLetter(id,leaderProfile.id as string);
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
    }, [userDetails,dispatch]);

    return (
        <>
            <div className='flex gap-5 w-full relative px-5 gap-6 mb-5 mt-5'>
                <div className='sticky top-0 left-0 self-start max-[1000px]:hidden w-max'>
                    <ShortcutsBox />
                </div>

                <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>


                    <section className='flex flex-col px-5 gap-6 mb-5'>


                        {/* POLLS TABLE */}
                        <TableWrapper
                            heading='Manage Letter'
                            addBtnTitle='add Letter'
                            addBtnClickFn={() => location.href ='/user/letter/add-letter'}
                            curDataCount={1}
                            totalCount={letter_templete?.length}
                            changeFilterFn={changeFilterCount}
                            filterDataCount={filterDataCount}
                            changePageNo={changeCurPageNo}
                            curPageNo={curPageNo}
                            searchFilterFn={changeFilterData}
                            jsonDataToDownload={letter_templete}
                        >
                            <ManageLetterTable handleDelete={(id) => { handleTemplateDelete(id) }} handleEdit={(value) => { setShowAddTemplateForm(true), setEdit(value)}} searchStr={searchFilter} />
                        </TableWrapper>
                    </section>
                </div>
            </div>
{/* 
            <AnimatePresence>
                {showAddTemplateForm && (
                    <ManageTemplateForm
                        isEdit={isEdit}
                        err={"err"}
                        heading={isEdit ? 'Edit Letter' :'Add Letter' }
                        status='1'
                        submitting={false}
                        submitHandler={() => { }}
                        tempHeader=''
                        onClose={() => setShowAddTemplateForm(false)}
                    />
                )}
            </AnimatePresence> */}
        </>
    )
}


