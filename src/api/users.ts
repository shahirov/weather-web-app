import { database, firebase } from '~/lib/firebase'

import { UserProfile } from './types'

const usersRef = database.collection('/users')

export const getUserProfile = async (
  user: firebase.User | null,
): Promise<UserProfile | null> => {
  if (!user) return null

  const userProfileRef = usersRef.doc(user.uid)
  const userProfileSnapshot = await userProfileRef.get()
  const data = userProfileSnapshot.data()

  if (!userProfileSnapshot.exists || !data) {
    return null
  }

  return data as UserProfile
}

export const createUserProfile = async (
  user: firebase.User | null,
): Promise<UserProfile | null> => {
  if (!user) return null

  const userProfileRef = usersRef.doc(user.uid)
  const userProfileSnapshot = await userProfileRef.get()

  if (!userProfileSnapshot.exists) {
    await userProfileRef.set({
      id: user.uid,
      email: user.email,
      photoUrl: user.photoURL,
    })
  }

  return getUserProfile(user)
}
