import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './UI/uiSlice'
import { postSlice } from './posts/postSlice'
import { agendaSlice } from './agenda/agendaSlice'
import { authSlice } from './auth/authSlice'
import { commonSlice } from './common/commonSlice'
import { leaderSlice } from './leader/leaderSlice'
import { directorySlice } from './directory/directorySlice'
import { developmentSlice } from './development/developmentSlice'
import { gallerySlice } from './gallery/gallerySlice'
import { groupSlice } from './group/groupSlice'
import { eventSlice } from './event/eventSlice'
import { pollSlice } from './polls/pollSlice'
import { letterSlice } from './letter/letterSlice'
import { employeeSlice } from './employee/employeeApiSlice'
import { ticketSlice } from './ticket/ticketSlice'



export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    common: commonSlice.reducer,
    leader: leaderSlice.reducer,
    UI: uiSlice.reducer,
    posts: postSlice.reducer,
    agenda: agendaSlice.reducer,
    directory: directorySlice.reducer,
    development: developmentSlice.reducer,
    gallery: gallerySlice.reducer,
    group: groupSlice.reducer,
    event: eventSlice.reducer,
    poll: pollSlice.reducer,
    letter: letterSlice.reducer,
    employee: employeeSlice.reducer,
    ticket: ticketSlice.reducer,


  },
})

// types to configure custom useSelector and useDispatch hooks for better auto compeletion through TS
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// to get the redux store data outside of react component
export const getReduxStoreValues = store.getState
