import { createEffect } from 'effector'

import { database, firebase } from '~/lib/firebase'

import { UserProfile } from './types'

const usersRef = database.collection('/users')

export const getUserProfileFx = createEffect<
  firebase.User | null,
  UserProfile | null,
  firebase.firestore.FirestoreError
>(async (user) => {
  if (!user) return null

  const userProfileRef = usersRef.doc(user.uid)
  const userProfileSnapshot = await userProfileRef.get()
  const data = userProfileSnapshot.data()

  if (!userProfileSnapshot.exists || !data) {
    return null
  }

  return data as UserProfile
})

export const createUserProfileFx = createEffect<
  firebase.User | null,
  UserProfile | null,
  firebase.firestore.FirestoreError
>(async (user) => {
  if (!user) return null

  const userProfileRef = usersRef.doc(user.uid)
  const userProfileSnapshot = await userProfileRef.get()

  if (!userProfileSnapshot.exists) {
    await userProfileRef.set({
      id: user.uid,
      email: user.email,
      photoUrl: user.photoURL,
      createdAt: new Date(),
    })
  }

  return getUserProfileFx(user)
})
