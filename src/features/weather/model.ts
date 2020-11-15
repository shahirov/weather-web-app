import { createEvent, createStore } from 'effector'
import { createGate } from 'effector-react'

import { ForecastData, WeatherData } from '~/api/types'

type CityName = string

export const InitGate = createGate<string>()
export const update = createEvent<string>()

export const addCity = createEvent<React.MouseEvent<HTMLButtonElement>>()

export const $citiesWeatherData = createStore<Record<CityName, WeatherData>>({})
export const $cityForecastData = createStore<ForecastData | null>(null)
