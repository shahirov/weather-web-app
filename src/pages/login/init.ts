import { forward, guard } from 'effector'

import { signInViaEmailFx } from '~/api/auth'

import { formValidated, LogInGate, reset, setServerError } from './model'

forward({
  from: formValidated,
  to: signInViaEmailFx,
})

forward({
  from: [signInViaEmailFx.done, LogInGate.close],
  to: reset,
})

guard({
  source: signInViaEmailFx.failData,
  filter: Boolean,
  target: setServerError,
})
