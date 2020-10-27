import { useStore } from 'effector-react'
import React from 'react'
import styled from 'styled-components'

import { Button, Field, FormCard, FormNotice, Row } from '~/ui'

import {
  $errors,
  $isSubmitting,
  $isValid,
  $values,
  handleChange,
  handleSubmit,
} from './model'

export const LoginPage = () => {
  const { email, password } = useStore($values)
  const errors = useStore($errors)
  const submitting = useStore($isSubmitting)
  const valid = useStore($isValid)

  return (
    <FormCard title="Login" text="Welcome Back!">
      <Form as="form" onSubmit={handleSubmit} direction="column" align="center">
        <Field
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          disabled={submitting}
          error={errors.email}
        />
        <Field
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          disabled={submitting}
          error={errors.password}
        />
        <Button type="submit" disabled={submitting || !valid}>
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
