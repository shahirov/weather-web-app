import React from 'react'
import styled from 'styled-components'

import { FormCard, FormNotice, Row } from '~/ui'

export const LoginPage = () => {
  return (
    <Row as={Paper} align="center" justify="center">
      <FormCard title="Login" text="Welcome Back!">
        <Row as={Form} direction="column" align="center">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="button">Login</Button>
        </Row>
        <FormNotice
          text="Don't have an account?"
          link="/signup"
          textLink="Signup"
        />
      </FormCard>
    </Row>
  )
}

const Paper = styled.div`
  width: 90vw;
  min-height: 90vh;
  overflow: hidden;
`

const Form = styled.form`
  width: 80%;
  animation: 2s ease-in-out slide-down;
`

const Input = styled.input`
  margin: 1rem 0;
  padding: 1.5rem;
  width: 100%;
  border-radius: 2rem;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.3);
  border: none;
  outline: 0;
`

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 1rem;
  width: 60%;
  font-size: 1.2rem;
  line-height: 1.7rem;
  border-radius: 2rem;
  color: #fff;
  background: #00ff9b;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  border: none;
  outline: none;
  cursor: pointer;

  &:disabled {
    background: #d3d3d3;
  }

  &:hover,
  &:focus {
    background: linear-gradient(to right, #03a9f4, #00ff9b);
  }
`
