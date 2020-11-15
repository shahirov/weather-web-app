import { sample } from 'effector'

import { getCitiesFx } from '~/api/cities'
import { $user } from '~/features/auth'
import { $cities } from '~/features/cities'

import { HomePageGate } from './model'

$cities.reset(HomePageGate.close)

sample({
  source: $user,
  clock: HomePageGate.open,
  fn: (user) => ({ user }),
  target: getCitiesFx,
})
