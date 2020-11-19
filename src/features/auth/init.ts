import { forward } from 'effector'

import {
  checkAuthFx,
  logoutFx,
  signInViaEmailFx,
  signUpViaEmailFx,
} from '~/api/auth'
import { getUserProfileFx } from '~/api/users'

import { $didRequest, $user, logout } from './model'

$user
  .on(
    [
      signUpViaEmailFx.doneData,
      signInViaEmailFx.doneData,
      getUserProfileFx.doneData,
    ],
    (_, user) => user,
  )
  .reset(logoutFx.done)

$didRequest.on(getUserProfileFx.done, () => true)

/**
 * check firebase authentication session
 * and get user's data from firestore
 */
forward({
  from: checkAuthFx.doneData,
  to: getUserProfileFx,
})

forward({
  from: logout,
  to: logoutFx,
})
