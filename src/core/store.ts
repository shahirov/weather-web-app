import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { rootReducer } from './root-reducer'

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: rootReducer,
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root-reducer', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('./root-reducer').default
    store.replaceReducer(newRootReducer)
  })
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
