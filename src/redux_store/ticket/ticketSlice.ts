
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TicketDetails {
  ticketid: string,
  ticket_code: string,
  category: string,
  subject: string,
  citizen_detail: {
    citizenid: string,
    citizen_name: string,
    citizen_mobile: string,
    citizen_email: string,
    citizen_image: string
  },
  description: string,
  attachments: [
    string
  ],
  signature: string,
  letter_html: string,
  status: [
    {
      id: string,
      status: string,
      description: string,
      attachments: [
        string
      ],
      created_date: string
    }
  ],
  created_date: string
}
interface TicketState {
  ticket: any
  ticketcategory: any
}

const initialState: TicketState = {
  ticket: [],
  ticketcategory: []
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    storeticketcategory(state, action) {
      state.ticketcategory = action.payload
    },
    storeTicket(state, action) {
      state.ticket = action.payload
    },
  },
});

export const ticketActions = ticketSlice.actions;
