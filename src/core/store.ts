/* eslint-disable global-require */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { rootReducer } from './root-reducer'

export type AppDispatch = typeof store.dispatch

const localStorageKey = 'theme'
const persistedTheme = window.localStorage.getItem(localStorageKey)

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {
    theme: {
      type: persistedTheme ? JSON.parse(persistedTheme) : 'light',
    },
  },
})

store.subscribe(() => {
  const { type } = store.getState().theme
  window.localStorage.setItem(localStorageKey, JSON.stringify(type))
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root-reducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require('./root-reducer').default
    store.replaceReducer(newRootReducer)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>()
