import { forward, guard } from 'effector'

import { signInViaEmailFx } from '~/api/auth'

import { formValidated, reset, setServerError } from './model'

forward({
  from: formValidated,
  to: signInViaEmailFx,
})

forward({
  from: signInViaEmailFx.done,
  to: reset,
})

guard({
  source: signInViaEmailFx.failData,
  filter: Boolean,
  target: setServerError,
})
