import { forward } from 'effector'

import { checkAuthFx, getCurrentUserFx } from '~/api/auth'
import { history } from '~/lib/history'
import { paths } from '~/pages/paths'

import { $user } from './model'

/**
 * check firebase authentication session
 * and get user's data from firestore
 */
forward({
  from: checkAuthFx.doneData,
  to: getCurrentUserFx,
})

/**
 * redirects a user if sign up or log in was success
 */
$user.watch((user) => {
  const { pathname } = history.location

  const shouldRedirect =
    user !== null && (pathname === paths.signup() || pathname === paths.login())

  if (shouldRedirect) {
    history.replace(paths.home())
  }
})
