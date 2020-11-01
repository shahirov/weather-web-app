import React from 'react'
import styled from 'styled-components'

import { Row } from '~/ui/row'

type Props = {
  children: React.ReactNode
}

export const AppBar = ({ children }: Props) => {
  return (
    <Row as={Header} direction="column">
      {children}
    </Row>
  )
}

const Header = styled.header`
  display: flex;
  flex-shrink: 0;
  z-index: 1100;
  width: 100%;
  min-height: 4rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: rgba(0, 0, 255, 0.1) 0 0 2rem;
  animation: 0.5s ease-in-out 0s 1 normal none running slide-down,
    1s ease-in-out 0s 1 normal none running fade-in;
`
