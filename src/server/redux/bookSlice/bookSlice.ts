import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'
import { BookSliceType } from './types'
import axios from '../../axios/axios'

const createSliceWithThinks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})

const initialState: BookSliceType = {
  book: null,
  isLoading: false,
  message: null
}

const BookSlice = createSliceWithThinks({
  name: 'book',
  initialState,
  reducers: (create) => ({
    getBook: create.asyncThunk(
      async (id:string, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(`/books/getBook/${id}`)
          return data
        } catch (error) {
          return rejectWithValue(error)
        }
      }, {
        pending: (state) => {
          state.isLoading = true
        },
        fulfilled: (state, action) => {
          state.isLoading = false
          state.book = action.payload.book
        },
        rejected: (state, action: any) => {
          state.message = action.error ? action.payload?.response.data.message : null
        }
      }
    )
  })
})

export const { getBook } = BookSlice.actions
export default BookSlice.reducer