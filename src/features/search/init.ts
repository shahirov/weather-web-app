import { guard, sample } from 'effector'

import { getCitiesBySearchFx } from '~/api/cities'

import { debounce } from './lib/debounce'
import {
  $citiesBySearch,
  $searchedCity,
  onSelectedItemChange,
  setSearchValue,
} from './model'

$citiesBySearch.on(
  getCitiesBySearchFx.doneData,
  (_, { data: { data: cities } }) => cities,
)
$searchedCity.on(onSelectedItemChange, (_, { selectedItem }) => selectedItem)

const debouncedValue = debounce({
  source: setSearchValue,
  timeout: 300,
})

sample({
  source: guard(debouncedValue, {
    filter: (value) => value.length > 0,
  }),
  fn: (value) => ({
    cityNamePrefix: value,
    sort: 'name' as const,
    limit: 5,
    offset: 0,
  }),
  target: getCitiesBySearchFx,
})
