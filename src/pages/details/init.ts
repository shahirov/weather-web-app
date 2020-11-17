import { forward, guard, sample } from 'effector'

import {
  getForecastDataByCityNameFx,
  getWeatherDataForCity,
} from '~/api/weather'

import {
  $cityWeatherData,
  $daysForecastData,
  DaysForecast,
  DetailsPageGate,
} from './model'

$daysForecastData
  .on(getForecastDataByCityNameFx.doneData, (_, { data }) => {
    const daysForecast: DaysForecast = {}

    for (const value of data.list) {
      const date = new Date(value.dt_txt).toDateString().split(' ')[0]

      if (daysForecast[date]) {
        daysForecast[date].counter += 1
        daysForecast[date].temperature += value.main.temp
      } else {
        daysForecast[date] = {
          condition: value.weather[0].main,
          temperature: value.main.temp,
          counter: 1,
        }
      }
    }

    Object.keys(daysForecast).forEach((day) => {
      daysForecast[day].temperature = Math.round(
        daysForecast[day].temperature / daysForecast[day].counter,
      )
    })
    delete daysForecast[Object.keys(daysForecast)[0]]

    return daysForecast
  })
  .reset(DetailsPageGate.close)

$cityWeatherData
  .on(getWeatherDataForCity.doneData, (_, data) => data)
  .reset(DetailsPageGate.close)

forward({
  from: sample({
    source: DetailsPageGate.state,
    clock: guard(DetailsPageGate.state, {
      filter: (cityName) => typeof cityName === 'string',
    }),
    fn: (cityName) => ({ cityName }),
  }),
  to: [getWeatherDataForCity, getForecastDataByCityNameFx],
})
