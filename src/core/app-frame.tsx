import { useGate, useStore } from 'effector-react'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { $authenticationPending, $isAuthenticated } from '~/features/auth'
import { $theme, ThemeProvider, toggleTheme } from '~/features/theme'
import { getTodaysDate } from '~/lib/date-fns'
import {
  AppBar,
  Cell,
  Drawer,
  Logo,
  Menu,
  Row,
  Spin,
  ThemeSwitch,
  Toolbar,
} from '~/ui'

import { GlobalStyle } from './global-style'
import { AppGate } from './model'

type Props = {
  children: React.ReactNode
}

export const AppFrame = ({ children }: Props) => {
  useGate(AppGate)
  const isAuthenticated = useStore($isAuthenticated)
  const pending = useStore($authenticationPending)

  if (pending) {
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
      <Layout>
        {isAuthenticated && <AppHeader />}
        <Link to="/login">Login</Link>
        {children}
      </Layout>
    </ThemeProvider>
  )
}

const AppHeader = () => {
  const theme = useStore($theme)
  const [opened, setOpened] = React.useState(false)

  const toggleDrawer = React.useCallback(
    (open: boolean) => (
      event: React.KeyboardEvent | React.MouseEvent | KeyboardEvent,
    ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setOpened(open)
    },
    [],
  )

  return (
    <AppBar>
      <Toolbar>
        <Cell as={LeftSection} area="left-section">
          <Row align="center">
            <Menu onClick={toggleDrawer(true)} />
            <Logo />
          </Row>
        </Cell>
        <Cell area="date" place="center">
          <DateText>{getTodaysDate()}</DateText>
        </Cell>
        <Cell as={RightSection} area="right-section" place="center end">
          <ThemeSwitch checked={theme === 'dark'} onChange={toggleTheme} />
        </Cell>
      </Toolbar>
      <Drawer open={opened} onClose={toggleDrawer(false)} />
    </AppBar>
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

const LeftSection = styled.div`
  @media screen and (max-width: 960px) {
    width: 100%;

    & > div {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 0 5fr;
    }
  }
`

const DateText = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  text-transform: uppercase;
`

const RightSection = styled.div`
  @media screen and (max-width: 960px) {
    place-self: center center;
  }
`
