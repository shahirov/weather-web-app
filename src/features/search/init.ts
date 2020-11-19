import { guard, sample } from 'effector'

import { addCityFx, getSuggestedCitiesByNameFx } from '~/api/cities'

import { debounce } from './lib/debounce'
import {
  $inputValue,
  $selectedCity,
  $suggestedCities,
  handleInputValueChange,
  onSelectedItemChange,
} from './model'

const debouncedInputValue = debounce({
  source: handleInputValueChange,
  timeout: 300,
})

$suggestedCities
  .on(
    getSuggestedCitiesByNameFx.doneData,
    (_, { data: { data: cities } }) => cities,
  )
  .reset(addCityFx.done)

$inputValue
  .on(handleInputValueChange, (_, inputValue) => inputValue)
  .reset(addCityFx.done)

$selectedCity
  .on(onSelectedItemChange, (_, { selectedItem }) => selectedItem)
  .reset(addCityFx.done)

sample({
  source: guard(debouncedInputValue, {
    filter: Boolean,
  }),
  fn: (inputValue) => ({
    cityNamePrefix: inputValue,
    sort: 'name' as const,
    limit: 5,
    offset: 0,
  }),
  target: getSuggestedCitiesByNameFx,
})
