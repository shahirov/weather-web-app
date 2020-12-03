import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchSuggestedCitiesByName } from '~/api/cities'
import { SortingType, SuggestedCity } from '~/api/types'
import type { RootState } from '~/core/root-reducer'

export const getSuggestedCities = createAsyncThunk<
  { data: SuggestedCity[] },
  {
    cityNamePrefix: string
    sort?: SortingType
    offset?: number
    limit?: number
  }
>(
  'search/getSuggestedCities',
  async ({ cityNamePrefix, sort = 'name', limit = 5, offset = 0 }) => {
    const response = await fetchSuggestedCitiesByName({
      cityNamePrefix,
      sort,
      limit,
      offset,
    })

    return response.data
  },
)

type SearchState = {
  suggestedItems: SuggestedCity[]
}

const initialState: SearchState = {
  suggestedItems: [],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSuggestedCities.fulfilled, (state, { payload }) => {
      state.suggestedItems = payload.data
    })
  },
})

export const searchReducer = searchSlice.reducer

export const selectSuggestedItems = (state: RootState): SuggestedCity[] =>
  state.search.suggestedItems
