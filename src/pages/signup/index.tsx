import { useGate, useStore } from 'effector-react'
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
  SignUpGate,
} from './model'

export const SignupPage = () => {
  useGate(SignUpGate)

  const { email, password } = useStore($values)
  const errors = useStore($errors)
  const submitting = useStore($isSubmitting)
  const valid = useStore($isValid)

  return (
    <FormCard title="Signup" text="Join Weatherio Today">
      <Form
        as="form"
        noValidate
        onSubmit={handleSubmit}
        direction="column"
        align="center"
      >
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
