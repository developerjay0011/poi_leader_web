import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AgendaDetails {
  access: string
  attachments: string
  category: string
  createDate: string
  description: string
  documents: string
  priority: string
  status: string
  title: string
  id: string
}

export interface CategoryFilter {
  category_name: string
  _id: string
}
interface AgendaState {
  agendas: AgendaDetails[]
  categories: CategoryFilter[]
}

const init: AgendaState = {
  agendas: [],
  categories: [],
}

export const agendaSlice = createSlice({
  name: 'agenda',
  initialState: init,
  reducers: {
    storeAgendas(state, action: PayloadAction<AgendaDetails[]>) {
      state.agendas = action.payload
    },
    storeCategories(state, action: PayloadAction<CategoryFilter[]>) {
      state.categories = action.payload
    },
  },
})

export const agendaAction = agendaSlice.actions
