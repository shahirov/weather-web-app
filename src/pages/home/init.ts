import { sample } from 'effector'

import { getCitiesFx } from '~/api/cities'
import { getCitiesWeatherDataFx } from '~/api/weather'
import { $user } from '~/features/auth'
import { $cities } from '~/features/cities'

import { $citiesWeatherData, HomePageGate } from './model'

$citiesWeatherData
  .on(getCitiesWeatherDataFx.doneData, (_, data) => data)
  .reset(HomePageGate.close)

$cities.reset(HomePageGate.close)

sample({
  source: $user,
  clock: HomePageGate.open,
  fn: (user) => ({ user }),
  target: getCitiesFx,
})

sample({
  source: $cities,
  clock: getCitiesFx.done,
  fn: (cities) => ({ cities }),
  target: getCitiesWeatherDataFx,
})
