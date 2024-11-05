'use client'
import { FC, useEffect, useState, useCallback, useMemo } from 'react'
import { TableWrapper, searchFilterFunction } from '@/utils/TableWrapper'

import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { ManageEmployessForm } from '../forms/EmployessForm'
import { ChangeActiveStatus, GetEmployees } from '@/redux_store/employee/employeeApi'
import { employeeAction } from '@/redux_store/employee/employeeApiSlice'
import { ManageEmployeeTable } from '../employee/ManageEmployeeTable'

export const EmployeeManagePage: FC = () => {
    const [showAdd, setShowAdd] = useState(false)
    const [isEdit, setEdit] = useState<any>(null)
    const dispatch = cusDispatch()
    const { employees } = cusSelector((state) => state.employee)
    const { userDetails } = cusSelector((state) => state.auth)

    const [searchFilter, setSearchFilter] = useState('')
    const [filterDataCount, setFilterAmount] = useState(5)
    const [curPageNo, setCurPageNo] = useState(1)

    const changeFilterData = (str: string) => setSearchFilter(str)
    const changeCurPageNo = (page: number) => setCurPageNo(page)
    const changeFilterCount = (val: number) => {
        setFilterAmount(val)
        setCurPageNo(1)
    }

    const getEmployeeData = useCallback(async () => {
        if (userDetails?.leaderId) {
            const data = await GetEmployees(userDetails.leaderId)
            if (Array.isArray(data)) {
                dispatch(employeeAction.storeemployees(data as any))
            }
        }
    }, [userDetails?.leaderId, dispatch])

    const changeActiveStatus = useCallback(
        async (id: string) => {
            const body = {
                leaderid: userDetails?.leaderId,
                employeeid: id,
            }
            await ChangeActiveStatus(body)
            getEmployeeData()
        },
        [userDetails?.leaderId, getEmployeeData]
    )

    useEffect(() => {
        getEmployeeData()
    }, [getEmployeeData])

    const filteredEmployees = useMemo(
        () => searchFilterFunction(searchFilter, employees, 'fullname', { curPageNo, filterDataCount }),
        [searchFilter, employees, curPageNo, filterDataCount]
    )

    return (
        <div className='bg-white border shadow-sm m-5 rounded-md overflow-hidden flex flex-col gap-5 flex-1 self-start'>
            <TableWrapper
                heading='Manage Employees'
                addBtnTitle='add employee'
                addBtnClickFn={() => {
                    setEdit(null)
                    setShowAdd(true)
                }}
                curDataCount={1}
                totalCount={filteredEmployees?.mainlist?.length}
                changeFilterFn={changeFilterCount}
                filterDataCount={filterDataCount}
                changePageNo={changeCurPageNo}
                curPageNo={curPageNo}
                searchFilterFn={changeFilterData}
                jsonDataToDownload={null}
            >
                <ManageEmployeeTable
                    handleEdit={(value) => {
                        setShowAdd(true)
                        setEdit(value)
                    }}
                    searchStr={searchFilter}
                    changeActiveStatus={changeActiveStatus}
                    curPageNo={curPageNo}
                    filterDataCount={filterDataCount}
                    employees={filteredEmployees?.filterlist}
                />
            </TableWrapper>

            {showAdd && (
                <ManageEmployessForm
                    edit={isEdit?.id}
                    heading={isEdit?.id ? 'Edit Employee' : 'Add Employee'}
                    employeedetails={isEdit}
                    submitting={false}
                    onClose={() => setShowAdd(false)}
                />
            )}
        </div>
    )
}
