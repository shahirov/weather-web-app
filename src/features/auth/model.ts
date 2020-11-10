import { createEffect, createEvent, createStore } from 'effector'

import { UserDocumentData } from '~/api/types'
import { history } from '~/lib/history'

export const redirectUserFx = createEffect((path?: string) => {
  if (path) history.replace(path)
})

export const logout = createEvent<React.MouseEvent<HTMLButtonElement>>()

export const $user = createStore<UserDocumentData | null>(null)
export const $didRequest = createStore(false)

export const $isAuthenticated = $user.map(Boolean)
