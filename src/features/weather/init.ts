import { sample } from 'effector'

import { addCityFx } from '~/api/cities'
import { $user } from '~/features/auth'
import { $selectedCity } from '~/features/search'

import { addCity } from './model'

sample({
  source: {
    user: $user,
    city: $selectedCity,
  },
  clock: addCity,
  fn: ({ user, city }) => ({ user, city }),
  target: addCityFx,
})
