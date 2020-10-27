import { createEvent } from 'effector'

import { signUpViaEmailFx } from '~/api/auth'
import { firebase } from '~/lib/firebase'
import { createForm } from '~/lib/form'
import { clientSideResolver } from '~/lib/resolvers'

export const {
  $values,
  $errors,
  $isValid,
  handleChange,
  handleSubmit,
  formValidated,
  reset,
} = createForm({
  validateOn: 'submit',
  initialValues: {
    email: '',
    password: '',
  },
  errors: {
    email: '',
    password: '',
  },
  resolver: clientSideResolver,
})

export const setServerError = createEvent<firebase.auth.AuthError>()

export const $isSubmitting = signUpViaEmailFx.pending
