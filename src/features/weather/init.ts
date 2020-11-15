import { guard, sample } from 'effector'

import { addCityFx } from '~/api/cities'
import {
  getForecastDataByCityNameFx,
  getWeatherDataByCityNameFx,
} from '~/api/weather'
import { $user } from '~/features/auth'
import { $selectedCity } from '~/features/search'

import {
  $citiesWeatherData,
  $cityForecastData,
  addCity,
  InitGate,
} from './model'

$citiesWeatherData
  .on(getWeatherDataByCityNameFx.doneData, (state, { data }) => {
    return {
      ...state,
      [data.name]: { ...data },
    }
  })
  .reset(InitGate.close)
$cityForecastData.on(
  getForecastDataByCityNameFx.doneData,
  (_, { data }) => data,
)

sample({
  source: guard(InitGate.state, {
    filter: (cityName) => cityName.length > 0,
  }),
  fn: (cityName) => ({ cityName }),
  target: getWeatherDataByCityNameFx,
})

sample({
  source: {
    user: $user,
    city: $selectedCity,
  },
  clock: addCity,
  fn: ({ user, city }) => ({ user, city }),
  target: addCityFx,
})
