import { auth, firebase } from '~/lib/firebase'

import { UserProfile } from './types'
import { createUserProfile, getUserProfile } from './users'

export const signUpViaEmail = async (
  email: string,
  password: string,
): Promise<UserProfile | null> => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  return createUserProfile(user)
}

export const signInViaEmail = async (
  email: string,
  password: string,
): Promise<UserProfile | null> => {
  const { user } = await auth.signInWithEmailAndPassword(email, password)
  return getUserProfile(user)
}

export const checkAuth = (): Promise<firebase.User | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
