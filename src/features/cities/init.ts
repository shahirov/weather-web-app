import { guard, sample } from 'effector'

import { getCitiesFx } from '~/api/cities'
import { getUserProfileFx } from '~/api/users'

import { $cities } from './model'

$cities.on(getCitiesFx.doneData, (_, cities) => Object.values(cities))

sample({
  source: guard(getUserProfileFx.doneData, { filter: Boolean }),
  fn: (user) => ({ user }),
  target: getCitiesFx,
})
