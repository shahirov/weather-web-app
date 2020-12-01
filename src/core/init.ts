import '~/features/auth/init'
import '~/features/theme/init'
import '~/features/search/init'
import '~/features/weather/init'
import '~/features/cities/init'
import '~/pages/home/init'
import '~/pages/add/init'
import '~/pages/details/init'

import { forward } from 'effector'

import { loadThemeFx } from '~/features/theme'

import { AppGate } from './model'

forward({
  from: AppGate.open,
  to: [loadThemeFx],
})
