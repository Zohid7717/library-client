import { createSlice } from '@reduxjs/toolkit'


type ToastStateType = {
  message: string | null
}

const initialState: ToastStateType = {
  message: null
}

const toastState = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    clearMessage(state) {
      state.message = null
    }
  }
})

export const { setMessage, clearMessage } = toastState.actions

export default toastState.reducer