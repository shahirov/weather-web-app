/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useAppDispatch } from '~/core/store'
import { AuthError, signUpWithEmail } from '~/features/auth'
import { addAuthError } from '~/lib/utils'
import { Button, FormCard, FormNotice, Input, Row } from '~/ui'

type FormValues = {
  email: string
  password: string
}

export const SignupPage = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({ mode: 'onSubmit' })

  const onSubmit = async ({ email, password }: FormValues) => {
    const action = await dispatch(signUpWithEmail({ email, password }))
    // eslint-disable-next-line unicorn/prefer-regexp-test
    if (signUpWithEmail.rejected.match(action)) {
      addAuthError(action.payload as AuthError, setError)
    }
  }

  return (
    <FormCard title="Signup" text="Join Weatherio Today">
      <Form
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        align="center"
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          ref={register({
            required: 'Please enter your email',
            validate: (value: string) =>
              // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
              value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) ||
              'Please enter a valid email address',
          })}
          disabled={isSubmitting}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <Input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: 'Please enter your password',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters long',
            },
          })}
          disabled={isSubmitting}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Signup
        </Button>
      </Form>
      <FormNotice
        text="Already have an account? "
        link="/login"
        textLink="Log In"
      />
    </FormCard>
  )
}

const Form = styled(Row)`
  width: 85%;
  animation: 2s ease-in-out slide-down;
`

const ErrorMessage = styled.div`
  width: 100%;
  padding-left: 0.63rem;
  color: #ff0000;
`
