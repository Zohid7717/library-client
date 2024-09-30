import { configureStore } from "@reduxjs/toolkit"
import user from "./userSlice/userSlice"
import toastSlice from './toastSlice/toastSlice'
import quotesSlice from './quoteSlice/quotesSlice'
import bookSlice from './bookSlice/bookSlice'

export const store = configureStore({
  reducer: {
    user,
    toastSlice,
    quotesSlice,
    bookSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
