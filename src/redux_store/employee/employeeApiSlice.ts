import { createSlice } from '@reduxjs/toolkit'

interface EmployeeState {
  employees: any[],
  employeaccess: {}
  employedetails: any
}

const init: EmployeeState = {
  employees: [],
  employeaccess: {},
  employedetails: {}
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: init,
  reducers: {
    storeemployees(state, action) {
      state.employees = Array.isArray(action.payload) ? action.payload : []
    },
    setemployeaccess(state, action: any) {
      state.employeaccess = action.payload
    },
    setemployedetails(state, action: any) {
      state.employedetails = action.payload
    },
  },
})

export const employeeAction = employeeSlice.actions
