import { forward, sample } from 'effector'

import { addCityFx } from '~/api/cities'
import { getFavoriteCityWeatherDataFx } from '~/api/weather'
import { $citiesWeatherData } from '~/features/weather'

import {
  $cityAdded,
  $favoriteCityName,
  $favoriteCityWeatherData,
  AddPageGate,
  timeout,
} from './model'

$favoriteCityWeatherData
  .on(getFavoriteCityWeatherDataFx.doneData, (_, { data }) => data)
  .reset([AddPageGate.open, AddPageGate.close])
$cityAdded.on(addCityFx.done, () => true).reset(timeout.done)
$citiesWeatherData.reset(AddPageGate.close)

forward({
  from: addCityFx.done,
  to: timeout,
})

sample({
  source: $favoriteCityName,
  clock: AddPageGate.open,
  fn: (cityName) => ({ cityName }),
  target: getFavoriteCityWeatherDataFx,
})
