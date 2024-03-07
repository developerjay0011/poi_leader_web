'use client'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ManageTemplateForm } from '../forms/TemplateForm'
import { TableWrapper } from '@/utils/TableWrapper'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deleteLetterTemplates } from '@/redux_store/letter/letterApi'
import { tryCatch } from '@/config/try-catch'
import { commonActions } from '@/redux_store/common/commonSlice'
import { ToastType } from '@/constants/common'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { getCategory } from '@/redux_store/agenda/agendaApi'
import { agendaAction } from '@/redux_store/agenda/agendaSlice'
import { CategoryTable } from '../category/CategoryTable'

export const CategoryManagePage: FC = () => {
    const [showAddTemplateForm, setShowAddTemplateForm] = useState(false)
    const [searchFilter, setSearchFilter] = useState('');
    const [isEdit, setEdit] = useState<any>();
    const { categories } = cusSelector((state) => state.agenda);

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

    const getCategorylist = async () => {
        const data = await getCategory(leaderProfile?.id as string);
        dispatch(agendaAction.storeCategories(data));
    };
    const handleTemplateDelete = async (id: string) => {
        tryCatch(
            async () => {
                const response = await deleteLetterTemplates(id, leaderProfile.id as string);
                if (response?.success) {
                    getCategorylist()
                    dispatch(commonActions.showNotification({ type: ToastType.SUCCESS, message: response.message }))
                } else {
                    dispatch(commonActions.showNotification({ type: ToastType.ERROR, message: response.message }))
                }
            })

    }

    useEffect(() => {
        (async () => { getCategorylist(); })();
    }, [userDetails, dispatch]);

    return (
        <>
            <div className='flex gap-5 w-full relative px-5 gap-6 mb-5 mt-5'>
                <ProfileShortcutsBox />
                <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                    <TableWrapper
                        heading='Manage Categories'
                        addBtnTitle='add category'
                        addBtnClickFn={openModal}
                        curDataCount={1}
                        totalCount={categories?.length}
                        changeFilterFn={changeFilterCount}
                        filterDataCount={filterDataCount}
                        changePageNo={changeCurPageNo}
                        curPageNo={curPageNo}
                        searchFilterFn={changeFilterData}
                        jsonDataToDownload={null}
                    >
                        <CategoryTable handleDelete={(id) => { handleTemplateDelete(id) }} handleEdit={(value) => { setShowAddTemplateForm(true), setEdit(value) }} searchStr={searchFilter} />
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


