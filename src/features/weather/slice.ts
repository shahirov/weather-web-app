import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  CityModel,
  CityWeatherData,
  UnitMeasurement,
  WeatherData,
} from '~/api/types'
import {
  fetchCitiesWeatherData,
  fetchFavoriteCityWeatherData,
  fetchForecastDataByCityName,
  fetchWeatherDataByCityName,
  fetchWeatherDataForCity,
} from '~/api/weather'
import type { RootState } from '~/core/root-reducer'

type DayForecast = {
  condition: string
  counter: number
  temperature: number
}

type DaysForecast = Record<string, DayForecast>

type WeatherState = {
  citiesWeatherData: Record<string, WeatherData>
  cityWeatherData: CityWeatherData | null
  daysForecastData: DaysForecast | null
  favoriteCityWeatherData: WeatherData | null
  searchedCityWeatherData: WeatherData | null
}

export const getCitiesWeather = createAsyncThunk<
  Record<string, WeatherData>,
  {
    cities: CityModel[]
    units?: UnitMeasurement
  }
>('weather/getCitiesWeather', async ({ cities, units }) => {
  return fetchCitiesWeatherData({ cities, units })
})

export const getWeatherForCity = createAsyncThunk<
  CityWeatherData,
  {
    cityName: string
    units?: UnitMeasurement
  }
>('weather/getWeatherForCity', async ({ cityName }) => {
  return fetchWeatherDataForCity({ cityName })
})

export const getForecastByCity = createAsyncThunk<
  DaysForecast,
  {
    cityName: string
    units?: UnitMeasurement
  }
>('weather/getForecastByCity', async ({ cityName }) => {
  const { data } = await fetchForecastDataByCityName({ cityName })
  const daysForecast: DaysForecast = {}

  for (const value of data.list) {
    const date = new Date(value.dt_txt).toDateString().split(' ')[0]

    if (daysForecast[date]) {
      daysForecast[date].counter += 1
      daysForecast[date].temperature += value.main.temp
    } else {
      daysForecast[date] = {
        condition: value.weather[0].main,
        temperature: value.main.temp,
        counter: 1,
      }
    }
  }

  Object.keys(daysForecast).forEach((day) => {
    daysForecast[day].temperature = Math.ceil(
      daysForecast[day].temperature / daysForecast[day].counter,
    )
  })
  delete daysForecast[Object.keys(daysForecast)[0]]

  return daysForecast
})

export const getFavoriteCityWeather = createAsyncThunk<
  WeatherData,
  void,
  { state: RootState }
>('weather/getFavoriteCityWeather', async (_, { getState }) => {
  const cityName = getState().cities.favoriteCity
  const response = await fetchFavoriteCityWeatherData({ cityName })
  return response.data
})

export const getSearchedCityWeather = createAsyncThunk<
  WeatherData | null,
  {
    cityName: string
    units?: UnitMeasurement
  }
>('weather/getSearchedCityWeather', async ({ cityName }) => {
  const response = await fetchWeatherDataByCityName({
    cityName,
  })
  return response.data
})

const initialState: WeatherState = {
  citiesWeatherData: {},
  cityWeatherData: null,
  daysForecastData: null,
  favoriteCityWeatherData: null,
  searchedCityWeatherData: null,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetCitiesWeatherData: (state) => {
      state.citiesWeatherData = {}
    },
    resetSearchedCityWeatherData: (state) => {
      state.searchedCityWeatherData = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCitiesWeather.fulfilled, (state, { payload }) => {
      state.citiesWeatherData = payload
    })
    builder.addCase(getWeatherForCity.fulfilled, (state, { payload }) => {
      state.cityWeatherData = payload
    })
    builder.addCase(getForecastByCity.fulfilled, (state, { payload }) => {
      state.daysForecastData = payload
    })
    builder.addCase(getFavoriteCityWeather.fulfilled, (state, { payload }) => {
      state.favoriteCityWeatherData = payload
    })
    builder.addCase(getSearchedCityWeather.fulfilled, (state, { payload }) => {
      state.searchedCityWeatherData = payload
    })
  },
})

export const weatherReducer = weatherSlice.reducer

export const {
  resetCitiesWeatherData,
  resetSearchedCityWeatherData,
} = weatherSlice.actions

export const selectCitiesWeatherData = (
  state: RootState,
): [string, WeatherData][] => Object.entries(state.weather.citiesWeatherData)
export const selectCityWeatherData = (
  state: RootState,
): CityWeatherData | null => state.weather.cityWeatherData
export const selectDaysForecastData = (state: RootState): DaysForecast | null =>
  state.weather.daysForecastData
export const selectFavoriteCityWeatherData = (
  state: RootState,
): WeatherData | null => state.weather.favoriteCityWeatherData
export const selectSearchedCityWeatherData = (
  state: RootState,
): WeatherData | null => state.weather.searchedCityWeatherData
