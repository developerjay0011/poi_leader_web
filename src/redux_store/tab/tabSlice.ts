import { createSlice } from '@reduxjs/toolkit'


interface AgendaState {
  agendas: []
  categories: []
}

const init: AgendaState = {
  agendas: [],
  categories: [],
}

export const agendaSlice = createSlice({
  name: 'agenda',
  initialState: init,
  reducers: {
    storeAgendas(state, action: any) {
      state.agendas = action.payload
    },
  },
})

export const agendaAction = agendaSlice.actions
