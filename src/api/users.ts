import { createEffect } from 'effector'

import { database, firebase } from '~/lib/firebase'

import { User } from './types'

const usersRef = database.collection('/users')

export const getCurrentUserFx = createEffect<
  firebase.User | null,
  User | null,
  firebase.firestore.FirestoreError
>(async (user) => {
  if (!user) return null

  const userRef = usersRef.doc(user.uid)
  const snapshot = await userRef.get()
  const userData = snapshot.data()

  if (!userData) return null

  return userData as User
})

export const createUserDocumentFx = createEffect<
  firebase.User | null,
  User | null,
  firebase.firestore.FirestoreError
>(async (user) => {
  if (!user) return null

  const userRef = usersRef.doc(user.uid)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const createdAt = new Date()
    await userRef.set({
      id: user.uid,
      email: user.email,
      photoUrl: user.photoURL,
      createdAt,
    })
  }

  return getCurrentUserFx(user)
})
