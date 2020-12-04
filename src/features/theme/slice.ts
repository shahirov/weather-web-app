import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '~/core/root-reducer'

type Theme = 'light' | 'dark'

type ThemeState = {
  type: Theme
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

export const selectTheme = (state: RootState): Theme => state.theme.type
