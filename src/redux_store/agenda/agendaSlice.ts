import { TimeLineDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AgendaDetails {
  access: string
  attachments: string
  categoryid: string
  creation_date: string
  description: string
  documents: string
  priority: string
  status: string
  title: string
  id: string
  leaderid:string
  created_by_type: string
  timeline: TimeLineDetails[]
  saved_by_type: string
  saved_by:string
  
}

export interface CategoryFilter {
  category: string
  id: string
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
