'use client'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { TableWrapper } from '@/utils/TableWrapper'

import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { ManageEmployessForm } from '../forms/ManageEmployessForm'
import { ChangeActiveStatus, GetEmployees } from '@/redux_store/employee/employeeApi'
import { employeeAction } from '@/redux_store/employee/employeeApiSlice'
import { ManageEmployeeTable } from '../employee/ManageEmployeeTable'
import { ProfileShortcutsBox } from '@/components/timlineComponents/ProfileShortcutsBox'

export const EmployeeManagePage: FC = () => {
    const [showAdd, setShowAdd] = useState(false)
    const [searchFilter, setSearchFilter] = useState('');
    const [isEdit, setEdit] = useState<any>();
    const dispatch = cusDispatch();
    const { employees } = cusSelector((state) => state.employee);
    const { userDetails } = cusSelector((state) => state.auth);
    const changeFilterData = (str: string) => setSearchFilter(str)
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }
    const getemployee = async () => {
        if (userDetails?.leaderId) {
            const data = await GetEmployees(userDetails?.leaderId as string);
            if (Array.isArray(data)) {
                dispatch(employeeAction.storeemployees(data as any));
            }
        }
    };

    const changeActiveStatus = async (id: string) => {
        let body = {
            "leaderid": userDetails?.leaderId,
            "employeeid": id
        }
        await ChangeActiveStatus(body)
        getemployee()
    };
    useEffect(() => {
        (async () => {
            await getemployee();
        })();
    }, [userDetails?.leaderId, dispatch]);

    return (
        <>
            <div className='flex gap-5 w-full relative px-5 gap-6 mb-5 mt-5'>
                <ProfileShortcutsBox />
                <div className='bg-white border shadow-sm rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
                    <TableWrapper
                        heading='Manage Employees'
                        addBtnTitle='add employee'
                        addBtnClickFn={() => {
                            setEdit(null)
                            setShowAdd(true)
                        }}
                        curDataCount={1}
                        totalCount={employees?.length}
                        changeFilterFn={changeFilterCount}
                        filterDataCount={filterDataCount}
                        changePageNo={changeCurPageNo}
                        curPageNo={curPageNo}
                        searchFilterFn={changeFilterData}
                        jsonDataToDownload={null}
                    >
                        <ManageEmployeeTable
                            handleEdit={(value) => { setShowAdd(true), setEdit(value) }}
                            searchStr={searchFilter}
                            changeActiveStatus={(id) => { changeActiveStatus(id) }}
                        />
                    </TableWrapper>
                </div>
            </div>

            <AnimatePresence>
                {showAdd && (
                    <ManageEmployessForm
                        edit={isEdit?.id}
                        heading={isEdit?.id ? 'Edit Employee' : 'Add Employee'}
                        employeedetails={isEdit}
                        submitting={false}
                        onClose={() => setShowAdd(false)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}


