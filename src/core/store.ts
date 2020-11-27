import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { rootReducer, RootState } from './root-reducer'

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

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
