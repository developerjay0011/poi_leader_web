import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EmployeeState {
  employees: []
}

const init: EmployeeState = {
  employees: [],
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: init,
  reducers: {
    storeemployees(state, action: any) {
      state.employees = action.payload
    },

  },
})

export const employeeAction = employeeSlice.actions
