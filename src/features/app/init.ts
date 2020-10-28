import { forward } from 'effector'

import { checkAuthFx } from '~/api/auth'
import { loadThemeFx } from '~/features/theme'

import { AppGate } from './model'

forward({
  from: AppGate.open,
  to: [checkAuthFx, loadThemeFx],
})
