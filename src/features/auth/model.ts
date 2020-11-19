import { createEvent, createStore } from 'effector'

import { UserProfile } from '~/api/types'

export const logout = createEvent<React.MouseEvent<HTMLButtonElement>>()

export const $user = createStore<UserProfile | null>(null)

export const $didRequest = createStore(false)

export const $isAuthenticated = $user.map(Boolean)
