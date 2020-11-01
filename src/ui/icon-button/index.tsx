/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  'aria-label': string
  onClick: (
    event: React.KeyboardEvent | React.MouseEvent | KeyboardEvent,
  ) => void
}

export const IconButton = ({ children, ...props }: Props) => (
  <Button {...props}>{children}</Button>
)

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  border: 0;
  margin: 0 1rem 0 -0.75rem;
  padding: 0.75rem;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  overflow: visible;
  background: transparent;
  user-select: none;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 960px) {
    margin-right: 0;
    width: 72px;
  }
`
