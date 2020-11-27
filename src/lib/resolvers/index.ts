import { firebase } from '~/lib/firebase'
import { ValidationErrors } from '~/lib/form'

type DefaultValues = {
  email: string
  password: string
  [key: string]: string
}

const validEmailRegex = new RegExp(
  /[\d!#$%&'*+=?^_`a-z{|}~-]+(?:\.[\d!#$%&'*+=?^_`a-z{|}~-]+)*@(?:[\da-z](?:[\da-z-]*[\da-z])?\.)+[\da-z](?:[\da-z-]*[\da-z])?/,
)

export const clientSideResolver = <T extends DefaultValues>(
  errs: ValidationErrors<T>,
  values: T,
): ValidationErrors<T> => {
  const errors = { ...errs }

  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  if (!values.email.match(validEmailRegex)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.password.length < 6) {
    errors.password = 'Password should be at least 6 characters long.'
  }

  return errors
}

export const serverSideResolver = <T extends DefaultValues>(
  errors: ValidationErrors<T>,
  error: firebase.auth.AuthError,
): ValidationErrors<T> => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return { ...errors, email: error.message }
    case 'auth/invalid-email':
      return { ...errors, email: error.message }
    case 'auth/weak-password':
      return { ...errors, password: error.message }
    case 'auth/user-not-found':
      return {
        ...errors,
        email: 'There is no user under this email. Try to pass another email.',
      }
    case 'auth/wrong-password':
      return { ...errors, password: error.message }
    default:
      return errors
  }
}
