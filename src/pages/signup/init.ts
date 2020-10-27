import { forward, guard } from 'effector'

import { signUpViaEmailFx } from '~/api/auth'
import { serverSideResolver } from '~/lib/resolvers'

import { $errors, formValidated, reset, setServerError } from './model'

$errors.on(setServerError, serverSideResolver)

/**
 * when form is submitted and successfull validated
 * sign up a user
 */
forward({
  from: formValidated,
  to: signUpViaEmailFx,
})

/**
 * reset form when user signs up
 */
forward({
  from: signUpViaEmailFx.done,
  to: reset,
})

/**
 * if sign up will be failed set server validation errors
 */
guard({
  source: signUpViaEmailFx.failData,
  filter: Boolean,
  target: setServerError,
})
