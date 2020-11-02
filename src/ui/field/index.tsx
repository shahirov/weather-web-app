import { Event } from 'effector'
import React from 'react'
import styled from 'styled-components'

interface Props extends React.ComponentPropsWithRef<'input'> {
  onChange?: Event<React.ChangeEvent<HTMLInputElement>>
  error?: string
}

export const Field = ({
  name,
  value,
  type,
  placeholder,
  onChange,
  disabled,
  error,
  ref,
}: Props) => {
  return (
    <FormControl>
      <Input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormControl>
  )
}

const FormControl = styled.div`
  width: 100%;
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

const ErrorMessage = styled.div`
  padding-left: 0.63rem;
  color: #ff0000;
`
