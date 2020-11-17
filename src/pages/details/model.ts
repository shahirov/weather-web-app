import { createStore } from 'effector'
import { createGate } from 'effector-react'

import { CityWeatherData } from '~/api/types'

export type DayForecast = {
  condition: string
  counter: number
  temperature: number
}

export type DaysForecast = Record<string, DayForecast>

export const DetailsPageGate = createGate<string>()

export const $cityWeatherData = createStore<CityWeatherData | null>(null)
export const $daysForecastData = createStore<DaysForecast | null>(null)
