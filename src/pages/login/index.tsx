/* eslint-disable unicorn/prefer-regexp-test */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useAppDispatch } from '~/core/store'
import { AuthError, signInWithEmail } from '~/features/auth'
import { addAuthError } from '~/lib/utils'
import { Button, FormCard, FormNotice, Input, Row } from '~/ui'

type FormValues = {
  email: string
  password: string
}

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async ({ email, password }: FormValues) => {
    const action = await dispatch(signInWithEmail({ email, password }))
    if (signInWithEmail.rejected.match(action)) {
      addAuthError(action.payload as AuthError, setError)
    }
  }

  return (
    <FormCard title="Login" text="Welcome Back!">
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
            // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Please enter a valid email address',
            },
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
          Login
        </Button>
      </Form>
      <FormNotice
        text="Don't have an account? "
        link="/signup"
        textLink="Sign Up"
      />
    </FormCard>
  )
}

const Form = styled(Row)`
  width: 80%;
  animation: 2s ease-in-out slide-down;
`

const ErrorMessage = styled.div`
  width: 100%;
  padding-left: 0.63rem;
  color: #ff0000;
`
