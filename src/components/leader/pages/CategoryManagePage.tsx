'use client'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ManageTemplateForm } from '../forms/TemplateForm'
import { TableWrapper, searchFilterFunction } from '@/utils/TableWrapper'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { deleteLetterTemplates } from '@/redux_store/letter/letterApi'
import { tryCatch } from '@/config/try-catch'
import { commonActions } from '@/redux_store/common/commonSlice'
import { Savedby, ToastType } from '@/constants/common'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'
import { getCategory } from '@/redux_store/agenda/agendaApi'
import { agendaAction } from '@/redux_store/agenda/agendaSlice'
import { CategoryTable } from '../category/CategoryTable'
import { CategoryFrom } from '../forms/CategoryForm'

export const CategoryManagePage: FC = () => {
    const [showAddTemplateForm, setShowAddTemplateForm] = useState(false)
    const [searchFilter, setSearchFilter] = useState('');
    const [isEdit, setEdit] = useState<any>();
    const { userDetails } = cusSelector((st) => st.auth);
    const { categories } = cusSelector((state) => state.agenda);

    const changeFilterData = (str: string) => setSearchFilter(str)
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
    const dispatch = cusDispatch();
    const getCategorylist = async () => {
        const data = await getCategory(userDetails?.leaderId as string);
        dispatch(agendaAction.storeCategories(data));
    };
    useEffect(() => {
        (async () => { getCategorylist(); })();
    }, [userDetails, dispatch]);



    return (
        <>
            <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start m-5'>
                <TableWrapper
                    heading='Manage Categories'
                    addBtnTitle='add category'
                    addBtnClickFn={openModal}
                    curDataCount={1}
                    totalCount={searchFilterFunction(searchFilter, categories, "category", { curPageNo, filterDataCount })?.mainlist?.length}
                    changeFilterFn={changeFilterCount}
                    filterDataCount={filterDataCount}
                    changePageNo={changeCurPageNo}
                    curPageNo={curPageNo}
                    searchFilterFn={changeFilterData}
                    jsonDataToDownload={null}
                >
                    <CategoryTable
                        handleEdit={(value) => { setShowAddTemplateForm(true), setEdit(value) }}
                        searchStr={searchFilter}
                        curPageNo={curPageNo}
                        filterDataCount={filterDataCount}
                        categories={searchFilterFunction(searchFilter, categories, "category", { curPageNo, filterDataCount })?.filterlist}
                    />
                </TableWrapper>
            </div>

            <AnimatePresence>
                {showAddTemplateForm && (
                    <CategoryFrom
                        isEdit={isEdit}
                        err={"err"}
                        heading={isEdit ? 'Edit Category' : 'Add Category'}
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


