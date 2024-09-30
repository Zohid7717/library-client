import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import axios from "../../axios/axios"
import { AdminRegReq, authUserReq, authUserRes, UserType } from "./types"

const createSliceWithThinks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})

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

const authSlice = createSliceWithThinks({
  name: 'user',
  initialState: initialState,
  reducers: (create) => ({
    logOut: create.reducer((state) => {
      state.user = null
      state.isLoading = false
      state.role = null
      state.token = null
      state.message = null
      window.localStorage.removeItem('token')
    }),
    authUser: create.asyncThunk<authUserRes, authUserReq>(
      async ({ user_passport, user_pass }, { rejectWithValue }) => {
        try {
          const { data } = await axios.post('/users/authUser', {
            user_passport,
            user_pass
          })
          if (!data) {
            throw new Error('Произошло ошибка')
          }
          return data
        } catch (error) {
          return rejectWithValue(error)
        }
      }, {
      pending: (state) => {
        state.isLoading = true
      },
      fulfilled: (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoading = false
        state.role = action.payload.user.user_role
        window.localStorage.setItem('token', action.payload.token)
        state.message = "true"
      },
      rejected: (state, action: any) => {
        state.message = action.error ? action.payload?.response.data.message : null
        state.isLoading = false
      }
    }
    ),
    getMe: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axios.get('/users/getMe')
          if (!data) {
            throw new Error('Произошло ошибка')
          }
          return data
        } catch (error) {
          return rejectWithValue(error)
        }
      }, {
      pending: (state) => {
        state.isLoading = true
      },
      fulfilled: (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoading = false
        state.role = action.payload.user.user_role
        window.localStorage.setItem('token', action.payload.token)
        state.message = 'true'
      },
      rejected: (state, action: any) => {
        state.isLoading = false
        state.message = action.error ? action.payload?.message : null
      }
    }
    ),
    regAdmin: create.asyncThunk<authUserRes, AdminRegReq>(
      async ({ user_firstname, user_lastname, user_passport, user_number, user_pass, admin_pass, user_img }, { rejectWithValue }) => {
        try {
          const { data } = await axios.post('/users/regAdmin', {
            user_firstname,
            user_lastname,
            user_passport,
            user_number,
            user_pass,
            admin_pass,
            user_img
          })
          if (!data) {
            throw new Error('Произошло ошибка!')
          }
          return data
        } catch (error) {
          return rejectWithValue(error)
        }
      }, {
      pending: (state) => {
        state.isLoading = true
      },
      fulfilled: (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoading = false
        state.role = action.payload.user.user_role
        window.localStorage.setItem('token', action.payload.token)
        state.message = 'true'
      },
      rejected: (state, action: any) => {
        state.message = action.error ? action.payload?.response.data.message : null
        state.isLoading = false
      }
    }
    )
  }),
  extraReducers(builder) {
    builder
  },
})

export const { logOut, authUser, getMe, regAdmin } = authSlice.actions

export default authSlice.reducer