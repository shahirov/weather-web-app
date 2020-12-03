import {
  Action,
  AnyAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

import { checkAuth, signInViaEmail, signUpViaEmail } from '~/api/auth'
import { UserProfile } from '~/api/types'
import { getUserProfile } from '~/api/users'
import type { RootState } from '~/core/root-reducer'
import { auth, firebase } from '~/lib/firebase'

interface TypedActionCreator<Type extends string> {
  (...args: never[]): Action<Type>
  type: Type
}

export type AuthError = {
  code: string
  message: string
  [key: string]: string
}

type AuthState = {
  user: UserProfile | null
  authChecked: boolean
  error: AuthError | null
}

const isOneOf = <ActionCreator extends TypedActionCreator<string>>(
  actions: ActionCreator[],
) => (action: AnyAction): action is ReturnType<ActionCreator> =>
  actions.map(({ type }) => type).includes(action.type)

export const checkAuthState = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const firebaseUser = await checkAuth()
      return await getUserProfile(firebaseUser)
    } catch (error_) {
      const error = error_ as firebase.auth.AuthError
      return rejectWithValue({ code: error.code, message: error.message })
    }
  },
)

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpEmail',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      return await signUpViaEmail(email, password)
    } catch (error_) {
      const error = error_ as firebase.auth.AuthError
      return rejectWithValue({ code: error.code, message: error.message })
    }
  },
)

export const signInWithEmail = createAsyncThunk(
  'auth/signInEmail',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      return await signInViaEmail(email, password)
    } catch (error_) {
      const error = error_ as firebase.auth.AuthError
      return rejectWithValue({ code: error.code, message: error.message })
    }
  },
)

export const logout = createAsyncThunk('auth/logout', () => auth.signOut())

const initialState: AuthState = {
  user: null,
  authChecked: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
    })
    builder.addMatcher(
      isOneOf([
        checkAuthState.fulfilled,
        signUpWithEmail.fulfilled,
        signInWithEmail.fulfilled,
      ]),
      (state, { payload }) => {
        state.authChecked = true
        state.user = payload
        state.error = null
      },
    )
    builder.addMatcher(
      isOneOf([
        checkAuthState.rejected,
        signUpWithEmail.rejected,
        signInWithEmail.rejected,
      ]),
      (state, { payload }) => {
        const error = payload as AuthError
        state.error = { code: error.code, message: error.message }
      },
    )
  },
})

export const authReducer = authSlice.reducer

export const selectUser = (state: RootState): UserProfile | null =>
  state.auth.user
export const selectIsAuthChecked = (state: RootState): boolean =>
  state.auth.authChecked
export const selectIsUserAuthenticated = (state: RootState): boolean =>
  state.auth.user !== null
export const selectAuthError = (state: RootState): AuthError | null =>
  state.auth.error
