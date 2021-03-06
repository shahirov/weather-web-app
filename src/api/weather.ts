import axios, { AxiosResponse } from 'axios'

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
