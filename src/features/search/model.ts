import { UseComboboxStateChange } from 'downshift'
import { createEvent, createStore } from 'effector'

import { City } from '~/api/types'

export const onSelectedItemChange = createEvent<UseComboboxStateChange<City>>()
export const setSearchValue = createEvent<string>()

export const $citiesBySearch = createStore<City[]>([])
export const $searchedCity = createStore<City | null | undefined>(null)
