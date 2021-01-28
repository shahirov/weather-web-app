import React from 'react'
import styled from 'styled-components'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <FormControl>
    <InputBase {...props} ref={ref} />
  </FormControl>
))

const FormControl = styled.div`
  width: 100%;
`

const InputBase = styled.input`
  margin: 1rem 0;
  padding: 1.5rem;
  width: 100%;
  border-radius: 2rem;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.3);
  border: none;
  outline: 0;
`
