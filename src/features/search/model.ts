import { UseComboboxStateChange } from 'downshift'
import { createEvent, createStore } from 'effector'

import { City } from '~/api/types'

export const onSelectedItemChange = createEvent<UseComboboxStateChange<City>>()
export const handleInputValue = createEvent<string>()

export const $suggestedCities = createStore<City[]>([])
export const $selectedCity = createStore<City | null>(null)
