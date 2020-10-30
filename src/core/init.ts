import '~/features/auth/init'
import '~/features/theme/init'
import '~/pages/login/init'
import '~/pages/signup/init'

import { createEffect, forward, sample } from 'effector'

import { checkAuthFx } from '~/api/auth'
import { loadThemeFx } from '~/features/theme'
import { history } from '~/lib/history'
import { paths } from '~/pages/paths'

import { AppGate } from './model'

const redirectFx = createEffect((path: string) => {
  history.replace(path)
})

forward({
  from: AppGate.open,
  to: [checkAuthFx, loadThemeFx],
})

sample({
  source: checkAuthFx.doneData,
  fn: (user) => (user === null ? paths.login() : paths.home()),
  target: redirectFx,
})
