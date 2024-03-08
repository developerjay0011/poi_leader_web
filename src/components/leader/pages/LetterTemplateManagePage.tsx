'use client'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { ManageTemplateForm } from '../forms/TemplateForm'
import { TableWrapper } from '@/utils/TableWrapper'
import { ManageTemplateTable } from '../letter/ManageTemplateTable'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deleteLetterTemplates, getLetterTemplates } from '@/redux_store/letter/letterApi'
import { letterActions } from '@/redux_store/letter/letterSlice'
import { tryCatch } from '@/config/try-catch'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'

export const LetterTemplateManagePage: FC = () => {
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

    const getTemplate = async () => {
        const data = await getLetterTemplates(userDetails?.leaderId as string);
        dispatch(letterActions.storeLetterTemplate(data));
    };
    const handleTemplateDelete = async (id: string) => {
        tryCatch(
            async () => {
                const response = await deleteLetterTemplates(id, leaderProfile.id as string);
                if (response?.success) {
                    getTemplate()
                    dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
                } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
                }
            })

    }
    useEffect(() => {
        (async () => {
            getTemplate();
        })();
    }, [userDetails, dispatch]);

    return (
        <>
            <div className='flex gap-5 w-full relative px-5 gap-6 mb-5 mt-5'>
                {/* <div className='sticky top-0 left-0 self-start max-[1000px]:hidden w-max'>
                    <ShortcutsBox />
                </div> */}
                <ProfileShortcutsBox />

                <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                    <TableWrapper
                        heading='Manage Templates'
                        addBtnTitle='add template'
                        addBtnClickFn={openModal}
                        curDataCount={1}
                        totalCount={letter_templete?.length}
                        changeFilterFn={changeFilterCount}
                        filterDataCount={filterDataCount}
                        changePageNo={changeCurPageNo}
                        curPageNo={curPageNo}
                        searchFilterFn={changeFilterData}
                        jsonDataToDownload={letter_templete}
                    >
                        <ManageTemplateTable handleDelete={(id) => { handleTemplateDelete(id) }} handleEdit={(value) => { setShowAddTemplateForm(true), setEdit(value) }} searchStr={searchFilter} />
                    </TableWrapper>
                </div>
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


