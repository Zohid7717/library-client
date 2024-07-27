import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios/axios"

type authUserRes = {
  success: boolean,
  user: UserType,
  token: string
}

type authUserReq = {
  user_passport: string,
  user_password: string
}

type UserType = {
  id: number,
  user_firstname: string,
  user_lastname: string,
  user_passport: string,
  user_role: string,
  user_img: string
}

const authUser = createAsyncThunk<authUserRes, authUserReq>(
  'user/authUser',
  async ({ user_passport, user_password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/authUser', { params: {user_passport, user_password} })
      if (!data) {
        throw new Error('Произошло ошибка')
      }
      window.localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

type authStateType = {
  user: UserType | null,
  token: string | null,
  isLoading: boolean,
  role: string | null,
  message: string | null
}

const initialState: authStateType = {
  user: null,
  token: null,
  isLoading: false,
  role: null,
  message: null
}

export const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logOut(state) {
      state.user = null
      state.isLoading = false
      state.role = null
      state.token = null
      state.message = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(authUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoading = false
        state.role = action.payload.user.user_role
        state.message = "true"
      })
      .addCase(authUser.rejected, (state, action: any) => {
        state.message = action.error ? action.payload?.response.data.message : null
        state.isLoading = false
      })
  },
})

export const { logOut } = authSlice.actions

export default authSlice.reducer