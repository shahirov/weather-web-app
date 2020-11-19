import { createStore } from 'effector'
import { createGate } from 'effector-react'

import { WeatherData } from '~/api/types'

export const HomePageGate = createGate()

export const $citiesWeatherData = createStore<Record<string, WeatherData>>({})
