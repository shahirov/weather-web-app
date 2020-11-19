import { combine, createEffect, createStore } from 'effector'
import { createGate } from 'effector-react'

import { WeatherData } from '~/api/types'
import { $cities } from '~/features/cities'

export const AddPageGate = createGate<string>()

export const timeout = createEffect(
  () => new Promise((resolve) => setTimeout(resolve, 2500)),
)

export const $favoriteCityName = createStore('Moscow')
export const $selectedCityweatherData = createStore<WeatherData | null>(null)
export const $favoriteCityWeatherData = createStore<WeatherData | null>(null)
export const $cityAdded = createStore<boolean>(false)

export const $favoriteCityFollowed = combine(
  $cities,
  $favoriteCityName,
  (cities, favCityName) => cities.find((city) => city.name === favCityName),
)
