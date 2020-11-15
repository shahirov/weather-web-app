import { createStore } from 'effector'

import { CityModel } from '~/api/types'

export const $cities = createStore<CityModel[]>([])
