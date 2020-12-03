import axios, { AxiosError, AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import {
  CityModel,
  CityWeatherData,
  ForecastData,
  Params,
  UnitMeasurement,
  WeatherData,
} from './types'

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5'

const request = axios.create({
  baseURL: API_ENDPOINT,
  paramsSerializer: (params: Params) => {
    const qs = String(new URLSearchParams(params))
    return qs && `${qs}&appid=${process.env.OPEN_WEATHER_API_KEY ?? ''}`
  },
})

export const fetchWeatherDataByCityName = async ({
  cityName,
  units = 'metric',
}: {
  cityName: string
  units?: UnitMeasurement
}): Promise<AxiosResponse<WeatherData>> =>
  request.get('weather', {
    params: {
      q: cityName,
      units,
    },
  })

export const fetchCitiesWeatherData = async ({
  cities,
  units = 'metric',
}: {
  cities: CityModel[]
  units?: UnitMeasurement
}): Promise<Record<string, WeatherData>> => {
  const citiesWeatherDataMap: Record<string, WeatherData> = {}

  for (const city of cities) {
    // eslint-disable-next-line no-await-in-loop
    const { data } = await request.get<WeatherData>('weather', {
      params: {
        q: city.name,
        units,
      },
    })
    citiesWeatherDataMap[data.name] = { ...data }
  }

  return citiesWeatherDataMap
}

export const fetchFavoriteCityWeatherData = async ({
  cityName,
  units = 'metric',
}: {
  cityName: string
  units?: UnitMeasurement
}): Promise<AxiosResponse<WeatherData>> =>
  request.get('weather', {
    params: {
      q: cityName,
      units,
    },
  })

export const fetchWeatherDataForCity = async ({
  cityName,
  units = 'metric',
}: {
  cityName: string
  units?: UnitMeasurement
}): Promise<CityWeatherData> => {
  const { data } = await request.get<WeatherData>('weather', {
    params: {
      q: cityName,
      units,
    },
  })

  return {
    temperature: Math.ceil(data.main.temp),
    condition: data.weather[0].main,
    wind: Math.ceil(data.wind.speed),
    humidity: data.main.humidity,
  }
}

export const fetchForecastDataByCityName = async ({
  cityName,
  units = 'metric',
}: {
  cityName: string
  units?: UnitMeasurement
}): Promise<AxiosResponse<ForecastData>> =>
  request.get('forecast', {
    params: {
      q: cityName,
      units,
    },
  })

// Effector
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

export const getCitiesWeatherDataFx = createEffect<
  { cities: CityModel[]; units?: UnitMeasurement },
  Record<string, WeatherData>,
  AxiosError
>(async ({ cities, units = 'metric' }) => {
  const citiesWeatherDataMap: Record<string, WeatherData> = {}

  for (const city of cities) {
    // eslint-disable-next-line no-await-in-loop
    const { data } = await request.get<WeatherData>('weather', {
      params: {
        q: city.name,
        units,
      },
    })
    citiesWeatherDataMap[data.name] = { ...data }
  }

  return citiesWeatherDataMap
})

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

export const getWeatherDataForCityFx = createEffect<
  {
    cityName: string
    units?: UnitMeasurement
  },
  CityWeatherData,
  AxiosError
>(async ({ cityName, units = 'metric' }) => {
  const { data } = await request.get<WeatherData>('weather', {
    params: {
      q: cityName,
      units,
    },
  })

  return {
    temperature: Math.ceil(data.main.temp),
    condition: data.weather[0].main,
    wind: Math.ceil(data.wind.speed),
    humidity: data.main.humidity,
  }
})

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
