import { combineReducers } from '@reduxjs/toolkit'

import { authReducer } from '~/features/auth'
import { citiesReducer } from '~/features/cities'
import { searchReducer } from '~/features/search'
import { weatherReducer } from '~/features/weather'

export const rootReducer = combineReducers({
  auth: authReducer,
  cities: citiesReducer,
  weather: weatherReducer,
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>
