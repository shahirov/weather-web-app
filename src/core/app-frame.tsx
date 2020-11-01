import { useGate, useStore } from 'effector-react'
import React from 'react'
import styled from 'styled-components'

import { $didRequest, $isAuthenticated } from '~/features/auth'
import { ThemeProvider } from '~/features/theme'
import { Spin } from '~/ui'

import { GlobalStyle } from './global-style'
import { AppGate } from './model'

type Props = {
  children: React.ReactNode
}

export const AppFrame = ({ children }: Props) => {
  useGate(AppGate)

  const isAuthenticated = useStore($isAuthenticated)
  const didRequest = useStore($didRequest)

  if (!didRequest && !isAuthenticated) {
    return (
      <>
        <GlobalStyle />
        <Layout>
          <SpinSection>
            <Spin tip="Launching Weatherio..." />
          </SpinSection>
        </Layout>
      </>
    )
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </ThemeProvider>
  )
}

const SpinSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  color: #1890ff;
  opacity: 1;
  z-index: 1100;
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100%;

  & > * {
    flex-shrink: 0;
  }
`
