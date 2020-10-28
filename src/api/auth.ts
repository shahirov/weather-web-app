/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createEffect } from 'effector'

import { auth, db, firebase } from '~/lib/firebase'

import { UserDocumentData } from './types'

const usersRef = db.collection('/users')

export const getCurrentUserFx = createEffect<
  firebase.User | null,
  UserDocumentData | null,
  firebase.firestore.FirestoreError
>(async (user) => {
  if (!user) return null

  const userRef = usersRef.doc(user.uid)
  const snapshot = await userRef.get()
  const userData = snapshot.data()

  if (!userData) return null

  return userData as UserDocumentData
})

export const createUserDocumentFx = createEffect<
  firebase.User | null,
  UserDocumentData | null,
  firebase.firestore.FirestoreError
>(async (user) => {
  if (!user) return null

  const userRef = usersRef.doc(user.uid)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const createdAt = new Date()
    await userRef.set({
      email: user.email,
      photoUrl: user.photoURL,
      createdAt,
    })
  }

  return getCurrentUserFx(user)
})

export const signUpViaEmailFx = createEffect<
  {
    email: string
    password: string
  },
  UserDocumentData | null,
  firebase.auth.AuthError
>(async ({ email, password }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  return createUserDocumentFx(user)
})

export const signInViaEmailFx = createEffect<
  {
    email: string
    password: string
  },
  UserDocumentData | null,
  firebase.auth.AuthError
>(async ({ email, password }) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password)
  return getCurrentUserFx(user)
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
