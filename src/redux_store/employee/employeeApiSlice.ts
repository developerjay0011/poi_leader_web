import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EmployeeState {
  employees: [],
  employeaccess: {}
}

const init: EmployeeState = {
  employees: [],
  employeaccess: {}
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: init,
  reducers: {
    storeemployees(state, action) {
      state.employees = action.payload
    },
    setemployeaccess(state, action: any) {
      state.employeaccess = action.payload
    },
  },
})

export const employeeAction = employeeSlice.actions
