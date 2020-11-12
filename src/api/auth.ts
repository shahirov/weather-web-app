import { createEffect } from 'effector'

import { auth, firebase } from '~/lib/firebase'

import { UserProfile } from './types'
import { createUserProfileFx, getUserProfileFx } from './users'

export const signUpViaEmailFx = createEffect<
  {
    email: string
    password: string
  },
  UserProfile | null,
  firebase.auth.AuthError
>(async ({ email, password }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  return createUserProfileFx(user)
})

export const signInViaEmailFx = createEffect<
  {
    email: string
    password: string
  },
  UserProfile | null,
  firebase.auth.AuthError
>(async ({ email, password }) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password)
  return getUserProfileFx(user)
})

export const logoutFx = createEffect<void, void, firebase.auth.AuthError>(() =>
  auth.signOut(),
)

export const checkAuthFx = createEffect<
  void,
  firebase.User | null,
  firebase.auth.AuthError
>(
  () =>
    new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      }, reject)
    }),
)
