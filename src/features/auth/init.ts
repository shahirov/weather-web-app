import { forward, sample } from 'effector'

import { checkAuthFx, getCurrentUserFx, logoutFx } from '~/api/auth'
import { paths } from '~/core/paths'
import { history } from '~/lib/history'

import { $didRequest, $user, logout, redirectUserFx } from './model'

/**
 * check firebase authentication session
 * and get user's data from firestore
 */
forward({
  from: checkAuthFx.doneData,
  to: getCurrentUserFx,
})

forward({
  from: logout,
  to: logoutFx,
})

/**
 * redirect a user to login page
 * if he is not authenticated
 */
sample({
  source: $user,
  clock: $didRequest,
  fn: (user, didRequest) =>
    user === null && didRequest ? paths.login : paths.home,
  target: redirectUserFx,
})

/**
 * redirect a user when he is logging out
 */
sample({
  source: logoutFx.done,
  fn: () => paths.login,
  target: redirectUserFx,
})

/**
 * redirect a user to home page
 * if sign up or log in was success
 */
$user.watch((user) => {
  const { pathname } = history.location

  const shouldRedirectToHome =
    user !== null && (pathname === paths.signup || pathname === paths.login)

  if (shouldRedirectToHome) {
    history.replace(paths.home)
  }
})
