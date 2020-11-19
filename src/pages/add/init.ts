import { forward, guard, sample } from 'effector'

import { addCityFx } from '~/api/cities'
import {
  getFavoriteCityWeatherDataFx,
  getWeatherDataByCityNameFx,
} from '~/api/weather'
import { $selectedCity } from '~/features/search'

import {
  $cityAdded,
  $favoriteCityName,
  $favoriteCityWeatherData,
  $selectedCityweatherData,
  AddPageGate,
  timeout,
} from './model'

$selectedCityweatherData
  .on(getWeatherDataByCityNameFx.doneData, (_, { data }) => data)
  .reset([AddPageGate.open, AddPageGate.close])

$favoriteCityWeatherData
  .on(getFavoriteCityWeatherDataFx.doneData, (_, { data }) => data)
  .reset(AddPageGate.close)

$cityAdded.on(addCityFx.done, () => true).reset(timeout.done)

forward({
  from: addCityFx.done,
  to: timeout,
})

sample({
  source: guard($selectedCity, { filter: Boolean }),
  fn: (city) => ({ cityName: city.name }),
  target: getWeatherDataByCityNameFx,
})

sample({
  source: $favoriteCityName,
  clock: AddPageGate.open,
  fn: (cityName) => ({ cityName }),
  target: getFavoriteCityWeatherDataFx,
})
