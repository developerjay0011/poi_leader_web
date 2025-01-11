'use client'
import { FC, useEffect, useState } from 'react'
import { TableWrapper, searchFilterFunction } from '@/utils/TableWrapper'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { ChangeActiveStatus } from '@/redux_store/employee/employeeApi'
import { FileTypeForm } from '../forms/FileTypeForm'
import { GetFiles } from '@/redux_store/filetype/filetypeApi'
import { fileAction } from '@/redux_store/filetype/filetypeSlice'
import { FiletypeTable } from '../filetype/FiletypeTable'

export const FileType: FC = () => {
    const [showAdd, setShowAdd] = useState(false)
    const [searchFilter, setSearchFilter] = useState('');
    const [isEdit, setEdit] = useState<any>();
    const dispatch = cusDispatch();
    const { filestype } = cusSelector((state) => state.file);
    const { userDetails } = cusSelector((state) => state.auth);
    const changeFilterData = (str: string) => setSearchFilter(str)
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }
    const getFiles = async () => {
        if (userDetails?.leaderId) {
            const Files = await GetFiles(userDetails?.leaderId as string);
            dispatch(fileAction.storeFiles(Files))
        }
    };



    return (
        <>
            <div className='bg-white border shadow-sm m-5 rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                <TableWrapper
                    heading='Manage File Type'
                    addBtnTitle='add File Type'
                    addBtnClickFn={() => {
                        setEdit(null)
                        setShowAdd(true)
                    }}
                    curDataCount={1}
                    totalCount={searchFilterFunction(searchFilter, filestype, "file_name", { curPageNo, filterDataCount })?.mainlist?.length}
                    changeFilterFn={changeFilterCount}
                    filterDataCount={filterDataCount}
                    changePageNo={changeCurPageNo}
                    curPageNo={curPageNo}
                    searchFilterFn={changeFilterData}
                    jsonDataToDownload={null}
                >
                    <FiletypeTable
                        handleEdit={(value) => {
                            setShowAdd(true),
                                setEdit(value)
                        }}
                        searchStr={searchFilter}
                        getFiles={() => getFiles()}
                        curPageNo={curPageNo}
                        filestypes={searchFilterFunction(searchFilter, filestype, "file_name", { curPageNo, filterDataCount })?.filterlist}
                        filterDataCount={filterDataCount}
                    />
                </TableWrapper>
            </div>
            {showAdd && (
                <FileTypeForm
                    edit={isEdit?.id}
                    heading={isEdit?.id ? 'Edit File Type' : 'Add File Type'}
                    details={isEdit}
                    submitting={false}
                    onClose={() => setShowAdd(false)}
                    getFiles={() => getFiles()}
                />
            )}
        </>
    )
}


