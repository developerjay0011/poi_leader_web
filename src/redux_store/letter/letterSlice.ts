
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface LetterTemplateDetails {
  id: string,
  leaderid: string,
  template_name: string,
  template_html: string,
  isactive: true,
  saved_by_type: string,
  saved_by: string
}
export interface LetterDetails {
  id: string,
  leaderid: string,
  template_id: string,
  template_name: string,
  location: string,
  language: string,
  date: string,
  id_number: string,
  file_number: string,
  from: string,
  to: string,
  reference: string,
  contact_no: string,
  envelope_type: string,
  letter_no: string,
  letter_html: string,
  category: string,
  ticket_code: string,
  isactive: true,
  created_date: string,
  created_by: string,
  created_by_type: string,
  modified_date: string,
  modified_by: string,
  modified_by_type: string
}
interface LetterState {
  letter: LetterDetails[]
  letter_templete: LetterTemplateDetails[];
}

const initialState: LetterState = {
  letter: [],
  letter_templete: [],
};

export const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    storeLetterTemplate(state, action) {
      state.letter_templete = action.payload
    },
    storeLetter(state, action: PayloadAction<LetterDetails[]>) {
      state.letter = action.payload
    },
  },
});

export const letterActions = letterSlice.actions;
