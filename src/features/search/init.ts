import { guard, sample } from 'effector'

import { getSuggestedCitiesByNameFx } from '~/api/cities'
import { getWeatherDataByCityNameFx } from '~/api/weather'

import { debounce } from './lib/debounce'
import {
  $selectedCity,
  $suggestedCities,
  handleInputValue,
  onSelectedItemChange,
} from './model'

$suggestedCities.on(
  getSuggestedCitiesByNameFx.doneData,
  (_, { data: { data: cities } }) => cities,
)
$selectedCity.on(
  onSelectedItemChange,
  (_, { selectedItem: selectedCity }) => selectedCity,
)

const debouncedValue = debounce({
  source: handleInputValue,
  timeout: 300,
})

sample({
  source: guard(debouncedValue, {
    filter: (value) => value.length > 0,
  }),
  fn: (prefix) => ({
    cityNamePrefix: prefix,
    sort: 'name' as const,
    limit: 5,
    offset: 0,
  }),
  target: getSuggestedCitiesByNameFx,
})

sample({
  source: guard($selectedCity, {
    filter: Boolean,
  }),
  fn: (city) => ({ cityName: city.name }),
  target: getWeatherDataByCityNameFx,
})
