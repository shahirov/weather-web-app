import { guard, sample } from 'effector'

import { addCityFx, getSuggestedCitiesByNameFx } from '~/api/cities'

import { debounce } from './lib/debounce'
import {
  $inputValue,
  $selectedCity,
  $suggestedCities,
  handleInputValue,
  onSelectedItemChange,
} from './model'

const debouncedValue = debounce({
  source: handleInputValue,
  timeout: 300,
})

$suggestedCities
  .on(
    getSuggestedCitiesByNameFx.doneData,
    (_, { data: { data: cities } }) => cities,
  )
  .reset(addCityFx.done)

$selectedCity
  .on(onSelectedItemChange, (_, { selectedItem: selectedCity }) => selectedCity)
  .reset(addCityFx.done)

$inputValue
  .on(handleInputValue, (_, inputValue) => inputValue)
  .reset(addCityFx.done)

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
