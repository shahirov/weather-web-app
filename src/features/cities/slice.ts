import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import { fetchCities } from '~/api/cities'
import { CityModel, UserProfile } from '~/api/types'
import type { RootState } from '~/core/root-reducer'

type CitiesState = {
  entities: CityModel[]
  favoriteCity: string
}

export const getUserCities = createAsyncThunk<
  Record<string, CityModel>,
  UserProfile | null
>('cities/getCities', async (user) => {
  const cities = await fetchCities(user)
  return cities
})

const initialState: CitiesState = {
  entities: [],
  favoriteCity: 'Moscow',
}

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserCities.fulfilled, (state, { payload: cities }) => {
      state.entities = Object.values(cities)
    })
  },
})

export const citiesReducer = citiesSlice.reducer

export const selectCities = (state: RootState): CityModel[] =>
  state.cities.entities
export const selectFavoriteCity = (state: RootState): string =>
  state.cities.favoriteCity
export const selectIsFavotiteCityFollowed = createSelector(
  [selectCities, selectFavoriteCity],
  (cities, favCityName) => cities.find((city) => city.name === favCityName),
)
