import { UseComboboxStateChange } from 'downshift'
import { createEvent, createStore } from 'effector'

import { SuggestedCity } from '~/api/types'

export const onSelectedItemChange = createEvent<
  UseComboboxStateChange<SuggestedCity>
>()
export const handleInputValue = createEvent<string>()

export const $suggestedCities = createStore<SuggestedCity[]>([])
export const $selectedCity = createStore<SuggestedCity | null>(null)
export const $inputValue = createStore<string>('')
