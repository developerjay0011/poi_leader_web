import { TimeLineDetails } from '@/utils/typesUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DevelopmentDetails {
  access: string
  attachments: string[]
  categoryid: string
  creation_date: string
  description: string
  documents: string
  priority: string
  status: string
  development_title: string
  id: string
  leaderid:string
  created_by_type: string
  timeline: TimeLineDetails[]
  saved_by_type: string
  saved_by:string
  
}
export interface TimeLineFormField {
  status: string
  id: string
  leaderid: string
  developmentid:string
  access: string
  attachments: string
  description: string
  milestone:string
}

export interface CategoryFilter {
  category: string
  id: string
}
interface DevelopmentState {
  developments: DevelopmentDetails[]
  categories: CategoryFilter[]
}

const init: DevelopmentState = {
  developments: [],
  categories: [],
}

export const developmentSlice = createSlice({
  name: 'development',
  initialState: init,
  reducers: {
    storeDevelopments(state, action: PayloadAction<DevelopmentDetails[]>) {
      state.developments = action.payload
    },
    storeCategories(state, action: PayloadAction<CategoryFilter[]>) {
      state.categories = action.payload
    },
  },
})

export const developmentAction = developmentSlice.actions
