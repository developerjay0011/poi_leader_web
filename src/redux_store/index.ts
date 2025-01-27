'use client'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'

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
import { accessSlice } from './accesstab/tabSlice'
import { fileSlice } from './filetype/filetypeSlice'
import { locationSlice } from './location/locationSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

let reduxStorage = (typeof window !== 'undefined' ? storage : createNoopStorage());


const rootReducer = combineReducers({
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
  access: accessSlice.reducer,
  file: fileSlice.reducer,
  location: locationSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth', 'follow', 'common', 'leader', 'agenda',
    'directory', 'development', 'gallery', 'event', 'access'],
  timeout: 2000,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions and state
        ignoredActionPaths: ['payload.timestamp', 'meta.arg'],
        ignoredPaths: ['items.dates'],
      },
      // Disable thunk middleware in development for better performance
      thunk: process.env.NODE_ENV === 'production',
      // Conditionally enable middleware based on environment
      immutableCheck: process.env.NODE_ENV === 'production',
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// to get the redux store data outside of react component
export const getReduxStoreValues = store.getState
