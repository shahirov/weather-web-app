import { createEffect, createEvent, createStore } from 'effector'

import {
  getCurrentUserFx,
  logoutFx,
  signInViaEmailFx,
  signUpViaEmailFx,
} from '~/api/auth'
import { UserDocumentData } from '~/api/types'
import { history } from '~/lib/history'

export const redirectUserFx = createEffect((path: string) => {
  history.replace(path)
})

export const logout = createEvent<React.MouseEvent<HTMLButtonElement>>()

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

export const $didRequest = createStore(false).on(
  getCurrentUserFx.done,
  () => true,
)
