import { combine, createStore } from 'effector'

import {
  getCurrentUserFx,
  logoutFx,
  signInViaEmailFx,
  signUpViaEmailFx,
} from '~/api/auth'
import { UserDocumentData } from '~/api/types'

export const $user = createStore<UserDocumentData | null>(null)
  .on(
    [
      signUpViaEmailFx.doneData,
      signInViaEmailFx.doneData,
      getCurrentUserFx.doneData,
    ],
    (_, user) => user,
  )
  .reset(logoutFx.done)

export const $isAuthenticated = $user.map(Boolean)

export const $authenticationPending = combine(
  $user,
  getCurrentUserFx.pending,
  (user, pending) => !user && pending,
)