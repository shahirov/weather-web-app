import { useStore } from 'effector-react'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { AppHeader } from '~/features/app/app-header'
import { $isAuthenticated } from '~/features/auth'
import { ThemeProvider } from '~/features/theme'
import { GlobalStyle } from '~/global-style'

type Props = {
  children: React.ReactNode
}

export const App = ({ children }: Props) => {
  const isAuthenticated = useStore($isAuthenticated)

  if (!isAuthenticated) return null

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Layout>
        {isAuthenticated && <AppHeader />}
        <Main>
          <Link to="/login">Login</Link>
          {children}
        </Main>
      </Layout>
    </ThemeProvider>
  )
}

const Layout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-height: 100%;

  & > * {
    flex-shrink: 0;
  }
`

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
`
