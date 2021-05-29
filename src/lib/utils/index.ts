import { ErrorOption } from 'react-hook-form'

export const addAuthError = <
  E extends { code: string; message: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FielValues extends Record<string, any>,
>(
  error: E,
  setError: (name: keyof FielValues, error: ErrorOption) => void,
): void | E => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return setError('email', {
        type: 'auth-error',
        message: error.message,
      })
    case 'auth/invalid-email':
      return setError('email', {
        type: 'auth-error',
        message: error.message,
      })
    case 'auth/user-not-found':
      return setError('email', {
        type: 'auth-error',
        message: 'There is no user under this email. Try to pass another email',
      })
    case 'auth/weak-password':
      return setError('password', {
        type: 'auth-error',
        message: error.message,
      })
    case 'auth/wrong-password':
      return setError('password', {
        type: 'auth-error',
        message: error.message,
      })
    default:
      return error
  }
}
