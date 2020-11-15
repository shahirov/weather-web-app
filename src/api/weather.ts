import axios, { AxiosError, AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import { ForecastData, Params, UnitMeasurement, WeatherData } from './types'

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5'

const request = axios.create({
  baseURL: API_ENDPOINT,
  paramsSerializer: (params: Params) => {
    const qs = String(new URLSearchParams(params))
    return qs && `${qs}&appid=${process.env.OPEN_WEATHER_API_KEY ?? ''}`
  },
})

export const getWeatherDataByCityNameFx = createEffect<
  {
    cityName: string
    units?: UnitMeasurement
  },
  AxiosResponse<WeatherData>,
  AxiosError
>(({ cityName, units = 'metric' }) =>
  request.get('weather', {
    params: {
      q: cityName,
      units,
    },
  }),
)

export const getFavoriteCityWeatherDataFx = createEffect<
  {
    cityName: string
    units?: UnitMeasurement
  },
  AxiosResponse<WeatherData>,
  AxiosError
>(({ cityName, units = 'metric' }) =>
  request.get('weather', {
    params: {
      q: cityName,
      units,
    },
  }),
)

export const getForecastDataByCityNameFx = createEffect<
  {
    cityName: string
    units?: UnitMeasurement
  },
  AxiosResponse<ForecastData>,
  AxiosError
>(({ cityName, units = 'metric' }) =>
  request.get('forecast', {
    params: {
      q: cityName,
      units,
    },
  }),
)
