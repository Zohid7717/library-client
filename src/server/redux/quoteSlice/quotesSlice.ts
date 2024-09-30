import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { QuotesSliceType } from './types';
import axios from '../../axios/axios';


const createSliceWithThinks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})

const initialState: QuotesSliceType = {
  quotes: null,
  isLoading: false,
  message: null
}

const QuotesSlice = createSliceWithThinks({
  name: 'quotes',
  initialState: initialState,
  reducers: (create) => ({
    getQuotes: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axios.get('/quotes/getQuotes')
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
        state.quotes = action.payload.quotes
      },
      rejected: (state, action: any) => {
        state.message = action.error ? action.payload?.response.data.message : null
      }
    }
    )
  })
})

export const { getQuotes } = QuotesSlice.actions

export default QuotesSlice.reducer