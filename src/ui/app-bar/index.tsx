import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  position?: 'fixed' | 'static' | 'absolute' | 'relative' | 'sticky'
  children: React.ReactNode
}

export const AppBar = ({ children, position = 'fixed' }: Props) => {
  return <AppHeader position={position}>{children}</AppHeader>
}

const AppHeader = styled.header<Pick<Props, 'position'>>`
  ${({ position }) =>
    position === 'fixed'
      ? css`
          position: fixed;
          top: 0;
          right: 0;
          left: auto;
        `
      : css`
          position: relative;
        `};

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 1100;
  width: 100%;
  min-height: 4rem;
  background: #fff;
  box-shadow: rgba(0, 0, 255, 0.1) 0 0 2rem;
  animation: 0.5s ease-in-out 0s 1 normal none running slide-down,
    1s ease-in-out 0s 1 normal none running fade-in;
`
