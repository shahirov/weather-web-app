import '~/features/auth/init'
import '~/features/theme/init'
import '~/pages/login/init'
import '~/pages/signup/init'

import { forward } from 'effector'

import { checkAuthFx } from '~/api/auth'
import { loadThemeFx } from '~/features/theme'

import { AppGate } from './model'

forward({
  from: AppGate.open,
  to: [checkAuthFx, loadThemeFx],
})
