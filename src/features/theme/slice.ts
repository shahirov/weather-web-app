import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '~/core/root-reducer'

type ThemeState = {
  type: string
}

const initialState: ThemeState = {
  type: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.type = state.type === 'light' ? 'dark' : 'light'
    },
  },
})

export const themeReducer = themeSlice.reducer

export const { toggleTheme } = themeSlice.actions

export const selectTheme = (state: RootState): string => state.theme.type
