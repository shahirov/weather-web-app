import { createStore } from 'effector'

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

$user.watch(console.log)

export const $isAuthenticated = $user.map(Boolean)
